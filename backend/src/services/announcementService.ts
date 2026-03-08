import Announcement from '../models/Announcement';
import { sendAnnouncement } from './notificationService';
import { mockAnnouncements } from '../mockData';

const useMock = process.env.SKIP_DB === 'true';

export async function createAnnouncement(payload: any) {
  if (useMock) {
    const ann = { _id: new Date().getTime().toString(), createdAt: new Date(), ...payload };
    mockAnnouncements.unshift(ann as any);
    return ann;
  }
  const announcement = await Announcement.create(payload);
  sendAnnouncement({
    title: announcement.title,
    message: announcement.message,
    audienceType: announcement.audienceType,
    priority: announcement.priority,
    audioUrl: announcement.audioUrl,
    shortSummary: announcement.shortSummary,
  }).catch((err) => console.error('Announcement broadcast error', err));
  return announcement;
}

export async function listAnnouncements(filter: any = {}) {
  if (useMock) return mockAnnouncements;
  return Announcement.find(filter).sort({ createdAt: -1 });
}
