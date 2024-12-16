import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
export const ShortenedURLItem = ({ url, deleteUrl, refetchUrls }) => {
  const handleClick = async () => {
    try {
      await refetchUrls(); 
    } catch (error) {
      console.error("Error updating click count:", error);
    }
  };
  return (
    <li className="mb-4">
    <div className="flex justify-between items-center">
      <a
        href={url.shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[#30b3e3] hover:text-[#125b82] underline flex-grow"
        onClick={handleClick}
      >
        {url.shortUrl}
      </a>
      <button
        onClick={() => deleteUrl(url.id)}
        className="text-gray-500 hover:text-gray-700 ml-6"
      >
        <RiDeleteBin6Line />
      </button>
    </div>
    <p className="text-[10px] text-[#89109c] mt-1">
      This link has been clicked {url.clickCount} times.
    </p>
  </li>
  );
};

export default ShortenedURLItem;
