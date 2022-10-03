require("dotenv").config();
const Items = require("../controllers/ItemsController");

const items = [
  {
    id: "1",
    category: "burger",
    name: "Chicken Burger",
    image:
      "https://prateek-khindri-food-delivery-app.s3.ap-southeast-2.amazonaws.com/chicken-burger.png",
    price: 1500,
    rating: 3.5,
  },
];

// items.map(async ({ name, category, price, image, rating }) => {
//   await Items.createOne({ name, category, price, image, rating });
// });

// (async () => {
//   console.log(await Items.deleteOne(1));
// })();
