// DB init
const mongoose = require('mongoose')
const Roster = require('./models/Roster');
const Employee = require('./models/Employee');
const Venue = require('./models/Venue');
const Shift = require('./models/Shift');
mongoose.connect('mongodb://127.0.0.1:27017/iconfirm', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const jwtAunthenticate = require('express-jwt');

const SERVER_SECRET_KEY = ('process.env.SERVER_SECRET_KEY');
const checkAuth = () => {
  return jwtAunthenticate({
    secret: SERVER_SECRET_KEY,
    algorithms: ['HS256']
  });
};



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
      profilePic: String,
      name: String,
      phone: String,
      email: String,
      securityLicStatus: Boolean,
      rsaLicStatus: Boolean,
      firstAidExp: String
    ): [Employee],

    venue(id: String): Venue,
    venues(
      logo: String,
      name: String,
      address: String,
      phone: String,
      email: String,
      licenseeName: String,
      liquorLicNo: String,
      liquorLicStatus: Boolean,
      masterLicNo: String,
      masterLicExp: String,
      masterLicStatus: Boolean,
      membershipDate: String
    ): [Venue],

    roster(id: String): Roster,
    rosters(
      date: String,
      venue: String,
      employeeType: String
    ): [Roster],

    shift(id: String): Shift,
    shifts(
      date: String,
      clockOnDate: String,
      clockOffDate: String,
      employee: String,
      roster: String,
      shiftConfirmed: Boolean
    ): [Shift],
  },


  type Employee {
    employeeType: String,
    profilePic: String,
    name: String,
    shifts: [Shift],
    dob: String,
    address: String,
    phone: String,
    email: String,
    passwordDigest: String,
    emergencyContactName: String,
    emergencyContactPhone: String,
    securityLicNo: String,
    securityLicStatus: Boolean,
    rsaNo: String,
    rsaLicStatus: Boolean,
    firstAidExp: String
  },

  type Roster {
    date: String,
    venues: [Venue],
    shifts: [Shift],
    employeeType: String
  },

  type Shift {
    date: String,
    clockOnDate: String,
    clockOffDate: String,
    employee: Employee,
    roster: Roster,
    shiftConfirmed: Boolean
  },

  type Venue {
    logo: String,
    name: String,
    address: String,
    phone: String,
    email: String,
    licenseeName: String,
    liquorLicNo: String,
    liquorLicStatus: Boolean,
    masterLicNo: String,
    masterLicExp: String,
    masterLicStatus: Boolean,
    membershipDate: String,
    rosters: [Roster],
  }
`);


const getRoster = (query) => {

  console.log('getRoster()', query);

  return Roster.findOne({ _id: query.id });

}; //getRoster

const getRosters = async (query) => {

  console.log('getRosters()', query);
  const rosters = await Rosters.find( query ).populate( 'venues','shifts' );
  console.log(rosters);
  return rosters;
}; //getRosters




const getVenue = (query) => {

  console.log('getVenue()', query);

  return Venue.findOne({ _id: query.id });

}; //getVenue

const getVenues = async (query) => {

  console.log('getVenues()', query);
  const venues = await Venue.find( query ).populate( 'rosters' );
  console.log(venues);
  return venues;
}; //getVenues



const getShift = (query) => {

  console.log('getShift()', query);

  return Shift.findOne({ _id: query.id });

}; //getShift

const getShifts = async (query) => {

  const shifts = await Shift.find( query ).populate( 'employees','rosters' );

  return shifts;
}; //getShifts


const getEmployee = (query) => {

  console.log('getEmployee()', query);

  return Employee.findOne({ _id: query.id });

}; //getEmployee

const getEmployees = async (query) => {

  console.log('getEmployees()', query);
  const employees = await Employee.find( query ).populate( 'shifts' );
  console.log(employees);
  return employees;

}; //getEmployees





const rootResolver = {
  roster: getRoster,
  rosters: getRosters,
  venue: getVenue,
  venues: getVenues,
  shift: getShift,
  shifts: getShifts,
  employee: getEmployee,
  employees: getEmployees,
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true
}));

// TODO: Use "Apollo" package in the frontend to do GraphQL
// queries from inside React

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT} ...`);
});


app.get('/rosters', (req, res) => {

  Roster.find()
  .then( results => {
    res.json( results ); // send the DB result back to the browser as JSON
  })
  .catch( err => {
    console.log('Query error: ', err );
    res.sendStatus(500); // report error as HTTP 500 to browser
  });

}); // GET /rosters

//searches over all the list of employess, useful for admin
app.get('/employees', checkAuth(), (req, res) => {
  console.log('app.get(employees)');

  try {
    let employees = Employee.find()
    res.status(200).send(employees)
  }
  catch(e){
    res.status(404).send(e)
  }
})

app.get('/rosters/search/:date/:employeeType', checkAuth(),(req, res) => {

// /rosters/search/:id
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

//this post request is for creating and saving new employees that register.
app.post('/employee' , (req,res) =>{
  try{
    console.log('/employee/post', req.body);
    const salt = bcrypt.genSaltSync(8); //loops over 8times
    let passwordDigest = bcrypt.hashSync(req.body.password, salt )
    // const { email, password } = req.body;
    console.log('passwordDigest', passwordDigest);
    let employee = new Employee({...req.body, passwordDigest});
    employee.save();
    res.status( 200 ).send(employee._id)
  }
  catch(e){
    console.log( 'e', e );
    res.status( 404 ).send(e)
  }
})

// Login form on frontend submits to here (using Ajax). Already registered Employees.
//Single session view for employees.
app.post('/login', (req, res) => {
  console.log('posted data:', req.body);
  // res.json( req.body ); // echo back the POSTed formdata

  const { email, password } = req.body;

  Employee.findOne({ email })
  .then((employee) => {

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

  }) // .then()
  .catch((err) => {

    res.status(500).json({ message: 'Server error' });
    return console.log('Error retrieving employee', err);

  }); // catch

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
