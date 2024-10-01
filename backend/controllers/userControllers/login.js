const mongoose = require("mongoose");
const URL = require("../../config");
const userModel = require("../../models/userModel");
async function login(req, res) {
  const payload = req.body;

  await mongoose.connect(URL);

  console.log("HELLO EVERYONE");

  const user = await userModel.findOne({ email: payload.email });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid email or password" });
  }

  return res
    .status(200)
    .json({ success: true, message: "User logged In", user });
}

module.exports = login;
