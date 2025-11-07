'use client';

import { createBooking } from '@/lib/actions/booking.action';
import posthog from 'posthog-js';
import { FormEvent, useState } from 'react';

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await createBooking({ eventId, email });

      if (response.success) {
        setIsSubmitted(true);
        posthog.capture('event_booked', { eventId, slug, email });
      } else {
        console.error('Booking creation failed', response.error);
        posthog.captureException('Booking creation failed');
      }
    } catch (error) {
      console.error('Booking creation failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <p className="text-sm">Thank your for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="py-2 px-4 border bg-neutral-700 border-neutral-600 rounded-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-2 px-4 w-full text-black font-bold text-sm rounded-sm ${
              isSubmitting ? 'bg-neutral-500' : 'bg-teal-300'
            }`}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
