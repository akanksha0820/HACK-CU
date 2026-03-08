import BadgeAward, { IBadgeAward } from '../models/BadgeAward';

export async function awardBadge(userId: string, badgeName: string, meta: Partial<IBadgeAward> = {}) {
  return BadgeAward.create({ userId, badgeName, ...meta });
}

export async function listBadges(userId: string) {
  return BadgeAward.find({ userId }).sort({ awardedAt: -1 });
}
