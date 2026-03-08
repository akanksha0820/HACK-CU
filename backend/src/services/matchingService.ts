import Carpool from '../models/Carpool';

export async function findCarpoolMatches(eventId: string) {
  // Placeholder clustering logic — real version would use geo grouping
  const carpools = await Carpool.find({ eventId, status: 'open' });
  return carpools.map((cp) => ({
    carpool: cp,
    suggestion: `Likely match for riders near ${cp.pickupZone || cp.meetingPoint}`,
  }));
}
