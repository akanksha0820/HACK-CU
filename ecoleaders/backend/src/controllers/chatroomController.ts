import { Request, Response } from 'express';
import ChatRoom from '../models/ChatRoom';
import ChatMessage from '../models/ChatMessage';

export const listChatRooms = async (_req: Request, res: Response) => {
  const rooms = await ChatRoom.find();
  res.json(rooms);
};

export const listMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const messages = await ChatMessage.find({ channel: roomId }).sort({ createdAt: 1 });
  res.json(messages);
};
