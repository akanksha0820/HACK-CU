import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import ChatMessage from '../models/ChatMessage';

const jwtSecret = process.env.JWT_SECRET || 'secret';

let ioInstance: Server;

export function initSocket(io: Server) {
  ioInstance = io;
  io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);
    // Join a chat channel
    socket.on('join', (channel: string) => {
      socket.join(channel);
    });
    // Leave channel
    socket.on('leave', (channel: string) => {
      socket.leave(channel);
    });
    // Receive chat message
    socket.on('chat', async (data: { channel: string; content: string; token: string }) => {
      const { channel, content, token } = data;
      try {
        const payload = jwt.verify(token, jwtSecret) as any;
        const message = new ChatMessage({ channel, content, sender: payload.id });
        await message.save();
        io.to(channel).emit('chat', {
          channel,
          content,
          sender: payload.id,
          createdAt: message.createdAt,
        });
      } catch (err) {
        console.error('Chat error', err);
      }
    });
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

// Send an announcement to all connected clients
export function broadcastAnnouncement(title: string, message: string) {
  if (!ioInstance) return;
  ioInstance.emit('announcement', { title, message, date: new Date() });
}