import axios from 'axios';

/**
 * Synthesizes speech using ElevenLabs API.
 * @param text Text to convert to speech
 * @param voiceId Voice ID (optional). Use the default if not provided.
 * @returns A Buffer containing audio data (MP3)
 */
export async function synthesizeSpeech(text: string, voiceId: string = 'EXAVITQu4vr4xnSDxMaL'): Promise<Buffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error('ElevenLabs API key is not set');
  }
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  try {
    const response = await axios.post(
      url,
      { text },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      },
    );
    return Buffer.from(response.data);
  } catch (err: any) {
    console.error('ElevenLabs API error', err.response?.data || err.message);
    throw new Error('Failed to synthesize speech');
  }
}