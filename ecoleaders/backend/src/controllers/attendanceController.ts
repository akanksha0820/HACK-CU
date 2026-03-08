import { Request, Response } from 'express';
import Event from '../models/Event';
import User from '../models/User';
import { awardBadge } from '../services/badgeService';

export const markAttendance = async (req: Request, res: Response) => {
  const { eventId, attendeeId, status } = req.body; // status present|absent
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  const user = await User.findById(attendeeId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (status === 'present') {
    user.volunteerHours = (user.volunteerHours || 0) + (event.estimatedVolunteerHours || 2);
    await user.save();
    await awardBadge(user.id, 'First Event', { description: 'Attended an event' });
  }
  event.attendanceMarked = true;
  await event.save();
  res.json({ ok: true });
};
