const express = require("express");
const mongoose = require("mongoose");
const app = express();

const User = mongoose.model("User", {
  email: { type: String, require: true },
  account: {
    username: String,
    phone: String,
  },
  token: String,
  hash: String,
  salt: String,
});
module.exports = User;
