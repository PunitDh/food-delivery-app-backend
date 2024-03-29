const db = require("../config/dbConfig");

const Items = {
  all: async () => {
    const data = await db.query("SELECT * FROM items;");
    return data.rows;
  },

  findOne: async (id) => {
    const data = await db.query("SELECT * FROM items WHERE id=$1;", [id]);
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  createOne: async ({ name, category, price, image, rating }) => {
    const data = await db.query(
      "INSERT INTO items (name, category, price, image, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [name, category, price, image, rating]
    );
    return data.rows[0];
  },

  updateOne: async ({ id, name, category, price, image, rating }) => {
    const data = await db.query(
      "UPDATE items SET name=$1, category=$2, price=$3, image=$4, rating=$5 WHERE id=$6 RETURNING *;",
      [name, category, price, image, rating, id]
    );
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  deleteOne: async (id) => {
    const data = await db.query("DELETE FROM items WHERE id=$1 RETURNING *;", [
      id,
    ]);
    return data.rows[0];
  },
};

module.exports = Items;

// (async () => {
//   console.log(await Users.all());
// })();

// (async () => {
//   console.log(await Users.findOne(1));
// })();

// (async () => {
//   console.log(await Users.deleteOne(1));
// })();

// (async () => {
//   console.log(
//     await Users.createOne({
//       firstname: "Prateek",
//       lastname: "Smith",
//       email: "me@me.com",
//       password: "postgresisnotawsum",
//       admin: true,
//     })
//   );
// })();

// (async () => {
//   console.log(
//     await Users.updateOne({
//       id: 3,
//       firstname: "Punit",
//       lastname: "Jackson",
//       email: "me@me.com",
//       password: "Chinki",
//       admin: true,
//     })
//   );
// })();
