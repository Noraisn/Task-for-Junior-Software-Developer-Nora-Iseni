import { RiDeleteBin6Line } from "react-icons/ri";

export const ShortenedURLItem = ({ url }) => {
  return (
    <li className="flex justify-between items-center ">
      <a
        href={url.shortURL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[#30b3e3] hover:text-[#125b82] underline flex-grow pr-6"
      >
        {url.shortURL}
      </a>
      <button className="text-gray-500 hover:text-gray-700 ml-4 ">
        <RiDeleteBin6Line />
      </button>
    </li>
  );
};

export default ShortenedURLItem;
