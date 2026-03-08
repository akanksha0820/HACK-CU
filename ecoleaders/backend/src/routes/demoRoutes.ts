import { Router } from 'express';

type Signup = { eventId: string; name: string; email?: string; at: string };
const signups: Signup[] = [];

const router = Router();

// list all signups grouped by event
router.get('/signups', (_req, res) => {
  const grouped = signups.reduce<Record<string, Signup[]>>((acc, s) => {
    acc[s.eventId] = acc[s.eventId] || [];
    acc[s.eventId].push(s);
    return acc;
  }, {});
  res.json(grouped);
});

// add a signup
router.post('/signups', (req, res) => {
  const { eventId, name, email } = req.body || {};
  if (!eventId || !name) {
    return res.status(400).json({ message: 'eventId and name are required' });
  }
  const entry: Signup = { eventId, name, email, at: new Date().toISOString() };
  signups.push(entry);
  const grouped = signups.filter((s) => s.eventId === eventId);
  res.json({ success: true, signups: grouped });
});

export default router;
