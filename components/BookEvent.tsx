const BookEvent = () => {
  return (
    <form className="space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="py-1 px-2 border border-neutral-600 rounded-sm"
        />
      </div>

      <button className="py-1.5 px-4 w-full bg-teal-300 text-black font-bold text-sm rounded-sm">
        Submit
      </button>
    </form>
  );
};

export default BookEvent;
