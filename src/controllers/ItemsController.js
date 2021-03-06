const db = require("../config/dbConfig");

const Items = {
  all: async () => {
    const data = await db.query("SELECT * FROM items;");
    return data.rows;
  },

  findOne: async (id) => {
    const data = await db.query("SELECT * FROM items WHERE id=$1;", [id]);
    return data.rows;
  },

  createOne: async ({ name, description, price, image }) => {
    const data = await db.query(
      "INSERT INTO items (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *;",
      [name, description, price, image]
    );
    return data.rows;
  },

  updateOne: async ({ id, name, description, price, image }) => {
    const data = await db.query(
      "UPDATE items SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5 RETURNING *;",
      [name, description, price, image, id]
    );
    return data.rows;
  },

  deleteOne: async (id) => {
    const data = await db.query("DELETE FROM items WHERE id=$1;", [id]);
    return data.rows;
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
