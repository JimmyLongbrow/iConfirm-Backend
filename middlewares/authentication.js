const jwtAuthenticate = require("express-jwt");

const { getSecretKey } = require("../utils");

module.exports = () =>
  jwtAuthenticate({
    secret: getSecretKey(),
    algorithms: ["HS256"],
  });
