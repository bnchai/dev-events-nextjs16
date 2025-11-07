'use client';

import { FormEvent, useState } from 'react';

const BookEvent = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO: handleSubmit
    setIsSubmitted(true);
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
            className="py-2 px-4 w-full bg-teal-300 text-black font-bold text-sm rounded-sm"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
