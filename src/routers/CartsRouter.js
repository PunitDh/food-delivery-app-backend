const CartItems = require("../controllers/CartItemsController");

const router = require("express").Router();

router.post("/:cartid/add/:itemid", async (req, res) => {
  const { cartid, itemid } = req.params;
  const itemInCart = await CartItems.findItemInCart({ cartid, itemid });

  if (itemInCart.length > 0) {
    const cartItem = await CartItems.updateOne({
      id: itemInCart[0].id,
      cartid,
      itemid,
      quantity: itemInCart[0].quantity + 1,
    });
    console.log(cartItem);
  } else {
    const cartItem = await CartItems.createOne({
      cartid,
      itemid,
      quantity: 1,
    });
    console.log(cartItem);
  }

  const itemsInCurrentCart = await CartItems.findItemsByCartId(cartid);

  res.send(itemsInCurrentCart);
});

module.exports = router;
