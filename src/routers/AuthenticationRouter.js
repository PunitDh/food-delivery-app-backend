const router = require("express").Router();

const Users = require("../controllers/UsersController");

router.post("/register", async (req, res) => {
  const registration = req.body;
  console.log(registration);

  //   Check if the email exists in the database

  const users = await Users.findByEmail(req.body.email);
  console.log(users);

  if (users.length > 0) {
    sendBadRequest("Email already exists");
    return;
  }

  //   Check if the passwords match
  if (req.body.password !== req.body.confirmPassword) {
    sendBadRequest("Passwords do not match");
    return;
  }
  // Check if the first name and the last name exist in the req.body
  if (req.body.firstname.length < 1 || req.body.lastname < 1) {
    sendBadRequest("First name or last name cannot be blank");
    return;
  }

  //   Passwords cannot be blank
  if (req.body.password.length < 1) {
    sendBadRequest("Password cannot be blank");

    return;
  }

  const newUser = await Users.createOne({
    ...req.body,
    admin: false,
  });

  res.json(newUser);

  function sendBadRequest(message) {
    res.status(400).json({
      message,
    });
  }
});

module.exports = router;
