const mongoose = require('mongoose');
const Roster = require('../models/Roster');
const Employee = require('../models/Employee');
const Venue = require('../models/Venue');
const Shift = require('../models/Shift');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/iconfirm', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {

  // empty the collections first
  await Venue.deleteMany({});
  await Employee.deleteMany({});
  await Roster.deleteMany({});
  await Shift.deleteMany({});

  const venues = await seedVenues();
  const rosters = await seedRosters(venues);
  const employees = await seedEmployees();
  const shifts = await seedShifts(employees, rosters);

  // Now that we have created rosters & employees, we can pass them
  // in to our shift function to share the IDs between them.
  // const shifts = await seedShifts(rosters, employees);

  // Now let's query the DB and print out the results, to
  // check that everything worked.

  await printReport();

  console.log(`Created ${ employees.length } Employees.`);
  console.log(`Created ${ rosters.length } Rosters.`);
  console.log(`Created ${ venues.length } Venues.`);
  console.log(`Created ${ shifts.length } Shifts.`);
  console.log('Done.');
  process.exit(0); // Finished!

}); // db.once() initialiser

const seedVenues = async () => {

  try {

    return await Venue.create([
      {
        logo: 'Text',
        name: 'Cheese Club',
        address: '77 High Street',
        phone: '555 4204',
        email: 'cheese@high.com',
        licenseeName: 'Luke',
        liquorLicNo: '7345856',
        liquorLicStatus: true,
        masterLicNo: '758769222',
        masterLicExp: '2024-10-01T10:30:00',
        masterLicStatus: true,
        membershipDate: '2020-10-01T10:30:00'
      },
      {
        logo: 'Text',
        name: 'Darlo Country Club',
        address: '7 Big Street',
        phone: '484 0004',
        email: 'dcc@big.com',
        licenseeName: 'Sam',
        liquorLicNo: '4923492',
        liquorLicStatus: true,
        masterLicNo: '0192309198',
        masterLicExp: '2024-10-11T10:30:00',
        masterLicStatus: true,
        membershipDate: '2022-10-20T10:30:00'
      },
      {
        logo: 'Text',
        name: 'The Island',
        address: '89 Double Bay Street',
        phone: '4444 1234',
        email: 'dbay@dpay.com',
        licenseeName: 'Jimbo',
        liquorLicNo: '3920481',
        liquorLicStatus: true,
        masterLicNo: '1039129398',
        masterLicExp: '2024-12-11T10:30:00',
        masterLicStatus: true,
        membershipDate: '2022-04-20T10:30:00'
      },
      {
        logo: 'Text',
        name: 'Club77',
        address: '99 Kings X Street',
        phone: '1234 1234',
        email: 'kings@x.com',
        licenseeName: 'Dazza',
        liquorLicNo: '422425',
        liquorLicStatus: true,
        masterLicNo: '4324234234',
        masterLicExp: '2022-12-11T10:30:00',
        masterLicStatus: true,
        membershipDate: '2021-04-20T10:30:00'
      },
      {
        logo: 'Text',
        name: 'The Ivy',
        address: '40 Goerge Street',
        phone: '0987 7134',
        email: 'the@ivy.com',
        licenseeName: 'Justin',
        liquorLicNo: '424242',
        liquorLicStatus: true,
        masterLicNo: '12341414',
        masterLicExp: '2032-12-11T10:30:00',
        masterLicStatus: true,
        membershipDate: '2031-04-20T10:30:00'
      },
    ]);
  } catch( err ){
      console.warn( 'Error creating venues:', err );
      process.exit(1);
  }
}; // seedVenues()

const seedRosters = async (venues) => {

  try {

    return await Roster.create([
      {
        date: '2020-10-01T10:30:00',
        venue: venues[0]._id,
        employeeType: 'Security'
      },
      // {
      //   date: '2020-11-01T12:30:00',
      //   venueId: venues[1]._id,
      //   employeeType: 'Cleaning'
      // },
      // {
      //   date: '2020-10-01T16:20:00',
      //   venueId: venues[0]._id,
      //   employeeType: 'Security'
      // },
      // {
      //   date: '2020-10-08T11:21:00',
      //   venueId: venues[0]._id,
      //   employeeType: 'Cleaning'
      // },
      // {
      //   date: '2020-10-08T09:45:00',
      //   venueId: venues[0]._id,
      //   employeeType: 'Bar'
      // },
      // {
      //   date: '2020-10-08T10:38:00',
      //   venueId: venues[0]._id,
      //   employeeType: 'Bar'
      // },
      // {
      //   date: '2020-10-08T13:05:00',
      //   venueId: venues[0]._id,
      //   employeeType: 'Bar'
      // }
    ]);

  } catch( err ){
    console.warn( 'Error creating rosters:', err );
    process.exit(1);
  }

}; // seedRosters

const seedEmployees = async () => {

  try {

    return await Employee.create([
      {
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/200/300',
        name: 'Ahmed El Chranni',
        // shifts: '[Shift]',
        dob: '1992-10-08',
        address: '123 Fake Street',
        phone: '555 1234',
        email: 'one@one.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Nemo',
        emergencyContactPhone: '555 5555',
        securityLicNo: '409440734',
        securityLicStatus: true,
        rsaNo: "10290872",
        rsaLicStatus: true,
        firstAidExp: '2021-09-16'
      },
      {
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/300/300',
        name: 'Haysam Abdallah',
        // shifts: '[Shift]',
        dob: '1991-11-05',
        address: '33 Fake Street',
        phone: '575 1234',
        email: 'two@two.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Jam',
        emergencyContactPhone: '555 5555',
        securityLicNo: '409140838',
        securityLicStatus: true,
        rsaNo: "10990871",
        rsaLicStatus: true,
        firstAidExp: '2021-11-16'
      },
      {
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/200/400',
        name: 'Jamil Samarani',
        // shifts: '[Shift]',
        dob: '1988-05-11',
        address: '11 Fake Street',
        phone: '599 1864',
        email: 'three@three.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Nemo',
        emergencyContactPhone: '555 5555',
        securityLicNo: '409449999',
        securityLicStatus: true,
        rsaNo: "10290696",
        rsaLicStatus: true,
        firstAidExp: '2022-04-13'
      },
      {
        employeeType: 'Bar',
        profilePic: 'http://placekitten.com/g/300/200',
        name: 'Daniel Harris',
        // shifts: '[Shift]',
        dob: '1990-02-07',
        address: '22 Fake Street',
        phone: '715 5862',
        email: 'four@four.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Nemo',
        emergencyContactPhone: '555 5555',
        securityLicNo: '409220434',
        securityLicStatus: true,
        rsaNo: "10216172",
        rsaLicStatus: true,
        firstAidExp: '2021-11-02'
      },
      {
        employeeType: 'Bar',
        profilePic: 'http://placekitten.com/g/400/300',
        name: 'Milos Inic',
        // shifts: '[Shift]',
        dob: '1992-10-08',
        address: '44 Faker Street',
        phone: '585 9934',
        email: 'five@five.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Nemo',
        emergencyContactPhone: '555 5555',
        securityLicNo: '009444321',
        securityLicStatus: true,
        rsaNo: "10290911",
        rsaLicStatus: true,
        firstAidExp: '2022-03-21'
      },
      {
        employeeType: 'Bar',
        profilePic: 'http://placekitten.com/g/300/400',
        name: 'Nemo Petrovic',
        // shifts: '[Shift]',
        dob: '1989-11-03',
        address: '56 Fakest Street',
        phone: '592 9434',
        email: 'six@six.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Jamil',
        emergencyContactPhone: '885 5125',
        securityLicNo: '408967234',
        securityLicStatus: true,
        rsaNo: "10335472",
        rsaLicStatus: true,
        firstAidExp: '2021-11-09'
      },
      {
        employeeType: 'Cleaning',
        profilePic: 'http://placekitten.com/g/400/400',
        name: 'Mirko Drca',
        // shifts: '[Shift]',
        dob: '1988-09-05',
        address: '69 Fake Street',
        phone: '558 9572',
        email: 'seven@seven.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Jamo',
        emergencyContactPhone: '555 1359',
        securityLicNo: '0028963124',
        securityLicStatus: true,
        rsaNo: "10269682",
        rsaLicStatus: true,
        firstAidExp: '2021-01-21'
      },
      {
        employeeType: 'Cleaning',
        profilePic: 'http://placekitten.com/g/400/500',
        name: 'Sam Ayoub',
        // shifts: '[Shift]',
        dob: '1985-03-31',
        address: '15 Faketh Street',
        phone: '656 5139',
        email: 'eight@eight.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Nemo',
        emergencyContactPhone: '444 5789',
        securityLicNo: '559626734',
        securityLicStatus: true,
        rsaNo: "98637872",
        rsaLicStatus: true,
        firstAidExp: '2021-04-07'
      },
      {
        employeeType: 'Cleaning',
        profilePic: 'http://placekitten.com/g/500/400',
        name: 'Dom Tomoniko',
        // shifts: '[Shift]',
        dob: '1982-01-15',
        address: '346 Fakerer Street',
        phone: '995 6854',
        email: 'nine@nine.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Jamo',
        emergencyContactPhone: '555 5555',
        securityLicNo: '409876544',
        securityLicStatus: true,
        rsaNo: "19898872",
        rsaLicStatus: true,
        firstAidExp: '2020-10-21'
      },
      {
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/500/500',
        name: 'Anthony Di Lorenzo',
        // shifts: '[Shift]',
        dob: '1991-07-18',
        address: '987 Faked Street',
        phone: '500 1034',
        email: 'ten@ten.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Nemo',
        emergencyContactPhone: '555 5555',
        securityLicNo: '667840734',
        securityLicStatus: true,
        rsaNo: "10840876",
        rsaLicStatus: true,
        firstAidExp: '2022-02-01'
      }

    ]);

  } catch(err) {
    console.log('Error creating employees:', err);
    process.exit(1);
  }

}; // seedEmployees

const seedShifts = async (rosters, employees) => {

  try {

    return await Shift.create([
      {
        date: '2020-10-01T10:30:00',
        clockOnDate: '2020-10-01T18:00:00',
        clockOffDate: '2020-10-02T02:30:00',
        employeeId: employees[0]._id,
        employee: employees[0].name,
        roster: rosters[0]._id,
        shiftConfirmed: true
      },
      {
        date: '2020-10-02T10:30:00',
        clockOnDate: '2020-10-02T18:00:00',
        clockOffDate: '2020-10-03T02:30:00',
        employeeId: employees[0]._id,
        employee: employees[0].name,
        rosterId: rosters[0].name,
        shiftConfirmed: true
      },
      {
        date: '2020-10-01T10:30:00',
        clockOnDate: '2020-10-01T18:00:00',
        clockOffDate: '2020-10-02T02:30:00',
        employeeId: employees[0]._id,
        employee: employees[0].name,
        rosterId: rosters[0]._id,
        shiftConfirmed: true
      },
      {
        date: '2020-10-02T10:30:00',
        clockOnDate: '2020-10-02T18:00:00',
        clockOffDate: '2020-10-03T02:30:00',
        employeeId: employees[0]._id,
        employee: employees[0].name,
        rosterId: rosters[0]._id,
        shiftConfirmed: true
      },
      {
        date: '2020-10-01T10:30:00',
        clockOnDate: '2020-10-01T18:00:00',
        clockOffDate: '2020-10-02T02:30:00',
        employeeId: employees[0]._id,
        employee: employees[0].name,
        rosterId: rosters[0]._id,
        shiftConfirmed: true
      },
      {
        date: '2020-10-02T10:30:00',
        clockOnDate: '2020-10-02T18:00:00',
        clockOffDate: '2020-10-03T02:30:00',
        employeeId: employees[0]._id,
        employee: employees[0].name,
        rosterId: rosters[0]._id,
        shiftConfirmed: true
      },
    ]);
  } catch( err ){
      console.warn( 'Error creating shifts:', err );
      process.exit(1);
  }
  // // Shorthand access to all the rosters & employees:
  const [r1] = rosters;
  const [e1, e2, e3] = employees;
  //
  // // Create shifts in Employee docs
  //
  const e1Updated = await e1.updateOne({
    shifts: [
      {date: '2020-10-02T10:30:00', clockOnDate: '2020-10-01T18:00:00', roster: r1._id },
      {date: '2020-10-02T10:30:00', clockOnDate: '2020-10-02T18:00:00', roster: r1._id },
      {date: '2020-10-01T10:30:00', clockOnDate: '2020-10-01T18:00:00', roster: r1._id },
    ]
  });

  const e2Updated = await e2.updateOne({
    shifts: [
      {date: '2020-10-02T10:30:00', clockOnDate: '2020-10-02T18:00:00', roster: r1._id },
      {date: '2020-10-01T10:30:00', clockOnDate: '2020-10-01T18:00:00', roster: r1._id },
    ]
  });

  const e3Updated = await e3.updateOne({
    shifts: [
      {date: '2020-10-02T10:30:00', clockOnDate: '2020-10-02T18:00:00', roster: r1._id },
    ]
  });


  const r1Updated = await r1.updateOne({ $push: {
    shifts: [
      {date: '2020-10-02T10:30:00', clockOnDate: '2020-10-01T18:00:00', employee: e1._id },
      {date: '2020-10-02T10:30:00', clockOnDate: '2020-10-02T18:00:00', employee: e1._id },
      {date: '2020-10-01T10:30:00', clockOnDate: '2020-10-01T18:00:00', employee: e1._id },
      {date: '2020-10-02T10:30:00', clockOnDate: '2020-10-02T18:00:00', employee: e2._id },
      {date: '2020-10-01T10:30:00', clockOnDate: '2020-10-01T18:00:00', employee: e2._id },
      {date: '2020-10-02T10:30:00', clockOnDate: '2020-10-02T18:00:00', employee: e3._id },
    ]
  }});


  // We could return the status of all the updates:
  return [e1Updated, e2Updated, e3Updated, r1Updated];
  console.log('===========Updated----------',r1);

}; // seedShifts()


const printReport = async () => {

  // console colours (see https://stackoverflow.com/a/41407246)
  const yellow = '\x1b[33m',
    green = '\x1b[32m',
    blue = '\x1b[34m',
    reset = '\x1b[0m';

  const venueCheck = await Venue.find()
  // .populate({
  //   path: 'shifts.employee', // Mongoose populates this association
  //   // model: 'Employee'
  // });
console.log('====VENUES====');
  venueCheck.forEach( v => {
    console.log(
      green, `${v.name}:`, yellow, `${v.address} -> ${v.email}`,
      reset,
      // e.shifts.map(r =>({
      //   date: r.date, clockOnDate: r.clockOnDate, employee: r.employee.name
      // }))
    );
  });

  const rosterCheck = await Roster.find().populate('venue');
  //   path: 'shifts.employee', // Mongoose populates this association
  //   // model: 'Employee'
  // });
  console.log('====ROSTERS====');
  rosterCheck.forEach( r => {
    console.log(
      green, `Type: ${r.employeeType}:`, yellow, `Venue: ${r.venue.name}`,
      reset,
      // f.shifts.map(r =>({
      //   row: r.row, col: r.col, employee: r.employee.name
      // }))
    );
  });


  const employeeCheck = await Employee.find()
  // .populate({
  //   path: 'shifts.venue', // Mongoose populates this association
  //   // model: 'Venue'
  // });
  console.log('====EMPLOYEES====');
  employeeCheck.forEach(e => {
    console.log(
      green, `Name: ${e.name}`, yellow, `Email: ${e.email}`,
      reset,
  //     u.shifts.map(r => (
  //       { row: r.row, col: r.col, roster: r.roster.rosterNumber }
  //     ))
    );
  });

  const shiftCheck = await Shift.find()
  .populate('employee', 'roster');
    // path: 'shifts.employee', // Mongoose populates this association
    // model: 'Employee'
  // });
  console.log('====SHIFTS====');
  shiftCheck.forEach(s => {
    console.log(
      green, `Employee: ${s.employee}`, yellow, `Date: ${s.date}`, green, `Confirmed: ${s.shiftConfirmed}`,
      reset,
  //     u.shifts.map(r => (
  //       { row: r.row, col: r.col, roster: r.roster.rosterNumber }
  //     ))
    );
  });

}; // printReport()
