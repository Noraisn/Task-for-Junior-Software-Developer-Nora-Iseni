import ShortenedURLItem from "./ShortenedURLItem";

export const ShortenedURLsList = ({ urls = [], deleteUrl }) => {
  return (
    <div className="mx-auto mt-8  ">
      <h2 className="text-xl font-bold mb-4">My shortened URLs</h2>
      <ul className="space-y-4">
        {urls.map((url) => (
          <ShortenedURLItem key={url.id} url={url} deleteUrl={deleteUrl} />
        ))}
      </ul>
    </div>
  );
};
