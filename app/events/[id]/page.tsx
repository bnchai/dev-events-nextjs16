import BookEvent from '@/components/BookEvent';
import EventCard from '@/components/EventCard';
import { events } from '@/lib/constants';
import Image from 'next/image';

const EventDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const fakeEvent = {
    name: 'Quantum Leap Summit 2026: The AI Edge',
    description:
      'A premier one-day event dedicated to exploring the convergence of Quantum Computing and Artificial Intelligence. The focus is on practical applications and future-proofing cloud infrastructure against the exponential demands of large-scale AI models.',
    overview:
      'Join over 1,500 industry peers for a mix of high-level keynotes, deep-dive technical sessions, and hands-on workshops. Network with top researchers and discover the next generation of computing power.',
    date: '2025-04-10',
    time: '08:30',
    location: 'The Innovation Hub, London',
    image: '/images/event1.png',
    mode: 'Hybrid (In-person & Virtual Live Stream)',
    audience:
      'Cloud Engineers, Data Scientists, AI/ML Developers, and Tech Leadership',
    agenda: [
      '08:30 AM - 09:00 AM | Registration & Networking Breakfast',
      '09:00 AM - 09:30 AM | Keynote: The Post-Moore Era: Why Quantum Matters Now',
      '09:30 AM - 10:30 AM | Serverless AI: Building and Deploying Edge Models on Kubernetes',
      '10:30 AM - 11:30 AM | Panel Discussion: Ethical AI and Regulatory Frameworks in the EU',
      '11:30 AM - 12:30 PM | Deep Dive: Securing Multi-Cloud Environments with Zero Trust Principles',
      '12:30 PM - 01:30 PM | Lunch & Expo Floor Visit',
      '01:30 PM - 02:30 PM | Workshop: Intro to Qiskit and Quantum Machine Learning',
      '02:30 PM - 03:30 PM | Case Study: Optimizing Data Pipelines for Petabyte-Scale AI Training',
      '03:30 PM - 04:30 PM | Future of Computing: Neuromorphic Chips and Sustainable Infrastructure',
      '04:30 PM - 05:00 PM | Closing Remarks, Q&A, and Prize Draw',
    ],
    organizer:
      'The Apex Institute is a non-profit organization dedicated to fostering innovation and knowledge exchange across disruptive technologies (AI, cloud architecture, cybersecurity, and quantum research). Our mission is to bridge the gap between academic research and practical industry application.',
  };

  const fakeSimilarEvent = events.slice(0, 3);

  const {
    name,
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
  } = fakeEvent;

  return (
    <section className="event-detail">
      <div className="header">
        <h1>{name}</h1>
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
            <h2>About</h2>
            <p>{organizer}</p>
          </section>
        </div>
        <div className="booking-form">
          <h2>Book Your Spot</h2>
          <p className="mb-4 text-sm">Be the first to book your spot!</p>
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
