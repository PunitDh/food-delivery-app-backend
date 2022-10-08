const CartItems = require("../controllers/CartItemsController");
const Items = require("../controllers/ItemsController");

const router = require("express").Router();

router.post("/:cartid/add/:itemid", async (req, res) => {
  const { cartid, itemid } = req.params;
  const itemInCart = await CartItems.findItemInCart({ cartid, itemid });

  if (itemInCart.length > 0) {
    const items = await CartItems.findAndUpdateQuantity({
      cartid,
      itemid,
      quantityToUpdate: 1,
    });

    res.status(200).send(items);
  } else {
    const result = await CartItems.createOne({
      cartid,
      itemid,
      quantity: 1,
    });

    res.status(201).send(result);
  }

  // const itemsInCurrentCart = await CartItems.findItemsByCartId(cartid);
});

router.get("/items/:cartid", async (req, res) => {
  const itemsInCurrentCart = await CartItems.findItemsByCartId(
    req.params.cartid
  );

  const items = [];
  for (const cartItem of itemsInCurrentCart) {
    const item = await Items.findOne(cartItem.itemid);

    items.push({ quantity: cartItem.quantity, ...item });
  }

  res.send(items);
});

router.delete("/:cartid/remove/:itemid", async (req, res) => {
  const { cartid, itemid } = req.params;
  const itemToRemove = await CartItems.findAndUpdateQuantity({
    cartid,
    itemid,
    quantityToUpdate: -1,
  });

  // const itemsInCurrentCart = await CartItems.findItemsByCartId(cartid);

  res.send(itemToRemove);
});

module.exports = router;
