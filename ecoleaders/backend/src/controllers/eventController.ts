import { Request, Response } from 'express';
import Event from '../models/Event';
import User from '../models/User';

// List all events
export const listEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find().populate('attendees', 'name email');
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single event
export const getEvent = async (req: Request, res: Response) => {
  try {
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
    const event = new Event({ title, description, date, location, capacity, createdBy: userId });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Deleted' });
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
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.attendees.includes(userId as any)) {
      return res.status(400).json({ message: 'Already signed up' });
    }
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }
    event.attendees.push(userId as any);
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};