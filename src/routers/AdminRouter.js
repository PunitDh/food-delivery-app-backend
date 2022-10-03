const Users = require("../controllers/UsersController");
const Items = require("../controllers/ItemsController");
const S3UploadHelper = require("../helpers/S3UploadHelper");

const router = require("express").Router();

router.get("/users", async (req, res) => {
  const users = await Users.all();

  res.send(users);
});

router.get("/items", async (req, res) => {
  const items = await Items.all();

  res.send(items);
});

router.post("/items/create", async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  // console.log(req.data);

  const itemImg = req.files.image;
  const image = await S3UploadHelper.uploadFile(itemImg);
  // console.log(itemUrl);

  const item = await Items.createOne({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price * 100,
    image,
  });

  res.status(201).send(item);
});

module.exports = router;
