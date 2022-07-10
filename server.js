require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Endpoints
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log("Server started on port", port));
