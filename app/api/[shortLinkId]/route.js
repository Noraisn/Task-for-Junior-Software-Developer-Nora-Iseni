import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

let db = null;

export async function GET(req, res) {
  try {
    const shortUrlId = req.url.split("/").pop();

    if (!db) {
      db = await open({
        filename: "./collection.db",
        driver: sqlite3.Database,
      });
    }

    const urlData = await db.get(
      "SELECT * FROM urls WHERE shortUrl LIKE ?",
      `%${shortUrlId}`
    );

    if (!urlData) {
      return new Response(JSON.stringify({ message: "URL not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    await db.run(
      "UPDATE urls SET clickCount = clickCount + 1 WHERE id = ?",
      urlData.id
    );

    const expirationTime = dayjs(urlData.createdAt)
      .add(urlData.expireTime, "minute")
      .tz("Europe/Belgrade");

    const hasExpired = dayjs().tz("Europe/Belgrade").isAfter(expirationTime);

    if (hasExpired) {
      return new Response(JSON.stringify({ message: "URL has expired" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }



    return new Response(JSON.stringify(urlData), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function DELETE(req, res) {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  try {
    const urlId = new URL(req.url).pathname.split("/").pop();

    const result = await db.run("DELETE FROM urls WHERE id = ?", urlId);

    if (result.changes > 0) {
      return new Response(
        JSON.stringify({ message: "URL deleted successfully" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "URL not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error deleting URL:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
