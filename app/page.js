"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarLayout } from "./components/Sidebar/SidebarLayout";
import { ShortenerForm } from "./components/URLShortenerForm/ShortenerForm";

export default function Home() {
  const [urls, setUrls] = useState([]);
  const notifySuccess = () => toast.success("URL deleted successfully!");
  const notifyError = () => toast.error("Error while deleting the URL!");


 const refetchUrls = async () => {
    try {
      const response = await fetch("http://localhost:3000/api", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUrls(data);
      } else {
        console.error("Failed to fetch URLs:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const deleteUrl = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await refetchUrls();
        notifySuccess();
      } else {
        notifyError();
      }
    } catch {
      notifyError();
    }
  };

  useEffect(() => {
    refetchUrls();
  }, []);

  return (
    <div className="flex h-screen">
      <SidebarLayout urls={urls} deleteUrl={deleteUrl}  refetchUrls={refetchUrls}/>
      <main className="flex-1 p-24 ">
        <ShortenerForm refetchUrls={refetchUrls} />
      </main>
    </div>
  );
}
