import { redirect } from "next/navigation";

export default async function VerifyRedirectLink({ params }) {
  const { shortLinkId } = await params;
  const data = await fetch(`http://localhost:3000/api/${shortLinkId}`);
  const result = await data.json();
  console.log('resulttt', result)
  if (result) {
    if (result.message === "URL has expired") {
      return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-[#89109c] font-bold text-2xl">
          The link has expired.
        </h1>
      </div>
      );
    } else {
      redirect(result.longUrl);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-gray-700 font-semibold text-xl">
        Redirecting for {result.longUrl}
      </h1>
    </div>
  );
}
