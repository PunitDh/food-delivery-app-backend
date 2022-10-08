require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const port = process.env.PORT || 5000;
const AuthenticationRouter = require("./src/routers/AuthenticationRouter.js");
const AdminRouter = require("./src/routers/AdminRouter");
const ItemsRouter = require("./src/routers/ItemsRouter");
const CartsRouter = require("./src/routers/CartsRouter");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/auth", AuthenticationRouter);
app.use("/admin", AdminRouter);
app.use("/items", ItemsRouter);
app.use("/carts", CartsRouter);

//Endpoints
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log("Server started on port", port));
