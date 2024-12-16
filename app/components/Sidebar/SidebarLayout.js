import { AnchorzUpIcon } from "./AnchorzUpIcon";
import { ShortenedURLsList } from "./ShortenedURLList";

export const SidebarLayout = ({ urls, deleteUrl, refetchUrls }) => {
  return (
    <aside className="w-full md:w-1/5 bg-gray-100 h-screen p-4 flex flex-col pt-10">
      <AnchorzUpIcon />
      <ShortenedURLsList urls={urls} deleteUrl={deleteUrl} refetchUrls={refetchUrls} />
    </aside>
  );
};

export default SidebarLayout;
