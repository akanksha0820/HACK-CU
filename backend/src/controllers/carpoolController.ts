import { Request, Response } from 'express';
import Carpool from '../models/Carpool';
import { mockCarpools, mockEvents, mockUsers } from '../mockData';

const useMock = process.env.SKIP_DB === 'true';

// List carpools for an event
export const listCarpools = async (req: Request, res: Response) => {
  try {
    if (useMock) {
      const cps = mockCarpools.filter((c) => c.eventId === req.params.eventId).map((c) => ({
        ...c,
        driver: { _id: c.driver, name: mockUsers.find((u) => u._id === c.driver)?.name || 'Driver' },
        riders: c.riders.map((id) => ({ _id: id, name: mockUsers.find((u) => u._id === id)?.name || 'Rider' })),
      }));
      return res.json(cps);
    } else {
      const carpools = await Carpool.find({ eventId: req.params.eventId }).populate('driver', 'name').populate('riders', 'name');
      res.json(carpools);
    }
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
    if (useMock) {
      const cp = {
        _id: new Date().getTime().toString(),
        eventId,
        driver: driverId,
        seatsAvailable,
        meetingPoint,
        departureTime,
        riders: [] as string[],
        pickupZone: '',
        status: 'open',
      };
      mockCarpools.push(cp);
      return res.status(201).json(cp);
    } else {
      const carpool = new Carpool({ eventId, driver: driverId, seatsAvailable, meetingPoint, departureTime, riders: [] });
      await carpool.save();
      res.status(201).json(carpool);
    }
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
    if (useMock) {
      const cp = mockCarpools.find((c) => c._id === req.params.carpoolId);
      if (!cp) return res.status(404).json({ message: 'Carpool not found' });
      if (cp.driver === userId) return res.status(400).json({ message: 'Driver cannot join as rider' });
      if (cp.riders.includes(userId)) return res.status(400).json({ message: 'Already in this carpool' });
      if (cp.riders.length >= cp.seatsAvailable) return res.status(400).json({ message: 'No seats available' });
      cp.riders.push(userId);
      return res.json(cp);
    } else {
      const carpool = await Carpool.findById(req.params.carpoolId);
      if (!carpool) return res.status(404).json({ message: 'Carpool not found' });
      if (carpool.driver.equals(userId)) {
        return res.status(400).json({ message: 'Driver cannot join as rider' });
      }
      if (carpool.riders.includes(userId as any)) {
        return res.status(400).json({ message: 'Already in this carpool' });
      }
      if (carpool.riders.length >= carpool.seatsAvailable) {
        carpool.status = 'full';
        return res.status(400).json({ message: 'No seats available' });
      }
      carpool.riders.push(userId as any);
      await carpool.save();
      res.json(carpool);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
