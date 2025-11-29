import express from 'express';
import {
  initiateAirtableOAuth,
  handleAirtableCallback,
  getAirtableStatus,
  disconnectAirtable,
} from '../controllers/airtableController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/airtable/connect
// @desc    Initiate Airtable OAuth flow
// @access  Private
router.get('/connect', authMiddleware, initiateAirtableOAuth);

// @route   GET /api/airtable/callback
// @desc    Handle Airtable OAuth callback
// @access  Public (called by Airtable)
router.get('/callback', handleAirtableCallback);

// @route   GET /api/airtable/status
// @desc    Get Airtable connection status
// @access  Private
router.get('/status', authMiddleware, getAirtableStatus);

// @route   POST /api/airtable/disconnect
// @desc    Disconnect Airtable account
// @access  Private
router.post('/disconnect', authMiddleware, disconnectAirtable);

export default router;
