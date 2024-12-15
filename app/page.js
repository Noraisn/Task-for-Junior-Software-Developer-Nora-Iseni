"use client";
import { useEffect, useState } from "react";
import { SidebarLayout } from "./components/Sidebar/SidebarLayout";
import { ShortenerForm } from "./components/URLShortenerForm/ShortenerForm";

export default function Home() {
  const [urls, setUrls] = useState([]);

  const refetchUrls = () => {
    fetch("http://localhost:3000/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUrls(data))
      .catch((error) => console.error("Error fetching URLs:", error));
  };

  const deleteUrl = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        refetchUrls();
      } else {
        console.error("Error deleting URL:", response.statusText);
      S}
    } catch (error) {
      console.error("Error during DELETE request:", error);
    }
  };

  useEffect(() => {
    refetchUrls();
  }, []);

  console.log(urls);

  return (
    <div className="flex h-screen">
      <SidebarLayout urls={urls} deleteUrl={deleteUrl} />

      <main className="flex-1 p-24 ">
        <ShortenerForm refetchUrls={refetchUrls} />
      </main>
    </div>
  );
}
