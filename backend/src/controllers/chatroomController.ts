import { Request, Response } from 'express';
import ChatRoom from '../models/ChatRoom';
import ChatMessage from '../models/ChatMessage';
import { mockChatRooms, mockChatMessages } from '../mockData';

const useMock = process.env.SKIP_DB === 'true';

export const listChatRooms = async (_req: Request, res: Response) => {
  if (useMock) return res.json(mockChatRooms);
  const rooms = await ChatRoom.find();
  res.json(rooms);
};

export const listMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  if (useMock) return res.json(mockChatMessages.filter((m) => m.channel === roomId));
  const messages = await ChatMessage.find({ channel: roomId }).sort({ createdAt: 1 });
  res.json(messages);
};
