const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const URL = require("./config");
const msgModel = require("./models/msgModel");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/authentication", userRouter);
app.get("/", async (req, res) => {
  await mongoose.connect(URL);

  const result = await msgModel.find();
  res.json({ result });
});

io.on("connection", async (socket) => {
  await mongoose.connect(URL);

  socket.on("message", async (msg) => {
    const data = new msgModel(msg);
    const result = await data.save();
    console.log("Result:", result);
    io.emit("message", result);
  });
});

server.listen(5000);
