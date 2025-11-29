import mongoose, { Document, Schema } from 'mongoose';

export interface IResponse extends Document {
  formId: mongoose.Types.ObjectId;
  data: Record<string, any>;
  submittedAt: Date;
  ipAddress?: string;
}

const ResponseSchema: Schema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ResponseSchema.index({ formId: 1, submittedAt: -1 });

export default mongoose.model<IResponse>('Response', ResponseSchema);
