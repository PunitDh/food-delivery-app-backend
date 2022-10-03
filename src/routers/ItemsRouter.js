const Items = require("../controllers/ItemsController");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const items = await Items.all();

    res.status(200).send(items);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
