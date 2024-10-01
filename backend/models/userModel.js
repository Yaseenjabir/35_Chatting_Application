const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Make email unique and required
  password: String,
});

const userModel = mongoose.model("users", schema);

module.exports = userModel;
