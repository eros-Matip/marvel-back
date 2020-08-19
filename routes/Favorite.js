const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/IsAuthenticated");

const app = express();
app.use(formidable());
const router = express.Router();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Icon = require("../model/Icon");

router.get("/favorite", isAuthenticated, async (req, res) => {
  try {
    const favoris = new Icon({
      name: req.fields.name,
      thumbnail: req.fields.thumbnail,
    });

    await favoris.save();

    console.log("favoris->", favoris);

    return res.status(200).json({ message: "hello world" });
  } catch (error) {
    console.error({ error: error.message });
  }
});

module.exports = router;
