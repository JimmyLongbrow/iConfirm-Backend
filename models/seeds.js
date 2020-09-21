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
  console.log(`Created ${ shifts.length } Rosters.`);
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
      }
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
      //   rosterId: '002',
      //   date: '2020-10-01T12:30:00',
      //   venueId: 2,
      //   employeeType: 'Security'
      // },
      // {
      //   rosterId: '003',
      //   date: '2020-10-01T16:20:00',
      //   venueId: 3,
      //   employeeType: 'Security'
      // },
      // {
      //   rosterId: '004',
      //   date: '2020-10-08T11:21:00',
      //   venueId: 1,
      //   employeeType: 'Security'
      // },
      // {
      //   rosterId: '005',
      //   date: '2020-10-08T09:45:00',
      //   venueId: 2,
      //   employeeType: 'Security'
      // },
      // {
      //   rosterId: '006',
      //   date: '2020-10-08T10:38:00',
      //   venueId: 3,
      //   employeeType: 'Security'
      // },
      // {
      //   rosterId: '007',
      //   date: '2020-10-08T13:05:00',
      //   venueId: 1,
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
        name: 'Test Employee 1',
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
        name: 'Test Employee 2',
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
      // {
      //   employeeType: 'Security',
      //   profilePic: 'http://placekitten.com/g/200/400',
      //   name: 'Test Employee 3',
      //   shifts: '[Shift]',
      //   dob: '1988-05-11',
      //   address: '11 Fake Street',
      //   phone: '599 1864',
      //   email: 'three@three.com',
      //   passwordDigest: bcrypt.hashSync('chicken', 10)
      //   emergencyContactName: 'Nemo',
      //   emergencyContactPhone: '555 5555',
      //   securityLicNo: '409449999',
      //   securityLicStatus: true,
      //   rsaNo: "10290696",
      //   rsaLicStatus: true,
      //   firstAidExp: '2022-04-13'
      // },
      // {
      //   employeeType: 'Security',
      //   profilePic: 'http://placekitten.com/g/300/200',
      //   name: 'Test Employee 4',
      //   shifts: '[Shift]',
      //   dob: '1990-02-07',
      //   address: '22 Fake Street',
      //   phone: '715 5862',
      //   email: 'four@four.com',
      //   passwordDigest: bcrypt.hashSync('chicken', 10)
      //   emergencyContactName: 'Nemo',
      //   emergencyContactPhone: '555 5555',
      //   securityLicNo: '409220434',
      //   securityLicStatus: true,
      //   rsaNo: "10216172",
      //   rsaLicStatus: true,
      //   firstAidExp: '2021-11-02'
      // },
      // {
      //   employeeType: 'Security',
      //   profilePic: 'http://placekitten.com/g/400/300',
      //   name: 'Test Employee 5',
      //   shifts: '[Shift]',
      //   dob: '1992-10-08',
      //   address: '44 Faker Street',
      //   phone: '585 9934',
      //   email: 'five@five.com',
      //   passwordDigest: bcrypt.hashSync('chicken', 10)
      //   emergencyContactName: 'Nemo',
      //   emergencyContactPhone: '555 5555',
      //   securityLicNo: '009444321',
      //   securityLicStatus: true,
      //   rsaNo: "10290911",
      //   rsaLicStatus: true,
      //   firstAidExp: '2022-03-21'
      // },
      // {
      //   employeeType: 'Security',
      //   profilePic: 'http://placekitten.com/g/300/400',
      //   name: 'Test Employee 6',
      //   shifts: '[Shift]',
      //   dob: '1989-11-03',
      //   address: '56 Fakest Street',
      //   phone: '592 9434',
      //   email: 'six@six.com',
      //   passwordDigest: bcrypt.hashSync('chicken', 10)
      //   emergencyContactName: 'Nemo',
      //   emergencyContactPhone: '885 5125',
      //   securityLicNo: '408967234',
      //   securityLicStatus: true,
      //   rsaNo: "10335472",
      //   rsaLicStatus: true,
      //   firstAidExp: '2021-11-09'
      // },
      // {
      //   employeeType: 'Security',
      //   profilePic: 'http://placekitten.com/g/400/400',
      //   name: 'Test Employee 7',
      //   shifts: '[Shift]',
      //   dob: '1988-09-05',
      //   address: '69 Fake Street',
      //   phone: '558 9572',
      //   email: 'seven@seven.com',
      //   passwordDigest: bcrypt.hashSync('chicken', 10)
      //   emergencyContactName: 'Jamo',
      //   emergencyContactPhone: '555 1359',
      //   securityLicNo: '0028963124',
      //   securityLicStatus: true,
      //   rsaNo: "10269682",
      //   rsaLicStatus: true,
      //   firstAidExp: '2021-01-21'
      // },
      // {
      //   employeeType: 'Security',
      //   profilePic: 'http://placekitten.com/g/400/500',
      //   name: 'Test Employee 8',
      //   shifts: '[Shift]',
      //   dob: '1985-03-31',
      //   address: '15 Faketh Street',
      //   phone: '656 5139',
      //   email: 'eight@eight.com',
      //   passwordDigest: bcrypt.hashSync('chicken', 10)
      //   emergencyContactName: 'Nemo',
      //   emergencyContactPhone: '444 5789',
      //   securityLicNo: '559626734',
      //   securityLicStatus: true,
      //   rsaNo: "98637872",
      //   rsaLicStatus: true,
      //   firstAidExp: '2021-04-07'
      // },
      // {
      //   employeeType: 'Security',
      //   profilePic: 'http://placekitten.com/g/500/400',
      //   name: 'Test Employee 9',
      //   shifts: '[Shift]',
      //   dob: '1982-01-15',
      //   address: '346 Fakerer Street',
      //   phone: '995 6854',
      //   email: 'nine@nine.com',
      //   passwordDigest: bcrypt.hashSync('chicken', 10)
      //   emergencyContactName: 'Jamo',
      //   emergencyContactPhone: '555 5555',
      //   securityLicNo: '409876544',
      //   securityLicStatus: true,
      //   rsaNo: "19898872",
      //   rsaLicStatus: true,
      //   firstAidExp: '2020-10-21'
      // },
      // {
      //   employeeType: 'Security',
      //   profilePic: 'http://placekitten.com/g/500/500',
      //   name: 'Test Employee 10',
      //   shifts: '[Shift]',
      //   dob: '1991-07-18',
      //   address: '987 Faked Street',
      //   phone: '500 1034',
      //   email: 'ten@ten.com',
      //   passwordDigest: bcrypt.hashSync('chicken', 10)
      //   emergencyContactName: 'Nemo',
      //   emergencyContactPhone: '555 5555',
      //   securityLicNo: '667840734',
      //   securityLicStatus: true,
      //   rsaNo: "10840876",
      //   rsaLicStatus: true,
      //   firstAidExp: '2022-02-01'
      // }

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
        rosterId: rosters[0]._id,
        shiftConfirmed: true
      }
    ]);
  } catch( err ){
      console.warn( 'Error creating shifts:', err );
      process.exit(1);
  }
  // // Shorthand access to all the rosters & employees:
  // const [f1, f2, f3] = rosters;
  // const [u1, u2, u3] = employees;
  //
  // // Create shifts in Employee docs
  //
  // const u1Updated = await u1.updateOne({
  //   shifts: [
  //     {row: 1, col: 1, roster: f1._id },
  //     {row: 1, col: 2, roster: f1._id },
  //     {row: 1, col: 1, roster: f2._id },
  //     {row: 1, col: 2, roster: f2._id },
  //     {row: 1, col: 1, roster: f3._id },
  //     {row: 1, col: 2, roster: f3._id },
  //   ]
  // });
  //
  // const u2Updated = await u2.updateOne({
  //   shifts: [
  //     { row: 2, col: 1, roster: f1._id },
  //     { row: 2, col: 2, roster: f1._id },
  //     { row: 2, col: 1, roster: f2._id },
  //     { row: 2, col: 2, roster: f2._id },
  //     { row: 2, col: 1, roster: f3._id },
  //     { row: 2, col: 2, roster: f3._id },
  //   ]
  // });
  //
  // const u3Updated = await u3.updateOne({
  //   shifts: [
  //     { row: 3, col: 1, roster: f1._id },
  //     { row: 3, col: 2, roster: f1._id },
  //     { row: 3, col: 1, roster: f2._id },
  //     { row: 3, col: 2, roster: f2._id },
  //     { row: 3, col: 1, roster: f3._id },
  //     { row: 3, col: 2, roster: f3._id },
  //   ]
  // });
  //
  // // Now, since we're "denormalizing" some of this data,
  // // i.e. duplicating some of the same information across
  // // different collections (here, the Roster doc stores some
  // // shift info: the row, column, & employee, as well
  // // as the Employee doc storing that info), we have to update
  // // each Roster with shift info from the employees.
  // //
  // // This is a lot more work to do during the creation
  // // of these documents (and the editing), but the payoff is
  // // that when we load a Roster, we have all the shift
  // // info we need to draw the all-important seating diagram,
  // // without needing to also query the Employee collection.
  //
  // const f1Updated = await f1.updateOne({ $push: {
  //   shifts: [
  //     { row: 1, col: 1, employee: u1._id },
  //     { row: 1, col: 2, employee: u1._id },
  //     { row: 2, col: 1, employee: u2._id },
  //     { row: 2, col: 2, employee: u2._id },
  //     { row: 3, col: 1, employee: u3._id },
  //     { row: 3, col: 2, employee: u3._id },
  //   ]
  // }});
  //
  // const f2Updated = await f2.updateOne({ $push: {
  //   shifts: [
  //     { row: 1, col: 1, employee: u1._id },
  //     { row: 1, col: 2, employee: u1._id },
  //     { row: 2, col: 1, employee: u2._id },
  //     { row: 2, col: 2, employee: u2._id },
  //     { row: 3, col: 1, employee: u3._id },
  //     { row: 3, col: 2, employee: u3._id },
  //   ]
  // }});
  //
  // const f3Updated = await f3.updateOne({ $push: {
  //   shifts: [
  //     { row: 1, col: 1, employee: u1._id },
  //     { row: 1, col: 2, employee: u1._id },
  //     { row: 2, col: 1, employee: u2._id },
  //     { row: 2, col: 2, employee: u2._id },
  //     { row: 3, col: 1, employee: u3._id },
  //     { row: 3, col: 2, employee: u3._id },
  //   ]
  // }});
  //
  // // We could return the status of all the updates:
  // // return [u1Updated, u2Updated, u3Updated, f1Updated, f2Updated, f3Updated];

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
      // f.shifts.map(r =>({
      //   row: r.row, col: r.col, employee: r.employee.name
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
  .populate('roster', 'employee');
    // path: 'shifts.venue', // Mongoose populates this association
    // model: 'Venue'
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
