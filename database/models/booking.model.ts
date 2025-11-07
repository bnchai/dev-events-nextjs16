import Event from '@/database/models/event.model';
import { model, Model, models, Schema, Types } from 'mongoose';

export interface IBooking {
  eventId: string | Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address',
      ],
    },
  },
  {
    timestamps: true,
    toObject: {
      flattenObjectIds: true,
    },
  }
);

bookingSchema.pre('save', async function (next) {
  if (this.isModified('eventId') || this.isNew) {
    try {
      const eventExists = await Event.findById(this.eventId);

      if (!eventExists) {
        const error = new Error(`Event with ID ${this.eventId} does not exist`);
        error.name = 'ValidationError';
        return next(error);
      }
    } catch {
      const error = new Error('Error validating eventId');
      error.name = 'ValidationError';
      next(error);
    }
  }

  next();
});

bookingSchema.index({ eventId: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: 'uniq_event_email' }
);
bookingSchema.index({ eventId: 1, createdAt: -1 });

const Booking: Model<IBooking> =
  models.Booking || model<IBooking>('Booking', bookingSchema);

export default Booking;
