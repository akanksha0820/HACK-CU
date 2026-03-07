import { Schema, model, Document, Types } from 'mongoose';

export interface ICarpool extends Document {
  eventId: Types.ObjectId;
  driver: Types.ObjectId;
  seatsAvailable: number;
  riders: Types.ObjectId[];
  meetingPoint: string;
  departureTime: Date;
}

const carpoolSchema = new Schema<ICarpool>({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  driver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  seatsAvailable: { type: Number, default: 3 },
  riders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  meetingPoint: { type: String, required: true },
  departureTime: { type: Date, required: true },
});

export default model<ICarpool>('Carpool', carpoolSchema);