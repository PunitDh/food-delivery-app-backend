const Users = require("../controllers/UsersController");

const router = require("express").Router();

router.get("/users", async (req, res) => {
  const users = await Users.all();

  res.send(users);
});

module.exports = router;
