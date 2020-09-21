// DB init

//---------------------------

const { MongoClient, ObjectId } = require('mongodb');
let db;

MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology: true}, (err, client) => {

  if(err) return console.log( err );

  db = client.db('iconfirm') //success!
  console.log('Connected, using db: iconfirm');

}); //connect()


//----------------------

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const jwtAunthenticate = require('express-jwt');

const checkAuth = () => {
  return jwtAunthenticate({
    secret: SERVER_SECRET_KEY,
    algorithms: ['HS256']
  });
};

console.log(process.env.SERVER_SECRET_KEY);


const express = require('express');
const app = express();
const PORT = 1337;

const cors = require('cors');
app.use( cors() );  // Use cors as Express middleware, i.e. set the CORS allow header

app.use( express.json() ); // Enable support for JSON-encoded request bodies (i.e. posted formdata)
app.use( express.urlencoded({ extended: true }) );

const { graphqlHTTP }  = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    employee(id: String): Employee,
    employees(
      employeeType: String,
      profilePic: Text,
      name: String,
      phone: String,
      email: String,
      securityLicStatus: Boolean,
      rsaLicStatus: Boolean,
      firstAidExp: Date
    ): [Employee],

    venue(id: String): Venue,
    venues(
      logo: Text,
      name: String,
      address: String,
      phone: String,
      email: String,
      licenseeName: String,
      liquorLicNo: String,
      liquorLicStatus: Boolean,
      masterLicNo: String,
      masterLicExp: Date,
      masterLicStatus: Boolean,
      membershipDate: Datetime
    ): [Venue],

    roster(id: String): Roster,
    rosters(
      date: Datetime,
      venueId: Integer,
      employeeType: String
    ): [Roster],

    shift(id: String): Shift,
    shifts(
      date: Date,
      clockOnDate: Date,
      clockOffDate: Date,
      employeeId: Integer,
      rosterId: Integer,
      shiftConfirmed: Boolean
    ): [Shift],
  },


  type Employee {
    employeeType: String,
    profilePic: Text,
    name: String,
    shifts: [Shift],
    dob: Date,
    address: String,
    phone: String,
    email: String,
    passwordDigest: Text,
    emergencyContactName: String,
    emergencyContactPhone: String,
    securityLicNo: String,
    securityLicStatus: Boolean,
    rsaNo: String,
    rsaLicStatus: Boolean,
    firstAidExp: Date
  },

  type Roster {
    date: Datetime,
    venueId: Integer,
    venue: Venue,
    shifts: [Shift],
    employeeType: String
  },

  type Shift {
    date: Date,
    clockOnDate: Date,
    clockOffDate: Date,
    employeeId: Integer,
    employee: Employee,
    rosterId: Integer,
    roster: Roster,
    shiftConfirmed: Boolean
  },

  type Venue {
    logo: Text,
    name: String,
    address: String,
    phone: String,
    email: String,
    licenseeName: String,
    liquorLicNo: String,
    liquorLicStatus: Boolean,
    masterLicNo: String,
    masterLicExp: Date,
    masterLicStatus: Boolean,
    membershipDate: Datetime
  }
`);

const getRoster = (query) => {
  console.log('getRoster()', query);

  return new Promise( (resolve, reject) => {

    db.collection('rosters').findOne(ObjectId(query.id),(err, roster) => {

      if( err ){
        reject( err );
        return console.log('Error querying roster', err);
      }

      console.log('found roster', roster);

    }); //db

  }); //promises

}; //getRoster

const getRosters = (query) => {
  console.log('getRosters()', query);

  return new Promise( (resolve, reject) => {

    db.collection('rosters').find(query).toArray((err, rosters) => {

      if( err ){
        reject( err );
        return console.log('Error querying rosters', err);
      }

      console.log('found rosters', rosters);
      resolve(rosters);

    }); //db

  }); //promises

}; //getRosters



const rootResolver = {
  roster: getRoster,
  rosters: getRosters
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphql: true
}));

// TODO: Use "Apollo" package in the frontend to do GraphQL
// queries from inside React

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT} ...`);
});


app.get('/rosters', (req, res) => {

  db.collection('rosters').find().toArray( (err, result) => {

    if( err ){
      console.log('Query error: ', err );
      return res.sendStatus(500); // report error as HTTP 500 to browser
    } // if

    res.json( result ); // send the DB result back to the browser as JSON

  }); //db

}); // GET /rosters

app.get('/rosters/search/:date/:employeeType', checkAuth(),(req, res) => {


  db.collection('rosters').find({
    date: req.params.date,
    employeeType: req.params.employeeType
  })
  .toArray( (err, results) => {

    if( err ){
      res.sendStatus(500);
      return console.log('Error searching rosters:', err);
    }

    res.json( results );

  });

}); // get /rosters/search/:date/:employeeType



app.get('/rosters/:venueId', (req, res) => {

  db.collection('rosters').findOne(
    { venueId: req.params.venueId },
    (err, roster) => {

      if( err ){
        res.sendStatus(500);
        return console.log('Error finding roster', err);
      }

      res.json( roster );

    } // query callback
  );

}); // GET /rosters/:venueId




app.post('/shifts', (req, res) => {
  // res.json( req.body );

// TODO: implement the damn employee auth is manager/admin
  const FAKE_USER_ID = 10;

  console.log('POST /shifts', req.body);

  db.collection('rosters').updateOne(
    // 1. Query to find the document you want to update:
    { _id: ObjectId(req.body.rosterId) },

    // 2. Specify the changes to make, i.e. the update data:
    {
      $push: {
        shifts: {
          date: req.body.date,
          shiftConfirmed: req.body.shiftConfirmed,
          clockOnDate: req.body.clockOnDate,
          clockOffDate: req.body.clockOffDate,
          employeeId: FAKE_USER_ID,
          rosterId: req.body.rosterId
        }
      } // $push
    }, // update arg

    // 3. Callback to run when the update is finished:
    (err, result) => {

      if( err ){
        res.sendStatus( 500 );
        return console.log('Error saving shifts', err);
      }

      // Need to send back the kind of data the
      // ReservationConfirm component is expecting,
      // so it will actually update the seating diagram
      // correctly:

      console.log('update done:', result);

      res.json({
        date: req.body.date,
        shiftConfirmed: req.body.shiftConfirmed,
        clockOnDate: req.body.clockOnDate,
        clockOffDate: req.body.clockOffDate,
        employeeId: FAKE_USER_ID,
        rosterId: req.body.rosterId
      });

    }

  );

}); // POST /shifts



// Login form on frontend submits to here (using Ajax)
app.post('/login', (req, res) => {
  console.log('posted data:', req.body);
  // res.json( req.body ); // echo back the POSTed formdata

  const { email, password } = req.body;

  db.collection('employees').findOne({ email }, (err, employee) => {

    if( err ){
      res.status(500).json({ message: 'Server error' });
      return console.log('Error retrieving employee', err);
    }

    console.log('employee found:', employee);
    // res.json( employee );

    // Check that we actually found a employee with the specified email,
    // and also that the password given matches the password for
    // that employee
    if( employee && bcrypt.compareSync(password, employee.passwordDigest) ){
      // Successful login!

      // Generate a signed JWT token which contains the employee data
      const token = jwt.sign(
        {
          _id: employee._id,
          email: employee.email,
          name: employee.name
        },
        SERVER_SECRET_KEY,
        { expiresIn: '72h' }
      );

      res.json({ employee, token, success: true });

    } else {
      // employee not found, or passwords don't match - failed login
      res.status(401).json({ message: 'Authentication failed' });
    }


  }); // find employee

}); // POST /login

// Check authentication for this route, i.e. logged-in employees only
app.get('/rosters-seekrit', checkAuth(), (req, res) => {
  res.json({ seekrit: 'Welcome to Manager Section', employee: req.employee });
});

// Define an error handler function for express to use
// whenever there is an authentication error
app.use( (err, req, res, next) => {
  if( err.name === 'UnauthorizedError' ){
    console.log('Unauthorized Request:', req.path);
    res.status(401).json({ error: 'Invalid token' });
  }
});


// TEST using curl:
// curl -XPOST -d '{"email":"one@one.com", "password":"chicken"}' http://localhost:1337/login -H 'content-type: application/json'

// How to mark certain routes as logged-in only?
