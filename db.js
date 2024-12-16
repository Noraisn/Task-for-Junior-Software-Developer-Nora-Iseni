const sqlite3 = require("sqlite3").verbose();

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

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  
      longUrl TEXT NOT NULL,               
      shortUrl TEXT NOT NULL UNIQUE,          
      expireTime INTEGER NOT NULL,            
      clickCount INTEGER DEFAULT 0,           
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created urls table.");

      db.run(`DELETE FROM urls`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from urls");

        const values1 = [
          "https://gjirafa50.com/altoparlant-blow-bt460-hirte?utm_source=def-product&utm_medium=homepage&utm_campaign=homepage-featured-products",
          "http://localhost:3000/hd799inj",
          60,
          1,
        ];

        const insertSql = `INSERT INTO urls(longUrl, shortUrl, expireTime, clickCount) VALUES(?, ?, ?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID;
          console.log(`Rows inserted, ID ${id}`);
        });

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
