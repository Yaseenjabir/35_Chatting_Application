const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  message: String,
  username: String,
  timeStamp: Date,
});

const msgModel = mongoose.model("msgs", Schema);

module.exports = msgModel;
