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


  await Venue.deleteMany({});
  await Employee.deleteMany({});
  await Roster.deleteMany({});
  await Shift.deleteMany({});

  const venues = await seedVenues();
  const employees = await seedEmployees();
  const rosters = await seedRosters(venues);
  const shifts = await seedShifts(rosters, employees);



  await printReport();

  console.log(`Created ${ employees.length } Employees.`);
  console.log(`Created ${ rosters.length } Rosters.`);
  console.log(`Created ${ venues.length } Venues.`);
  console.log(`Created ${ shifts.length } Shifts.`);
  console.log('Done.');
  process.exit(0);

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
        name: 'Kewpie Club',
        address: '184 High Street',
        phone: '577 4204',
        email: 'kewpie@high.com',
        licenseeName: 'Nemz',
        liquorLicNo: '4565856',
        liquorLicStatus: true,
        masterLicNo: '744329222',
        masterLicExp: '2024-10-01T10:30:00',
        masterLicStatus: true,
        membershipDate: '2020-10-01T10:30:00'
      },
      {
        logo: 'Text',
        name: 'Cheddar',
        address: '44 High Street',
        phone: '555 9632',
        email: 'cheddar@high.com',
        licenseeName: 'Jamil',
        liquorLicNo: '65836583',
        liquorLicStatus: true,
        masterLicNo: '754569222',
        masterLicExp: '2023-10-01T10:30:00',
        masterLicStatus: true,
        membershipDate: '2020-07-01T10:30:00'
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
      {
        date: '2020-10-01T12:30:00',
        venue: venues[1]._id,
        employeeType: 'Security'
      },
      {
        date: '2020-10-01T16:20:00',
        venue: venues[2]._id,
        employeeType: 'Security'
      },
      {
        date: '2020-10-08T11:21:00',
        venue: venues[0]._id,
        employeeType: 'Security'
      },
      {
        date: '2020-10-08T09:45:00',
        venue: venues[1]._id,
        employeeType: 'Security'
      },
      {
        date: '2020-10-08T10:38:00',
        venue: venues[2]._id,
        employeeType: 'Security'
      },
      {
        date: '2020-10-08T13:05:00',
        venue: venues[0]._id,
        employeeType: 'Bar'
      }
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
        name: 'Test Employee 3',
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
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/300/200',
        name: 'Test Employee 4',
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
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/400/300',
        name: 'Test Employee 5',
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
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/300/400',
        name: 'Test Employee 6',
        // shifts: '[Shift]',
        dob: '1989-11-03',
        address: '56 Fakest Street',
        phone: '592 9434',
        email: 'six@six.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        emergencyContactName: 'Nemo',
        emergencyContactPhone: '885 5125',
        securityLicNo: '408967234',
        securityLicStatus: true,
        rsaNo: "10335472",
        rsaLicStatus: true,
        firstAidExp: '2021-11-09'
      },
      {
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/400/400',
        name: 'Test Employee 7',
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
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/400/500',
        name: 'Test Employee 8',
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
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/500/400',
        name: 'Test Employee 9',
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
        name: 'Test Employee 10',
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

    const createdShifts = await Shift.create([
      {
        date: '2020-10-01T10:30:00',
        clockOnDate: '2020-10-01T18:00:00',
        clockOffDate: '2020-10-02T02:30:00',
        employee: employees[0]._id,
        roster: rosters[0]._id,
        shiftConfirmed: true
      },
      {
        date: '2020-10-08T09:30:00',
        clockOnDate: '2020-10-08T18:00:00',
        clockOffDate: '2020-10-08T01:30:00',
        employee: employees[0]._id,
        roster: rosters[0]._id,
        shiftConfirmed: false
      }
    ]); // create

    await rosters[0].updateOne({
      $push: {
        shifts: {
          $each: createdShifts.map( s => s._id)
        }
      }
    }); // update

    return createdShifts;

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

  const rosterCheck = await Roster.find()
  .populate('venue')
  .populate({
    path: 'shifts',
    populate: {
      path: 'employee',
      model: 'Employee'
    }
  })
  //   path: 'shifts.employee', // Mongoose populates this association
  //   // model: 'Employee'
  // });
  console.log('====ROSTERS====');
  rosterCheck.forEach( r => {
    console.log(
      green, `Type: ${r.employeeType}:`, yellow, `Venue: ${r.venue.name}`,
      reset,
    );
    console.dir(
      r.shifts.map(s =>({
      employeeName: s.employee.name, date: s.date, confirmed: s.shiftConfirmed
    }))
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
  //     e.shifts.map(s => (
  //       { date: s.date, venue: s.roster.venue.name, address:s.roster.venue.address }
  //     ))
    );
  });

  const shiftCheck = await Shift.find()
  .populate('roster').populate('employee');
    // path: 'shifts.venue', // Mongoose populates this association
    // model: 'Venue'
  // });
  console.log('====SHIFTS====');
  shiftCheck.forEach(s => {
    console.log(
      green, `Employee: ${s.employee.name}`, yellow, `Date: ${s.date}`, green, `Confirmed: ${s.shiftConfirmed}`, yellow, `Roster employee type: ${s.roster.employeeType}`,
      reset,
  //     s.shifts.map(r => (
  //       { row: r.row, col: r.col, roster: r.roster.rosterNumber }
  //     ))
    );
  });

}; // printReport()
