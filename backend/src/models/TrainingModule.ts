import { Schema, model, Document } from 'mongoose';

export interface ITrainingModule extends Document {
  title: string;
  category?: string;
  estimatedMinutes?: number;
  required?: boolean;
  contentBlocks: { type: 'text' | 'video' | 'link'; value: string }[];
  quiz?: {
    questions: { prompt: string; options: string[]; answer: number }[];
  };
  audioUrl?: string;
  downloadableResources?: string[];
}

const trainingModuleSchema = new Schema<ITrainingModule>({
  title: { type: String, required: true },
  category: String,
  estimatedMinutes: Number,
  required: { type: Boolean, default: false },
  contentBlocks: [
    {
      type: {
        type: String,
        enum: ['text', 'video', 'link'],
        default: 'text',
      },
      value: String,
    },
  ],
  quiz: {
    questions: [
      {
        prompt: String,
        options: [String],
        answer: Number,
      },
    ],
  },
  audioUrl: String,
  downloadableResources: [String],
});

export default model<ITrainingModule>('TrainingModule', trainingModuleSchema);
