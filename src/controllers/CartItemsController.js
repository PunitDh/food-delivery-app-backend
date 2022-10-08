const db = require("../config/dbConfig");

const CartItems = {
  all: async () => {
    const data = await db.query("SELECT * FROM cartitems;");
    return data.rows;
  },

  findOne: async (id) => {
    const data = await db.query("SELECT * FROM cartitems WHERE id=$1;", [id]);
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  findItemsByCartId: async (cartid) => {
    const data = await db.query("SELECT * FROM cartitems WHERE cartid=$1;", [
      cartid,
    ]);
    return data.rows;
  },

  findItemInCart: async ({ cartid, itemid }) => {
    const data = await db.query(
      "SELECT * FROM cartitems WHERE cartid=$1 AND itemid=$2;",
      [cartid, itemid]
    );
    return data.rows;
  },

  createOne: async ({ cartid, itemid, quantity }) => {
    const data = await db.query(
      "INSERT INTO cartitems (cartid, itemid, quantity) VALUES ($1, $2, $3) RETURNING *;",
      [cartid, itemid, quantity]
    );
    return data.rows[0];
  },

  updateOne: async ({ id, cartid, itemid, quantity }) => {
    const data = await db.query(
      "UPDATE cartitems SET cartid=$1, itemid=$2, quantity=$3 WHERE id=$4 RETURNING *;",
      [cartid, itemid, quantity, id]
    );
    return data.rows.length > 0 ? data.rows[0] : null;
  },

  deleteOne: async (id) => {
    const data = await db.query(
      "DELETE FROM cartitems WHERE id=$1 RETURNING *;",
      [id]
    );
    return data.rows[0];
  },
};

module.exports = CartItems;

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
