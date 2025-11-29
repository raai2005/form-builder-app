import api from './api';

export interface Form {
  _id: string;
  userId: string;
  title: string;
  description: string;
  fields: FormField[];
  status: 'active' | 'draft' | 'archived';
  views: number;
  responseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface DashboardStats {
  totalForms: number;
  totalResponses: number;
  activeForms: number;
  totalViews: number;
}

export const formService = {
  // Get all forms for user with optional status filter
  getUserForms: async (status?: string) => {
    const params = status ? { status } : {};
    const response = await api.get('/forms', { params });
    return response.data;
  },

  // Get single form
  getForm: async (id: string) => {
    const response = await api.get(`/forms/${id}`);
    return response.data;
  },

  // Create new form
  createForm: async (formData: Partial<Form>) => {
    const response = await api.post('/forms', formData);
    return response.data;
  },

  // Update form
  updateForm: async (id: string, formData: Partial<Form>) => {
    const response = await api.put(`/forms/${id}`, formData);
    return response.data;
  },

  // Delete form
  deleteForm: async (id: string) => {
    const response = await api.delete(`/forms/${id}`);
    return response.data;
  },

  // Increment form views
  incrementViews: async (id: string) => {
    const response = await api.post(`/forms/${id}/views`);
    return response.data;
  },
};
