const jwt = require("jsonwebtoken");
const { key } = require("../../config");

const buildAuthMiddleware = require("./auth.middleware");

const authMiddleware = buildAuthMiddleware({ key, jwtChecker: jwt.verify });

module.exports = { authMiddleware };
