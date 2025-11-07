'use server';

import { Event, IEvent } from '@/database/models';
import dbConnect from '@/lib/mongodb';

export const getSimilarEventsBySlug = async (
  slug: string
): Promise<IEvent[]> => {
  try {
    await dbConnect();

    const event = await Event.findOne({ slug }).lean();
    if (!event) throw new Error(`Event: ${slug} is not foud`);

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    return similarEvents;
  } catch (error) {
    console.error('Failed to get similar event by slug', error);
    return [];
  }
};
