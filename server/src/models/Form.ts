import mongoose, { Document, Schema } from 'mongoose';

export interface IFormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select, radio, checkbox
}

export interface IForm extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  fields: IFormField[];
  status: 'active' | 'draft' | 'archived';
  views: number;
  responseCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const FormFieldSchema: Schema = new Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['text', 'email', 'number', 'textarea', 'select', 'radio', 'checkbox', 'date'],
  },
  label: { type: String, required: true },
  placeholder: { type: String },
  required: { type: Boolean, default: false },
  options: [{ type: String }],
});

const FormSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Form title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    fields: {
      type: [FormFieldSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'draft',
    },
    views: {
      type: Number,
      default: 0,
    },
    responseCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
FormSchema.index({ userId: 1, status: 1 });
FormSchema.index({ createdAt: -1 });

export default mongoose.model<IForm>('Form', FormSchema);
