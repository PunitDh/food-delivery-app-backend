const db = require("../config/dbConfig");

const Orders = {
  all: async () => {
    const data = await db.query("SELECT * FROM orders;");
    return data.rows;
  },

  findOne: async (id) => {
    const data = await db.query("SELECT * FROM orders WHERE id=$1;", [id]);
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  createOne: async ({ userid }) => {
    const data = await db.query(
      "INSERT INTO orders (userid) VALUES ($1) RETURNING *;",
      [userid]
    );
    return data.rows[0];
  },

  updateOne: async ({ id, userid }) => {
    const data = await db.query(
      "UPDATE orders SET userid=$1 WHERE id=$2 RETURNING *;",
      [userid, id]
    );
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  deleteOne: async (id) => {
    const data = await db.query("DELETE FROM orders WHERE id=$1 RETURNING *;", [
      id,
    ]);
    return data.rows[0];
  },
};

module.exports = Orders;

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

//   (async () => {
//     console.log(
//       await Users.updateOne({
//         id: 3,
//         firstname: "Punit",
//         lastname: "Jackson",
//         email: "me@me.com",
//         password: "Chinki",
//         admin: true,
//       })
//     );
//   }
// )();
