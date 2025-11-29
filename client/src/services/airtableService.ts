import api from './api';

export interface AirtableStatus {
  connected: boolean;
  userId?: string;
  connectedAt?: string;
  scopes?: string[];
}

export const airtableService = {
  // Initiate Airtable OAuth flow
  connect: async () => {
    const response = await api.get('/airtable/connect');
    return response.data; // Returns { authUrl }
  },

  // Get Airtable connection status
  getStatus: async (): Promise<AirtableStatus> => {
    const response = await api.get('/airtable/status');
    return response.data;
  },

  // Disconnect Airtable
  disconnect: async () => {
    const response = await api.post('/airtable/disconnect');
    return response.data;
  },
};
