import { Request, Response } from 'express';
import { synthesizeSpeech } from '../services/elevenLabsService';

// Generate speech audio from text using ElevenLabs
export const textToSpeech = async (req: Request, res: Response) => {
  try {
    const { text, voiceId } = req.body;
    if (!text) return res.status(400).json({ message: 'text is required' });
    const audioBuffer = await synthesizeSpeech(text, voiceId);
    // Return audio as base64 string
    const base64Audio = audioBuffer.toString('base64');
    res.json({ audio: base64Audio });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Error generating speech' });
  }
};