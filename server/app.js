const express = require("express");
const cors = require("cors");
const path = require("path");

const messagesRouter = require("./controllers/messagesRouter");
const usersRouter = require("./controllers/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use("/api/messages", messagesRouter);
app.use("/api/users", usersRouter);

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
module.exports = app;
