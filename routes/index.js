const bcrypt = require("bcrypt");
const { Router } = require("express");
const { graphqlHTTP } = require("express-graphql");
const jwt = require("jsonwebtoken");

const { resolver, schema } = require("../graphql");
const { authenticationMiddleware } = require("../middlewares");
const { Employee } = require("../models");
const { getSecretKey } = require("../utils");

const router = Router();

function loggingMiddleware(req, res, next) {
  if (req.url.startsWith('/graphql')) {
    console.log('GRAPHQL REQUEST: ', req.body);
  }
  next();
}
router.use(loggingMiddleware);

router.use(
  "/graphql",
  // authenticationMiddleware(),
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
    customFormatErrorFn: (error) => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path,
    })
  })
);

// Login form on frontend submits to here (using Ajax). Already registered Employees.
//Single session view for employees.
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email });

  if (!employee) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (!bcrypt.compareSync(password, employee.passwordDigest)) {
    res.status(401).json({ message: "Authentication failed" });
    return;
  }

  const token = jwt.sign(
    {
      _id: employee._id,
      email: employee.email,
      name: employee.name,
    },
    getSecretKey(),
    { expiresIn: "72h" }
  );

  res.json({ employee, token, success: true });
});

module.exports = router;
