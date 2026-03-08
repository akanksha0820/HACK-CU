import TrainingModule from '../models/TrainingModule';
import TrainingProgress from '../models/TrainingProgress';

export async function getModules() {
  return TrainingModule.find();
}

export async function getUserProgress(userId: string) {
  return TrainingProgress.find({ userId });
}

export async function upsertProgress(userId: string, moduleId: string, updates: any) {
  return TrainingProgress.findOneAndUpdate(
    { userId, moduleId },
    { $set: updates, userId, moduleId },
    { new: true, upsert: true },
  );
}
