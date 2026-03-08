import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import {
  mockUsers,
} from '../mockData';

const jwtSecret = process.env.JWT_SECRET || 'secret';
const useMock = process.env.SKIP_DB === 'true';

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (useMock) {
      const existing = mockUsers.find((u) => u.email === email);
      if (existing) return res.status(409).json({ message: 'Email already registered' });
      const user = { _id: new Date().getTime().toString(), name, email, password, role: role || 'volunteer', completedTrainings: [] };
      mockUsers.push(user as any);
      const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '7d' });
      return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } else {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      const hashed = await bcrypt.hash(password, 10);
      const safeRole = role && ['volunteer', 'coordinator', 'admin'].includes(role) ? role : 'volunteer';
      const user = new User({ name, email, password: hashed, role: safeRole });
      await user.save();
      const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '7d' });
      res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (useMock) {
      const user = mockUsers.find((u) => u.email === email && u.password === password);
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '7d' });
      return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user profile (requires auth middleware)
export const me = async (req: Request, res: Response) => {
  // @ts-ignore – middleware attaches user to req
  const userId: string | undefined = req.userId;
  try {
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (useMock) {
      const user = mockUsers.find((u) => u._id == userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const { password, ...rest } = user as any;
      return res.json({ user: rest });
    } else {
      const user = await User.findById(userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
