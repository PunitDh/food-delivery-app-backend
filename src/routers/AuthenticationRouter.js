const router = require("express").Router();

const Users = require("../controllers/UsersController");

const AuthHelper = require("../helpers/AuthHelper");

const Carts = require("../controllers/CartsController");

router.post("/register", async (req, res) => {
  const registration = req.body;

  //   Check if the email exists in the database
  const userExists = await Users.findByEmail(registration.email);

  if (userExists) {
    sendBadRequest("Email already exists");
    return;
  }

  //   Check if the passwords match
  if (registration.password !== registration.confirmPassword) {
    sendBadRequest("Passwords do not match");
    return;
  }
  // Check if the first name and the last name exist in the registration
  if (registration.firstname.length < 1 || registration.lastname.length < 1) {
    sendBadRequest("First name or last name cannot be blank");
    return;
  }

  //   Passwords cannot be blank
  if (registration.password.length < 1) {
    sendBadRequest("Password cannot be blank");

    return;
  }

  const hashedPassword = await AuthHelper.hashPassword(registration.password);

  const newUser = await Users.createOne({
    ...registration,
    password: hashedPassword,
    admin: false,
  });

  const cart = await Carts.createOne({ userid: newUser.id });

  const jwt = AuthHelper.createJWT({ cartId: cart.id, ...newUser });
  res.status(201).send(jwt);

  function sendBadRequest(message) {
    res.status(400).json({
      message,
    });
  }
});

router.post("/login", async (req, res) => {
  const login = req.body;
  const user = await Users.findByEmail(login.email);
  console.log(user);

  if (!user) {
    res.status(404).json({
      message: "Email does not exist",
    });
    return;
  }
  if (!(await AuthHelper.comparePassword(login.password, user.password))) {
    res.status(401).json({
      message: "Password does not match",
    });
    return;
  }

  const cart = await Carts.findByUserId(user.id);

  const jwt = AuthHelper.createJWT({ cartId: cart.id, ...user });
  res.status(200).send(jwt);
});

router.delete("/:id", async (req, res) => {
  const deletedUser = await Users.deleteOne(req.params.id);

  res.send(deletedUser);
});

module.exports = router;
