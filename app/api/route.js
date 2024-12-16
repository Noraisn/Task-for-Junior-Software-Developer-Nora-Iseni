import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

let db = null;
const APP_URL = "http://localhost:3000/";

const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 10);
};

async function initializeDb() {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
}

export async function GET(req, res) {
  await initializeDb();

  const urls = await db.all("SELECT * FROM urls");
  return new Response(JSON.stringify(urls), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function POST(req) {
  await initializeDb();

  try {
    const { longUrl, expirationTime } = await req.json();

    let shortUrlPath = "";
    let shortUrl = "";
    let isUnique = false;

    while (!isUnique) {
      shortUrlPath = generateRandomString();
      const existingUrl = await db.get(
        "SELECT shortUrl FROM urls WHERE shortUrl = ?",
        `${APP_URL}${shortUrlPath}`
      );

      if (!existingUrl) {
        isUnique = true;
      }
    }

    shortUrl = `${APP_URL}${shortUrlPath}`;
    await db.run(
      "INSERT INTO urls (longUrl, shortUrl, expireTime, clickCount, createdAt) VALUES (?, ?, ?, ?, ?)",
      longUrl,
      shortUrl,
      expirationTime,
      0,
      dayjs().tz().format()
    );

    return new Response(
      JSON.stringify({ message: "URL shortened successfully" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
