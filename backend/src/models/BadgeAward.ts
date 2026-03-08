import { Schema, model, Document, Types } from 'mongoose';

export interface IBadgeAward extends Document {
  userId: Types.ObjectId;
  badgeName: string;
  description?: string;
  criteria?: string;
  awardedAt: Date;
  solanaTx?: string;
  displayIcon?: string;
}

const badgeAwardSchema = new Schema<IBadgeAward>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  badgeName: { type: String, required: true },
  description: String,
  criteria: String,
  awardedAt: { type: Date, default: Date.now },
  solanaTx: String,
  displayIcon: String,
});

export default model<IBadgeAward>('BadgeAward', badgeAwardSchema);
