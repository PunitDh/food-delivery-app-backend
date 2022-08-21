const router = require("express").Router();

const Users = require("../controllers/UsersController");

const AuthHelper = require("../helpers/authentication");

router.post("/register", async (req, res) => {
  const registration = req.body;

  //   Check if the email exists in the database

  const users = await Users.findByEmail(registration.email);

  if (users.length > 0) {
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

  console.log(newUser);

  const jwt = AuthHelper.createJWT(newUser[0]);
  res.status(201).send(jwt);

  function sendBadRequest(message) {
    res.status(400).json({
      message,
    });
  }
});

router.post("/login", async (req, res) => {});

module.exports = router;
