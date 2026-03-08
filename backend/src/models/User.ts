import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'volunteer' | 'coordinator' | 'admin';
  phone?: string;
  avatarUrl?: string;
  interests?: string[];
  neighborhood?: string;
  onboardingStatus?: 'not_started' | 'in_progress' | 'completed';
  completedTrainings: string[];
  emergencyContact?: {
    name: string;
    phone: string;
  };
  volunteerHours?: number;
  badges: string[];
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  availabilityPreferences?: string[];
  accessibilityNeeds?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['volunteer', 'coordinator', 'admin'], default: 'volunteer' },
  phone: String,
  avatarUrl: String,
  interests: [String],
  neighborhood: String,
  onboardingStatus: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
  completedTrainings: { type: [String], default: [] },
  emergencyContact: {
    name: String,
    phone: String,
  },
  volunteerHours: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true },
  },
  availabilityPreferences: { type: [String], default: [] },
  accessibilityNeeds: String,
  createdAt: { type: Date, default: Date.now },
});

export default model<IUser>('User', userSchema);
