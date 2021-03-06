require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const database = require("./config/database");
const port = process.env.PORT || 8000;

mongoose.connect(database.uri, {
  useCreateIndex: true,
  useNewUrlParser: true
});

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.get("/ping", (req, res) => {
  return res.status(200).json({ ping: "pong" });
});
app.use(require("./routes"));


server.listen(port, () => console.log("🤘 server up 🤘"));
