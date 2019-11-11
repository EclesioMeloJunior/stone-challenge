const express = require("express");
const router = require("./router");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use("/api", router(express.Router()));

module.exports = app;
