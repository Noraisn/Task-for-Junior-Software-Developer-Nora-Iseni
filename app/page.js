"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarLayout } from "./components/Sidebar/SidebarLayout";
import { ShortenerForm } from "./components/URLShortenerForm/ShortenerForm";

export default function Home() {
  const [urls, setUrls] = useState([]);
  const notifySuccess = () => toast.success("URL deleted successfully!");
  const notifyError = () => toast.error("Error while deleting the URL!");

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

  console.log(urls);

  return (
    <div className="flex h-screen">
      <SidebarLayout urls={urls} deleteUrl={deleteUrl} />
      <ToastContainer position="top-center" autoClose={2000} closeOnClick theme="light"/>

      <main className="flex-1 p-24 ">
        <ShortenerForm refetchUrls={refetchUrls} />
      </main>
    </div>
  );
}
