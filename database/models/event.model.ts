import { generateSlug } from '@/lib/utils';
import { Model, model, models, Schema } from 'mongoose';

export const eventModes = ['online', 'offline', 'hybrid'] as const;

export type EventMode = (typeof eventModes)[number];

export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: EventMode;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxLength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      require: [true, 'Description is required'],
      trim: true,
      maxLength: [1000, 'Description cannot exceed 1000 characters'],
    },
    overview: {
      type: String,
      require: [true, 'Overview is required'],
      trim: true,
      maxLength: [500, 'Overview cannot exceed 500 characters'],
    },
    image: {
      type: String,
      require: true,
      trim: true,
    },
    venue: {
      type: String,
      require: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      require: [true, 'Date is required'],
    },
    time: {
      type: String,
      require: [true, 'Time is required'],
    },
    mode: {
      type: String,
      require: true,
      enum: {
        values: eventModes,
        message: 'Mode must be either online, offline, or hybrid',
      },
    },
    audience: {
      type: String,
      require: [true, 'Audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      require: [true, 'Agenda is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Agenda must have at least one item',
      },
    },
    organizer: {
      type: String,
      require: [true, 'Organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      require: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one tag is required',
      },
    },
  },
  { timestamps: true }
);

eventSchema.pre('save', function (next) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    // Format YYYY-MM-DD
    return date.toISOString().split('T')[0];
  };

  const formatTime = (timeString: string) => {
    const timeRegex = /^(2[0-3]|[01]?[0-9]):([0-5][0-9])(?:\s*(AM|PM))?$/;
    const match = timeString.trim().match(timeRegex);

    if (!match) {
      throw new Error('Invalid time format. Use HH:MM or HH:MM AM/PM');
    }

    const [, hour, mintues, period] = match;

    //Convert to 24-hour format if AM/PM is provided
    let hour24 = parseInt(hour);
    if (period) {
      if (period === 'PM' && hour24 < 12) hour24 += 12;
      if (period === 'AM' && hour24 === 12) hour24 = 0;
    }

    const hour24String = hour24.toString().padStart(2, '0');

    return `${hour24String}:${mintues}`;
  };

  // Generate slug only if title change or document is new
  if (this.isModified('title') || this.isNew) {
    this.slug = generateSlug(this.title);
  }

  // Nomalize date to ISO format
  if (this.isModified('date')) {
    this.date = formatDate(this.date);
  }

  // Normalize time format (HH:MM)
  if (this.isModified('tim')) {
    this.time = formatTime(this.time);
  }

  next();
});

// Create compound index for commom queries
eventSchema.index({ date: 1, mode: 1 });

const Event: Model<IEvent> =
  models.Event || model<IEvent>('Event', eventSchema);

export default Event;
