const express = require("express");
const cors = require("cors");
const path = require("path");

const messagesRouter = require("./controllers/messagesRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use("/api/messages", messagesRouter);
// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
module.exports = app;
