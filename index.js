require("dotenv/config");

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const { errorMiddleware } = require("./middlewares");
const routes = require("./routes");
const { getPort } = require("./utils");

mongoose.connect("mongodb://127.0.0.1:27017/iconfirm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// Middlewares
app.use(cors()); // Use cors as Express middleware, i.e. set the CORS allow header
app.use(express.json()); // Enable support for JSON-encoded request bodies (i.e. posted formdata)
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use(routes);

const listener = app.listen(getPort(), () => {
  console.log(`Listening at http://localhost:${listener.address().port} ...`);
});
