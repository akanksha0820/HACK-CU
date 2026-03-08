import { Schema, model, Document, Types } from 'mongoose';

export interface IChatRoom extends Document {
  name: string;
  description?: string;
  type?: 'public' | 'event' | 'private';
  moderators: Types.ObjectId[];
  pinnedMessages: Types.ObjectId[];
  linkedEventId?: Types.ObjectId;
}

const chatRoomSchema = new Schema<IChatRoom>({
  name: { type: String, required: true, unique: true },
  description: String,
  type: { type: String, enum: ['public', 'event', 'private'], default: 'public' },
  moderators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pinnedMessages: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }],
  linkedEventId: { type: Schema.Types.ObjectId, ref: 'Event' },
});

export default model<IChatRoom>('ChatRoom', chatRoomSchema);
