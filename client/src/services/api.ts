import axios from 'axios';
import type { Form, FormResponse, ApiResponse } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for handling errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Form API methods
export const formApi = {
  // Get all forms
  getAllForms: async (): Promise<ApiResponse<Form[]>> => {
    const response = await api.get('/forms');
    return response.data;
  },

  // Get single form by ID
  getFormById: async (id: string): Promise<ApiResponse<Form>> => {
    const response = await api.get(`/forms/${id}`);
    return response.data;
  },

  // Create new form
  createForm: async (formData: Partial<Form>): Promise<ApiResponse<Form>> => {
    const response = await api.post('/forms', formData);
    return response.data;
  },

  // Update form
  updateForm: async (id: string, formData: Partial<Form>): Promise<ApiResponse<Form>> => {
    const response = await api.put(`/forms/${id}`, formData);
    return response.data;
  },

  // Delete form
  deleteForm: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/forms/${id}`);
    return response.data;
  },
};

// Response API methods
export const responseApi = {
  // Get responses for a specific form
  getFormResponses: async (formId: string): Promise<ApiResponse<FormResponse[]>> => {
    const response = await api.get(`/responses/${formId}`);
    return response.data;
  },

  // Submit form response
  submitResponse: async (responseData: Partial<FormResponse>): Promise<ApiResponse<FormResponse>> => {
    const response = await api.post('/responses', responseData);
    return response.data;
  },
};

export default api;
