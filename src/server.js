const express = require("express");
const router = require("./router");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use("/api", router(express.Router()));

module.exports = app;
