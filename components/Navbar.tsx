import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-900/60 backdrop-blur-md border-b border-neutral-800">
      <div className="mx-auto py-4 px-6 container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p className="text-lg font-bold italic">DevEvent</p>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Events</Link>
            </li>
            <li>
              <Link href="/">Create Event</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
