require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const sign_up = require("./routes/Create");
const logIn = require("./routes/Login");
const favorite = require("./routes/Favorite");

app.use(sign_up);
app.use(logIn);
app.use(favorite);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
