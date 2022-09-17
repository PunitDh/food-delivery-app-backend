const db = require("../config/dbConfig");

const OrderItems = {
  all: async () => {
    const data = await db.query("SELECT * FROM orderitems;");
    return data.rows;
  },

  findOne: async (id) => {
    const data = await db.query("SELECT * FROM orderitems WHERE id=$1;", [id]);
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  createOne: async ({ orderid, itemid, quantity }) => {
    const data = await db.query(
      "INSERT INTO orderitems (orderid, itemid, quantity) VALUES ($1, $2, $3) RETURNING *;",
      [orderid, itemid, quantity]
    );
    return data.rows[0];
  },

  updateOne: async ({ id, orderid, itemid, quantity }) => {
    const data = await db.query(
      "UPDATE orderitems SET orderid=$1, itemid=$2, quantity=$3 WHERE id=$4 RETURNING *;",
      [orderid, itemid, quantity, id]
    );
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  deleteOne: async (id) => {
    const data = await db.query(
      "DELETE FROM orderitems WHERE id=$1 RETURNING *;",
      [id]
    );
    return data.rows[0];
  },
};

module.exports = OrderItems;

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
