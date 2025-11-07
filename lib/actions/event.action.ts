'use server';

import { Event, IEvent } from '@/database/models';
import dbConnect, { convertDocsToObject } from '@/lib/mongodb';
import { cacheLife } from 'next/cache';

export const getSimilarEventsBySlug = async (
  slug: string
): Promise<IEvent[]> => {
  'use cache';
  cacheLife('hours');

  try {
    await dbConnect();

    const event = await Event.findOne({ slug }).lean();
    if (!event) throw new Error(`Event: ${slug} is not foud`);

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    });

    return convertDocsToObject(similarEvents);
  } catch (error) {
    console.error('Failed to get similar event by slug', error);
    return [];
  }
};
