import { Schema, model, Document, Types } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  attendees: Types.ObjectId[];
  createdBy: Types.ObjectId;
  category?: string;
  status?: 'draft' | 'published' | 'completed' | 'cancelled';
  visibility?: 'public' | 'private' | 'invite';
  coordinatorIds: Types.ObjectId[];
  requiredTrainings: string[];
  tags: string[];
  chatroomId?: Types.ObjectId;
  checklist?: string[];
  reminderSent?: boolean;
  attendanceMarked?: boolean;
  estimatedVolunteerHours?: number;
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, default: 100 },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
  status: { type: String, enum: ['draft', 'published', 'completed', 'cancelled'], default: 'published' },
  visibility: { type: String, enum: ['public', 'private', 'invite'], default: 'public' },
  coordinatorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  requiredTrainings: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  chatroomId: { type: Schema.Types.ObjectId, ref: 'ChatRoom' },
  checklist: { type: [String], default: [] },
  reminderSent: { type: Boolean, default: false },
  attendanceMarked: { type: Boolean, default: false },
  estimatedVolunteerHours: { type: Number, default: 2 },
});

export default model<IEvent>('Event', eventSchema);
