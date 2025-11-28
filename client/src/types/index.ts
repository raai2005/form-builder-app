// Form field types
export interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select, radio, checkbox
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Form interface
export interface Form {
  _id?: string;
  title: string;
  description?: string;
  fields: FormField[];
  settings: {
    allowMultipleSubmissions: boolean;
    showResponseSummary: boolean;
    requireAuth: boolean;
  };
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Response interface
export interface FormResponse {
  _id?: string;
  formId: string;
  data: Record<string, any>;
  submittedAt?: Date;
  submittedBy?: {
    email?: string;
    name?: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
