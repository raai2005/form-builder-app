import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  // Airtable OAuth fields
  airtable?: {
    userId: string;
    accessToken: string;
    refreshToken: string;
    tokenExpiry: Date;
    connectedAt: Date;
    scopes: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    // Airtable OAuth data
    airtable: {
      userId: { type: String },
      accessToken: { type: String },
      refreshToken: { type: String },
      tokenExpiry: { type: Date },
      connectedAt: { type: Date },
      scopes: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
