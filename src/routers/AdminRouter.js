const Users = require("../controllers/UsersController");
const Items = require("../controllers/ItemsController");

const router = require("express").Router();

router.get("/users", async (req, res) => {
  const users = await Users.all();

  res.send(users);
});

router.get("/items", async (req, res) => {
  const items = await Items.all();

  res.send(items);
});

module.exports = router;
