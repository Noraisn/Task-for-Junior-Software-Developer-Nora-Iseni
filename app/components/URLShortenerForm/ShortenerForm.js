"use client";
import { ExpirationOptions } from "./ExpirationOptions";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShortenerForm = ({ refetchUrls }) => {
  const [expirationTime, setExpirationTime] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const notifySuccess = () => toast.success("URL inserted successfully!");
  const notifyError = () => toast.error("Error while inserting the URL!");


  const updateExpirationTime = (event) => {
    setExpirationTime(event.target.value);
  };
  const updateLongUrl = (event) => {
    setLongUrl(event.target.value);
  };

  const resetForm = () => {
    setExpirationTime("");
    setLongUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl,
          expirationTime: parseInt(expirationTime),
        }),
      });

      if (response.ok) {
        notifySuccess()
        resetForm();
         await refetchUrls();
      }
    } catch (error) {
      notifyError()
      console.error("Error during POST request:", error);
    }
  };



  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-4">URL Shortener</h2>
      <form className="space-y-4 mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Paste the URL to be shortened"
            className="flex-1 p-3 border focus:outline-none focus:ring-2 max-w-sm md:max-w-md"
            value={longUrl}
            onChange={updateLongUrl}
          />
          <ExpirationOptions
            expirationTime={expirationTime}
            updateExpirationTime={updateExpirationTime}
          />
        </div>
        <button className="bg-[#89109c] text-white p-3 mt-4 w-36 h-11 flex items-center justify-center ">
          <p className="text-sm">Shorten URL</p>
        </button>
        <ToastContainer position="top-center" autoClose={2000} closeOnClick theme="light"/>
      </form>
    </div>
  );
};
