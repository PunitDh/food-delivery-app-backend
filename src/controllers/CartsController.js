const db = require("../config/dbConfig");

const Carts = {
  all: async () => {
    const data = await db.query("SELECT * FROM carts;");
    return data.rows;
  },

  findOne: async (id) => {
    const data = await db.query("SELECT * FROM carts WHERE id=$1;", [id]);
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  findByUserId: async (userid) => {
    const data = await db.query("SELECT * FROM carts WHERE userid=$1;", [
      userid,
    ]);
    return data.rows[0];
  },

  createOne: async ({ userid }) => {
    const data = await db.query(
      "INSERT INTO carts (userid) VALUES ($1) RETURNING *;",
      [userid]
    );
    return data.rows[0];
  },

  updateOne: async ({ id, userid }) => {
    const data = await db.query(
      "UPDATE carts SET userid=$1 WHERE id=$2 RETURNING *;",
      [userid, id]
    );
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  deleteOne: async (id) => {
    const data = await db.query("DELETE FROM carts WHERE id=$1 RETURNING *;", [
      id,
    ]);
    return data.rows[0];
  },
};

module.exports = Carts;

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
