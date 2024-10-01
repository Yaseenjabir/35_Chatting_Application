const { default: mongoose } = require("mongoose");
const userModel = require("../../models/userModel");
const URL = require("../../config");

async function signup(req, res) {
  const payload = req.body;
  await mongoose.connect(URL);

  const user = await userModel.findOne({ email: payload.email });

  if (user) {
    return res.json({ success: false, message: "User already exists" });
  }

  const data = new userModel(payload);
  const result = await data.save();
  return res.json({
    success: true,
    message: "User created succesfully",
    result,
  });
}

module.exports = signup;
