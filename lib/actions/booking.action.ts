'use server';

import { Booking, IBooking } from '@/database/models';
import dbConnect from '@/lib/mongodb';

export const createBooking = async ({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}) => {
  try {
    await dbConnect();

    const bookingDoc = await Booking.create({
      email,
      eventId,
    });
    const booking: IBooking = bookingDoc.toObject();

    return {
      success: true,
      booking,
    };
  } catch (error) {
    console.error('Failed to create booking', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
