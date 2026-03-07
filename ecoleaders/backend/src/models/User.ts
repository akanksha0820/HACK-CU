import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'volunteer' | 'staff';
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['volunteer', 'staff'], default: 'volunteer' },
  createdAt: { type: Date, default: Date.now },
});

export default model<IUser>('User', userSchema);