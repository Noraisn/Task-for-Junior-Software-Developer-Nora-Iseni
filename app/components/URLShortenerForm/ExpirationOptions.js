export const ExpirationOptions = ({ expirationTime, updateExpirationTime }) => {
  const expirationOptions = [1, 5, 30, 60, 300];

  return (
    <select
      className="p-3 border focus:outline-none focus:ring-2 text-[#8f8f8f]"
      value={expirationTime}
      onChange={updateExpirationTime}
    >
      <option>Add expiration date</option>
      {expirationOptions.map((option, index) => (
        <option key={index} value={option} className="text-[#8f8f8f]">
          {option} minutes
        </option>
      ))}
    </select>
  );
};

export default ExpirationOptions;
