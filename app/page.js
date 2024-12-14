"use client";
import { useEffect, useState } from "react";
import { SidebarLayout } from "./components/Sidebar/SidebarLayout";
import {ShortenerForm} from "./components/URLShortenerForm/ShortenerForm"

export default function Home() {
  const [items, setItems] = useState([]); // Initialize the state with an empty

  useEffect(() => {
    fetch("http://localhost:3000/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request headers to indicate JSON format
      },
    })
      .then((res) => res.json()) // Parse the response data as JSON
      .then((data) => setItems(data)); // Update the state with the fetched data
  }, []);

  console.log(items);

  return (
    <div className="flex h-screen">
    <SidebarLayout />
  
    <main className="flex-1 p-24 ">
      <ShortenerForm />
    </main>
  </div>
  );
}
