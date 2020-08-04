const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const app = express();
app.use(formidable());
const router = express.Router();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require("../model/User");

router.post("/signUp", async (req, res) => {
  try {
    const alReadyExist = await User.findOne({ email: req.fields.email });
    if (alReadyExist) {
      return res.status(400).json({ message: `User Already exist` });
    }

    if (req.fields.username === "") {
      return res.status(401).json({ message: "username's field is missing" });
    }
    if (req.fields.email === "") {
      return res.status(401).json({ message: "email's field is missing" });
    }
    if (req.fields.phone === "") {
      return res.status(401).json({ message: "phone's field is missing" });
    }
    if (req.fields.password === "") {
      return res.status(401).json({ message: "password's field is missing" });
    }
    if (req.fields.password !== req.fields.passwordConfirm) {
      return res.status(401).json({ message: "your password is different" });
    } else {
      const password = req.fields.password;
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(16);

      const user = new User({
        email: req.fields.email,
        account: {
          username: req.fields.username,
          phone: req.fields.phone,
        },
        salt: salt,
        hash: hash,
        token: token,
      });
      await user.save();
      return res.status(200).json({
        id: user.id,
        token: token,
        account: {
          username: req.fields.username,
          phone: req.fields.phone,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
