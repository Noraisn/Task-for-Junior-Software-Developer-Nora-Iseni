const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS urls (
        id INTEGER PRIMARY KEY,
        longUrl TEXT,
        shortUrl TEXT,
        expireTime INTEGER,
        clickCount INTEGER DEFAULT 0
      )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created urls table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM urls`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from urls");

        // Insert new data into the products table
        const values1 = [
          "https://example.com/long-url",
          "http://short.ly/abc123",
          60,
          1
        ];

        const insertSql = `INSERT INTO urls(longUrl, shortUrl, expireTime, clickCount) VALUES(?, ?, ?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        //   Close the database connection after all insertions are done
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Closed the database connection.");
        });
      });
    }
  );

 
});
