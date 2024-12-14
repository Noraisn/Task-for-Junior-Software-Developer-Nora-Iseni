export const ShortenerForm = () => {
  const expirationOptions = [
    "1 minute",
    "5 minutes",
    "30 minutes",
    "1 hour",
    "5 hours",
  ];

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-4">URL Shortener</h2>
      <form className="space-y-4 mx-auto">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Paste the URL to be shortened"
            className="flex-1 p-3 border focus:outline-none focus:ring-2 max-w-sm md:max-w-md"
          />
          <select className="p-3 border focus:outline-none focus:ring-2 text-[#8f8f8f]">
            <option  value="">Add expiration date</option>
            {expirationOptions.map((option, index) => (
              <option key={index}  value={option} className="text-[#8f8f8f]">
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="bg-[#89109c] text-white p-3 mt-4 w-36 h-11 flex items-center justify-center "
        >
          <p className="text-sm">Shorten URL</p>
        </button>
      </form>
    </div>
  );
};
