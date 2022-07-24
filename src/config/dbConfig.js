const { Pool } = require("pg");
const db = new Pool({
  user: "prateek90",
  host: "localhost",
  database: "prateek90",
  password: "password",
  port: 5432,
});

// client.connect((err) => {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = db;
