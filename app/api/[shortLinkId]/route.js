import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db = null;

// Define the GET request handler function
export async function GET(req, res) {
  // Extract the "id" from the URL by splitting the URL and taking the last element
  const id = req.url.split("/").pop();

  // Log the extracted "id" to the console (for debugging purposes)
  console.log(id);

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./collection.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve an item based on the id
  const item = await db.get("SELECT * FROM urls WHERE id = ?", id);

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(item), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}


export async function DELETE(req, res) {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  console.log("do we come here");
  try {
    const urlId = new URL(req.url).pathname.split("/").pop(); // Extract ID from URL path

    // Delete the URL from the database
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
