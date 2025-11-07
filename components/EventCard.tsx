import { IEvent } from '@/database/models';
import Image from 'next/image';
import Link from 'next/link';

const EventCard = ({ title, slug, image, date, time, location }: IEvent) => {
  return (
    <Link href={`/events/${slug}`} className="space-y-2">
      <Image
        src={image}
        width={400}
        height={200}
        alt={title}
        className="w-full aspect-[2] object-cover rounded-md"
      />
      <div className="flex items-center gap-2">
        <Image src="/icons/pin.svg" width={12} height={12} alt="calendar" />
        <p className="text-sm text-gray-400">{location}</p>
      </div>
      <p className="text-gray-100 font-bold">{title}</p>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/calendar.svg"
            width={16}
            height={16}
            alt="calendar"
          />
          <p>{date}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/icons/clock.svg" width={16} height={16} alt="clock" />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
