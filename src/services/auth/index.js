const jwt = require("jsonwebtoken");
const { key } = require("../../config");

const buildAuthenticate = require("./authenticate");

const authenticate = buildAuthenticate({ key, jwtGenerator: jwt.sign });

module.exports = { authenticate };
