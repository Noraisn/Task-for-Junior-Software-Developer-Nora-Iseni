export const ExpirationOptions = ({ expirationTime, updateExpirationTime }) => {
  const expirationOptions = [
    { value: 1, label: '1 minute' },
    { value: 5, label: '5 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 300, label: '5 hours' },
  ];

  return (
    <select
      className="p-3 border focus:outline-none focus:ring-2 text-[#8f8f8f]"
      value={expirationTime}
      onChange={updateExpirationTime}
    >
      <option>Add expiration date</option>
      {expirationOptions.map((option, index) => (
        <option key={index} value={option.value} className="text-[#8f8f8f]">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ExpirationOptions;
