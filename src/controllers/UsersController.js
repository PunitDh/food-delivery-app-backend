const db = require("../config/dbConfig");

class Users {
  static async all() {
    const data = await db.query("SELECT * FROM users;");
    const users = data.rows.map((item) => {
      const { password, admin, ...user } = item;

      return user;
    });
    return users;
  }

  static async findOne(id) {
    const data = await db.query("SELECT * FROM users WHERE id=$1;", [id]);
    return data.rows.length > 0 ? data.rows[0] : null;
  }

  static async findByEmail(email) {
    const data = await db.query("SELECT * FROM users WHERE email=$1;", [email]);
    return data.rows.length > 0 ? data.rows[0] : null;
  }

  static async createOne({ firstname, lastname, email, password, admin }) {
    const data = await db.query(
      "INSERT INTO users (firstname, lastname, email, password, admin) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [firstname, lastname, email, password, admin]
    );
    return data.rows[0];
  }

  static async updateOne({ id, firstname, lastname, email, password, admin }) {
    const data = await db.query(
      "UPDATE users SET firstname=$1, lastname=$2, email=$3, password=$4, admin=$5 WHERE id=$6 RETURNING *;",
      [firstname, lastname, email, password, admin, id]
    );
    return data.rows.length > 0 ? data.rows[0] : null;
  }

  static async deleteOne(id) {
    const data = await db.query("DELETE FROM users WHERE id=$1 RETURNING *;", [
      id,
    ]);
    const { password, ...deletedUser } = data.rows[0];

    return deletedUser;
  }
}

module.exports = Users;

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
