const mongoose = require("mongoose");

const Icon = mongoose.model("Icon", {
  name: String,
  thumbnail: { path: String, extension: String },
});
module.exports = Icon;
