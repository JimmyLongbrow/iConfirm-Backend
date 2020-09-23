const getPort = () => process.env.PORT || 1337;
const getSecretKey = () => process.env.SERVER_SECRET_KEY;
const getToken = () => process.env.TOKEN;

module.exports = {
  getPort,
  getSecretKey,
  getToken,
};
