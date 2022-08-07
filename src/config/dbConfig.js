const { Pool } = require("pg");
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// client.connect((err) => {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = db;
