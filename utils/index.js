const getPort = () => process.env.PORT || 1337;
const getSecretKey = () => process.env.SERVER_SECRET_KEY;
const getToken = () => process.env.TOKEN;
const smsAuthToken = () => process.env.AUTH_TOKEN;

module.exports = {
  getPort,
  getSecretKey,
  getToken,
  smsAuthToken
};
