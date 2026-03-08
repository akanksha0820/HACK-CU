import { Schema, model, Document, Types } from 'mongoose';

export interface ITrainingProgress extends Document {
  userId: Types.ObjectId;
  moduleId: Types.ObjectId;
  startedAt?: Date;
  completedAt?: Date;
  score?: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

const trainingProgressSchema = new Schema<ITrainingProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  moduleId: { type: Schema.Types.ObjectId, ref: 'TrainingModule', required: true },
  startedAt: Date,
  completedAt: Date,
  score: Number,
  status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
});

export default model<ITrainingProgress>('TrainingProgress', trainingProgressSchema);
