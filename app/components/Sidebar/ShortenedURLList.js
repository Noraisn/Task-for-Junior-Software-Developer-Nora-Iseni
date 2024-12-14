import ShortenedURLItem from "./ShortenedURLItem";


export const ShortenedURLsList = () => {
  const urls = [
    { id: 1, shortURL: "https://shorturl.co/ckrDR" },
    { id: 2, shortURL: "https://shorturl.co/cdbEa" },
    { id: 3, shortURL: "https://shorturl.co/3avoE" },
  ];

  return (
    <div className="mx-auto mt-8  "> 
    <h2 className="text-xl font-bold mb-4">My shortened URLs</h2>
    <ul className="space-y-4">
      {urls.map((url) => (
        <ShortenedURLItem key={url.id} url={url} />
      ))}
    </ul>
  </div>
  );
};
