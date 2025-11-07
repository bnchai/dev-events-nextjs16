import BookEvent from '@/components/BookEvent';
import EventCard from '@/components/EventCard';
import { IEvent } from '@/database/models';
import { BASE_URL } from '@/lib/api';
import { events } from '@/lib/constants';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  let event: IEvent | undefined = undefined;

  try {
    const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      if (response.status === 404) return notFound();

      throw new Error('Failed to fetch event');
    }

    event = await response.json();
  } catch (error) {
    console.error('Failed to fetch event:', error);
  }

  if (!event) return notFound();

  // TODO: implement booking count
  const bookings = 10;

  const fakeSimilarEvent = events.slice(0, 3);

  const {
    title,
    description,
    overview,
    date,
    time,
    location,
    image,
    mode,
    audience,
    agenda,
    organizer,
    tags,
  } = event;

  return (
    <section className="event-detail">
      <div className="header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="detail">
        <div className="content">
          <Image
            src={image}
            width={400}
            height={200}
            alt="Event banner"
            className="banner"
          />

          <section>
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section>
            <h2>Event Details</h2>
            <div className="space-y-1">
              {[
                { icon: 'calendar', label: date },
                { icon: 'clock', label: time },
                { icon: 'pin', label: location },
                { icon: 'mode', label: mode },
                { icon: 'audience', label: audience },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Image
                    src={`/icons/${item.icon}.svg`}
                    width={16}
                    height={16}
                    alt={item.icon}
                  />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2>Agenda</h2>
            <ul>
              {agenda.map((item, index) => (
                <li key={index} className="list-disc ml-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
          <section className="event-tags">
            {tags.map((tag) => (
              <div key={tag} className="tag">
                {tag}
              </div>
            ))}
          </section>
        </div>
        <div className="booking-form">
          <h2>Book Your Spot</h2>
          {bookings > 0 ? (
            <p className="mb-4 text-sm">
              {bookings} people already booked their spot!
            </p>
          ) : (
            <p className="mb-4 text-sm">Be the first to book your spot!</p>
          )}
          <BookEvent />
        </div>
      </div>
      <div className="similar-event">
        <h2>Similar Events</h2>
        <div className="event-lists">
          {fakeSimilarEvent.map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailPage;
