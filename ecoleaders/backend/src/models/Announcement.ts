import { Schema, model, Document, Types } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  message: string;
  audienceType: 'all' | 'channel' | 'event' | 'segment';
  audienceIds?: Types.ObjectId[];
  channelIds?: Types.ObjectId[];
  eventId?: Types.ObjectId;
  priority?: 'normal' | 'high' | 'urgent';
  pushEnabled?: boolean;
  audioUrl?: string;
  shortSummary?: string;
  acknowledgedBy: Types.ObjectId[];
  createdAt: Date;
  expiresAt?: Date;
  createdBy: Types.ObjectId;
}

const announcementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  message: { type: String, required: true },
  audienceType: { type: String, enum: ['all', 'channel', 'event', 'segment'], default: 'all' },
  audienceIds: [{ type: Schema.Types.ObjectId }],
  channelIds: [{ type: Schema.Types.ObjectId, ref: 'ChatRoom' }],
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  priority: { type: String, enum: ['normal', 'high', 'urgent'], default: 'normal' },
  pushEnabled: { type: Boolean, default: false },
  audioUrl: String,
  shortSummary: String,
  acknowledgedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model<IAnnouncement>('Announcement', announcementSchema);
