import { Schema, model, Document, Types } from 'mongoose';

export interface IChatMessage extends Document {
  channel: string;
  sender: Types.ObjectId;
  content: string;
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
  channel: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IChatMessage>('ChatMessage', chatMessageSchema);