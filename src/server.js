const express = require("express");
const router = require("./router");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use("/api", router(express.Router()));

module.exports = app;
