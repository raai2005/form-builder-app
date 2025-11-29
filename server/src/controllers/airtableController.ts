import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

const AIRTABLE_OAUTH_URL = 'https://airtable.com/oauth2/v1';
const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

// Scopes required for the application
const SCOPES = [
  'data.records:read',
  'data.records:write',
  'schema.bases:read',
  'webhook:manage',
].join(' ');

// Step 1: Redirect user to Airtable OAuth page
export const initiateAirtableOAuth = (req: AuthRequest, res: Response): void => {
  const userId = req.userId;
  
  // Build authorization URL
  const authUrl = `${AIRTABLE_OAUTH_URL}/authorize?` +
    `client_id=${process.env.AIRTABLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.AIRTABLE_REDIRECT_URI || '')}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(SCOPES)}` +
    `&state=${userId}`; // Pass userId in state to identify user after callback

  res.json({ authUrl });
};

// Step 2: Handle OAuth callback from Airtable
export const handleAirtableCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code, state } = req.query;
    const userId = state as string;

    if (!code) {
      res.status(400).json({ message: 'Authorization code is missing' });
      return;
    }

    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      `${AIRTABLE_OAUTH_URL}/token`,
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.AIRTABLE_REDIRECT_URI,
        client_id: process.env.AIRTABLE_CLIENT_ID,
        client_secret: process.env.AIRTABLE_CLIENT_SECRET,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const {
      access_token,
      refresh_token,
      expires_in,
      scope,
    } = tokenResponse.data;

    // Get Airtable user info
    const userInfoResponse = await axios.get(
      'https://api.airtable.com/v0/meta/whoami',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const airtableUserId = userInfoResponse.data.id;

    // Calculate token expiry
    const tokenExpiry = new Date();
    tokenExpiry.setSeconds(tokenExpiry.getSeconds() + expires_in);

    // Update user with Airtable OAuth data
    await User.findByIdAndUpdate(userId, {
      airtable: {
        userId: airtableUserId,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiry,
        connectedAt: new Date(),
        scopes: scope.split(' '),
      },
    });

    // Redirect to frontend success page
    res.redirect(`${process.env.CORS_ORIGIN}/dashboard?airtable=connected`);
  } catch (error: any) {
    console.error('Airtable OAuth error:', error.response?.data || error.message);
    res.redirect(`${process.env.CORS_ORIGIN}/dashboard?airtable=error`);
  }
};

// Step 3: Refresh access token when expired
export const refreshAirtableToken = async (userId: string): Promise<string> => {
  try {
    const user = await User.findById(userId);
    
    if (!user || !user.airtable?.refreshToken) {
      throw new Error('No Airtable refresh token found');
    }

    const tokenResponse = await axios.post(
      `${AIRTABLE_OAUTH_URL}/token`,
      {
        grant_type: 'refresh_token',
        refresh_token: user.airtable.refreshToken,
        client_id: process.env.AIRTABLE_CLIENT_ID,
        client_secret: process.env.AIRTABLE_CLIENT_SECRET,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Calculate new expiry
    const tokenExpiry = new Date();
    tokenExpiry.setSeconds(tokenExpiry.getSeconds() + expires_in);

    // Update tokens in database
    await User.findByIdAndUpdate(userId, {
      'airtable.accessToken': access_token,
      'airtable.refreshToken': refresh_token,
      'airtable.tokenExpiry': tokenExpiry,
    });

    return access_token;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw new Error('Failed to refresh Airtable token');
  }
};

// Get Airtable connection status
export const getAirtableStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.airtable?.accessToken) {
      res.json({ connected: false });
      return;
    }

    res.json({
      connected: true,
      userId: user.airtable.userId,
      connectedAt: user.airtable.connectedAt,
      scopes: user.airtable.scopes,
    });
  } catch (error) {
    console.error('Get Airtable status error:', error);
    res.status(500).json({ message: 'Failed to get Airtable status' });
  }
};

// Disconnect Airtable
export const disconnectAirtable = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $unset: { airtable: 1 },
    });

    res.json({ message: 'Airtable disconnected successfully' });
  } catch (error) {
    console.error('Disconnect Airtable error:', error);
    res.status(500).json({ message: 'Failed to disconnect Airtable' });
  }
};
