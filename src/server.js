require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const fs = require("fs");
var options = {
  key: fs.readFileSync("./file.pem"),
  cert: fs.readFileSync("./file.crt")
};

const app = express();
// http
// const server = require("http").Server(app);
// https
const server = require("https").createServer(options, app);
// const io = require("socket.io")(server);

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
app.get("/ping", (req, res) => res.json({ ping: "pong" }));
app.use(require("./routes"));

server.listen(port, () => console.log("🤘 server up 🤘"));
