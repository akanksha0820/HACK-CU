import { Request, Response } from 'express';
import Event from '../models/Event';
import User from '../models/User';
import { mockEvents, mockUsers } from '../mockData';

const useMock = process.env.SKIP_DB === 'true';

// List all events
export const listEvents = async (_req: Request, res: Response) => {
  try {
    if (useMock) {
      const events = mockEvents.map((ev) => ({
        ...ev,
        attendees: ev.attendees.map((id) => mockUsers.find((u) => u._id === id)).filter(Boolean),
      }));
      return res.json(events);
    } else {
      const events = await Event.find().populate('attendees', 'name email');
      res.json(events);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single event
export const getEvent = async (req: Request, res: Response) => {
  try {
    if (useMock) {
      const event = mockEvents.find((e) => e._id === req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      return res.json(event);
    }
    const event = await Event.findById(req.params.id).populate('attendees', 'name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create event (staff only – check in routes)
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    // @ts-ignore – userId attached by auth middleware
    const userId: string | undefined = req.userId;
    if (useMock) {
      const event = { _id: new Date().getTime().toString(), title, description, date, location, capacity, createdBy: userId, attendees: [], requiredTrainings: [], tags: [] };
      mockEvents.push(event as any);
      return res.status(201).json(event);
    } else {
      const event = new Event({ title, description, date, location, capacity, createdBy: userId });
      await event.save();
      res.status(201).json(event);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    if (useMock) {
      const idx = mockEvents.findIndex((e) => e._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Event not found' });
      mockEvents[idx] = { ...mockEvents[idx], ...req.body };
      return res.json(mockEvents[idx]);
    } else {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json(event);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    if (useMock) {
      const idx = mockEvents.findIndex((e) => e._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Event not found' });
      mockEvents.splice(idx, 1);
      return res.json({ message: 'Deleted' });
    } else {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json({ message: 'Deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Sign up for event
export const signUpEvent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: string = req.userId;
    if (useMock) {
      const event = mockEvents.find((e) => e._id === req.params.id);
      const user = mockUsers.find((u) => u._id === userId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (event.attendees.includes(userId)) return res.status(400).json({ message: 'Already signed up' });
      if (event.attendees.length >= event.capacity) return res.status(400).json({ message: 'Event is full' });
      const missingTraining = event.requiredTrainings?.filter((reqId) => !(user.completedTrainings || []).includes(reqId));
      if (missingTraining && missingTraining.length > 0) {
        return res.status(400).json({ message: 'Training required before signup', missingTraining });
      }
      event.attendees.push(userId);
      return res.json(event);
    } else {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      if (event.attendees.includes(userId as any)) {
        return res.status(400).json({ message: 'Already signed up' });
      }
      if (event.attendees.length >= event.capacity) {
        return res.status(400).json({ message: 'Event is full' });
      }
      // training gate
      const missingTraining = event.requiredTrainings?.filter((reqId) => !(user.completedTrainings || []).includes(reqId));
      if (missingTraining && missingTraining.length > 0) {
        return res
          .status(400)
          .json({ message: 'Training required before signup', missingTraining });
      }
      event.attendees.push(userId as any);
      await event.save();
      res.json(event);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
