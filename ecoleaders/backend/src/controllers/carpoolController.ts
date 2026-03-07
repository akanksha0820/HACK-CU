import { Request, Response } from 'express';
import Carpool from '../models/Carpool';

// List carpools for an event
export const listCarpools = async (req: Request, res: Response) => {
  try {
    const carpools = await Carpool.find({ eventId: req.params.eventId }).populate('driver', 'name').populate('riders', 'name');
    res.json(carpools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a carpool
export const createCarpool = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const driverId: string = req.userId;
    const { eventId, seatsAvailable, meetingPoint, departureTime } = req.body;
    const carpool = new Carpool({ eventId, driver: driverId, seatsAvailable, meetingPoint, departureTime, riders: [] });
    await carpool.save();
    res.status(201).json(carpool);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Join a carpool
export const joinCarpool = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: string = req.userId;
    const carpool = await Carpool.findById(req.params.carpoolId);
    if (!carpool) return res.status(404).json({ message: 'Carpool not found' });
    if (carpool.driver.equals(userId)) {
      return res.status(400).json({ message: 'Driver cannot join as rider' });
    }
    if (carpool.riders.includes(userId as any)) {
      return res.status(400).json({ message: 'Already in this carpool' });
    }
    if (carpool.riders.length >= carpool.seatsAvailable) {
      return res.status(400).json({ message: 'No seats available' });
    }
    carpool.riders.push(userId as any);
    await carpool.save();
    res.json(carpool);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};