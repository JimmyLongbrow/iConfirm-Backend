const authenticationMiddleware = require("./authentication");
const errorMiddleware = require("./error");

module.exports = {
  authenticationMiddleware,
  errorMiddleware,
};
