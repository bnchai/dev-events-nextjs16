import EventCard from '@/components/EventCard';
import { events } from '@/lib/constants';
import Image from 'next/image';

const Home = () => {
  return (
    <>
      <section className="my-10">
        <h1 className="font-bold text-4xl text-center">
          The Hub for Every Dev
          <br />
          <span className="text-gradient to-cyan-400">
            Event You Can&apos;t Miss
          </span>
        </h1>
        <p className="text-center mt-4">
          Hackathons, Meetups, and Conferences, All in One Place
        </p>
        <a
          href="#events"
          className="mt-6 mx-auto py-2 px-4 flex items-center gap-1 border border-gray-800 bg-neutral-900 w-fit rounded-full"
        >
          Explore Events
          <Image
            src="/icons/arrow-down.svg"
            alt="arrow-down"
            width={20}
            height={20}
          />
        </a>
      </section>
      <section id="events" className="scroll-mt-20">
        <h2 className="text-xl font-bold">Featured Events</h2>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;
