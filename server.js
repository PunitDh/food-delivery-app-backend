require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const AuthenticationRouter = require("./src/routers/AuthenticationRouter.js");
const AdminRouter = require("./src/routers/AdminRouter");

app.use(cors());
app.use(express.json());

app.use("/auth", AuthenticationRouter);
app.use("/admin", AdminRouter);

//Endpoints
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log("Server started on port", port));
