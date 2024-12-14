import { AnchorzUpIcon } from "./AnchorzUpIcon";
import { ShortenedURLsList } from "./ShortenedURLList";

export const SidebarLayout = () => {
  return (
    <aside className="w-full md:w-1/6 bg-gray-100 h-screen p-4 flex flex-col pt-10">
      <AnchorzUpIcon />
      <ShortenedURLsList />
    </aside>
  );
};

export default SidebarLayout;
