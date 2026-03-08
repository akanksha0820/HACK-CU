import Announcement from '../models/Announcement';
import { sendAnnouncement } from './notificationService';

export async function createAnnouncement(payload: any) {
  const announcement = await Announcement.create(payload);
  // broadcast via sockets; failures should not block response
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
  return Announcement.find(filter).sort({ createdAt: -1 });
}
