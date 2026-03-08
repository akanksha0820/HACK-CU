import Event from '../models/Event';
import User from '../models/User';

// Very lightweight recommender: match by shared tags/interests; fallback to recent events
export async function recommendEventsForUser(userId: string) {
  const user = await User.findById(userId);
  const interests = user?.interests || [];
  const events = await Event.find({ status: 'published' }).limit(20);
  return events
    .map((ev) => ({
      event: ev,
      score: ev.tags?.some((t) => interests.includes(t)) ? 1 : 0.3,
      reason: ev.tags?.find((t) => interests.includes(t))
        ? `Matches your interest in ${ev.tags.find((t) => interests.includes(t))}`
        : 'Popular this week',
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
