const mongoose = require('mongoose');
const Venue = require('../models/Venue');
const Roster = require('../models/Roster');
const Shift = require('../models/Shift');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/iconfirm', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {


  await Venue.deleteMany({});
  await Roster.deleteMany({});
  await Shift.deleteMany({});
  await Employee.deleteMany({});

  const venues = await seedVenues();
  const employees = await seedEmployees();
  const rosters = await seedRosters(venues);
  const shifts = await seedShifts(rosters, employees);



  await printReport();

  console.log(`Created ${ rosters.length } Rosters.`);
  console.log(`Created ${ venues.length } Venues.`);
  console.log(`Created ${ shifts.length } Shifts.`);
  console.log(`Created ${ employees.length } Employees.`);
  console.log('Done.');
  process.exit(0);

}); // db.once() initialiser

const seedVenues = async () => {

  try {

    return await Venue.create([
      {
        logo: 'Text',
        name: 'The Island',
        address: '67 Tild Street',
        phone: '555 4204',
        email: 'cheese@high.com',
        // roster: rosters[0]._id,
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
        address: '184 Banks Street',
        phone: '577 4204',
        email: 'kewpie@high.com',
        // roster: rosters[1,5]._id,
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
        name: 'Manly Greenhouse',
        address: '4 Rob Street',
        phone: '555 9632',
        email: 'cheddar@high.com',
        // roster: rosters[2,6]._id,
        licenseeName: 'Jamil',
        liquorLicNo: '65836583',
        liquorLicStatus: true,
        masterLicNo: '754569222',
        masterLicExp: '2023-10-01T10:30:00',
        masterLicStatus: true,
        membershipDate: '2020-07-01T10:30:00'
      },
      {
        logo: 'Text',
        name: 'Nola Smokehouse',
        address: '99 Big Street',
        phone: '555 9632',
        email: 'cheddar@high.com',
        // roster: rosters[3]._id,
        licenseeName: 'Jamil',
        liquorLicNo: '65836583',
        liquorLicStatus: true,
        masterLicNo: '754569222',
        masterLicExp: '2023-10-01T10:30:00',
        masterLicStatus: true,
        membershipDate: '2020-07-01T10:30:00'
      },
      {
        logo: 'Text',
        name: 'Papa Gedes Bar',
        address: '33 Kent Street',
        phone: '555 9632',
        email: 'cheddar@high.com',
        // roster: rosters[4]._id,
        licenseeName: 'Jamil',
        liquorLicNo: '65836583',
        liquorLicStatus: true,
        masterLicNo: '754569222',
        masterLicExp: '2023-10-01T10:30:00',
        masterLicStatus: true,
        membershipDate: '2020-07-01T10:30:00'
      },
    ]);

    // await rosters[0].updateOne({
    //   $push: {
    //     venues: {
    //       // $each: createdRosters.map( s => s._id)
    //       _id: createdRosters[0]._id
    //     }
    //   }
    // }); // update
    //
    // await rosters[1,5].updateOne({
    //   $push: {
    //     venues: {
    //       // $each: createdRosters.map( s => s._id)
    //       _id: createdRosters[1]._id
    //     }
    //   }
    // }); // update
    //
    // await rosters[2,6].updateOne({
    //   $push: {
    //     venues: {
    //       // $each: createdRosters.map( s => s._id)
    //       _id: createdRosters[2]._id
    //     }
    //   }
    // }); // update
    //
    // await rosters[3].updateOne({
    //   $push: {
    //     venues: {
    //       // $each: createdRosters.map( s => s._id)
    //       _id: createdRosters[3]._id
    //     }
    //   }
    // }); // update
    //
    // await rosters[4].updateOne({
    //   $push: {
    //     venues: {
    //       // $each: createdRosters.map( s => s._id)
    //       _id: createdRosters[4]._id
    //     }
    //   }
    // }); // update
    //
    // return createdRosters;

  } catch( err ){
      console.warn( 'Error creating venues:', err );
      process.exit(1);
  }
}; // seedVenues()

const seedEmployees = async () => {

  try {

    return await Employee.create([
      {
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/200/300',
        name: 'Ahmed El Chranni',
        // shift: shifts[0]._id,
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
        firstAidExp: '2021-09-16',
      },
      {
        employeeType: 'Security',
        profilePic: 'http://placekitten.com/g/300/300',
        name: 'Haysam Abdallah',
        // shift: shifts[1]._id,
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
        // shift: shifts[2,3]._id,
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
        name: 'Sam Ayoub',
        // shift: shifts[4]._id,
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
        name: 'Milos Inic',
        // shift: shifts[5]._id,
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
        name: 'Mirko Drca',
        // shift: shifts[4]._id,
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
        name: 'Nemo Petrovic',
        // shift: shifts[4]._id,
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
        name: 'Anthony Di Lorenzo',
        // shift: shifts[4]._id,
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
        name: 'Daniel Harris',
        // shift: shifts[4]._id,
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
        name: 'Michael Kauter',
        // shift: shifts[4]._id,
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

    // await shifts[0].updateOne({
    //   $push: {
    //     employees: {
    //       // $each: createdShifts.map( s => s._id)
    //       _id: createdEmployees[0]._id
    //     }
    //   }
    // }); // update
    //
    // await shifts[1].updateOne({
    //   $push: {
    //     employees: {
    //       // $each: createdShifts.map( s => s._id)
    //       _id: createdEmployees[1]._id
    //     }
    //   }
    // }); // update
    //
    // await shifts[2].updateOne({
    //   $push: {
    //     employees: {
    //       // $each: createdShifts.map( s => s._id)
    //       _id: createdEmployees[2]._id
    //     }
    //   }
    // }); // update
    //
    // await shifts[3].updateOne({
    //   $push: {
    //     employees: {
    //       // $each: createdShifts.map( s => s._id)
    //       _id: createdEmployees[2]._id
    //     }
    //   }
    // }); // update
    //
    // await shifts[4].updateOne({
    //   $push: {
    //     employees: {
    //       // $each: createdShifts.map( s => s._id)
    //       _id: createdEmployees[3]._id
    //     }
    //   }
    // }); // update
    //
    // await shifts[5].updateOne({
    //   $push: {
    //     employees: {
    //       // $each: createdShifts.map( s => s._id)
    //       _id: createdEmployees[4]._id
    //     }
    //   }
    // }); // update
    //
    // return createdEmployees;


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
        employee: employees[1]._id,
        roster: rosters[0]._id,
        shiftConfirmed: false
      },
      {
        date: '2020-10-01T10:30:00',
        clockOnDate: '2020-10-01T18:00:00',
        clockOffDate: '2020-10-02T02:30:00',
        employee: employees[2]._id,
        roster: rosters[1]._id,
        shiftConfirmed: true
      },
      {
        date: '2020-10-08T09:30:00',
        clockOnDate: '2020-10-08T18:00:00',
        clockOffDate: '2020-10-08T01:30:00',
        employee: employees[2]._id,
        roster: rosters[1]._id,
        shiftConfirmed: false
      },
      {
        date: '2020-10-01T10:30:00',
        clockOnDate: '2020-10-01T18:00:00',
        clockOffDate: '2020-10-02T02:30:00',
        employee: employees[3]._id,
        roster: rosters[2]._id,
        shiftConfirmed: true
      },
      {
        date: '2020-10-08T09:30:00',
        clockOnDate: '2020-10-08T18:00:00',
        clockOffDate: '2020-10-08T01:30:00',
        employee: employees[4]._id,
        roster: rosters[3]._id,
        shiftConfirmed: false
      },
    ]); // create

    await rosters[0].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[0]._id
        }
      }
    }); // update

    await employees[0].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[0]._id
        }
      }
    }); // update

    await rosters[0].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[1]._id
        }
      }
    }); // update

    await employees[1].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[1]._id
        }
      }
    }); // update

    await rosters[1].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[2]._id
        }
      }
    }); // update

    await employees[2].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[2]._id
        }
      }
    }); // update

    await rosters[1].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[3]._id
        }
      }
    }); // update

    await employees[2].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[3]._id
        }
      }
    }); // update

    await rosters[2].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[4]._id
        }
      }
    }); // update

    await employees[3].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[4]._id
        }
      }
    }); // update

    await rosters[3].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[5]._id
        }
      }
    }); // update

    await employees[4].updateOne({
      $push: {
        shifts: {
          // $each: createdShifts.map( s => s._id)
          _id: createdShifts[5]._id
        }
      }
    }); // update



    return createdShifts;

  } catch( err ){
      console.warn( 'Error creating shifts:', err );
      process.exit(1);
  }

  console.log('===========Updated----------',createdShifts);

}; // seedShifts()

const seedRosters = async (venues) => {

  try {

    const createdRosters = await Roster.create([
      {
        date: '2020-10-01T10:30:00',
        venue: venues[0]._id,
        // shift: shifts[0]._id,
        employeeType: 'Security'
      },
      {
        date: '2020-10-01T12:30:00',
        venue: venues[1]._id,
        // shift: shifts[2]._id,
        employeeType: 'Security'
      },
      {
        date: '2020-10-01T16:20:00',
        venue: venues[2]._id,
        // shift: shifts[4]._id,
        employeeType: 'Security'
      },
      {
        date: '2020-10-08T11:21:00',
        venue: venues[3]._id,
        // shift: shifts[5]._id,
        employeeType: 'Cleaning'
      },
      {
        date: '2020-10-08T09:45:00',
        venue: venues[4]._id,
        // shift: shifts[0]._id,
        employeeType: 'Cleaning'
      },
      {
        date: '2020-10-08T10:38:00',
        venue: venues[1]._id,
        // shift: shifts[0]._id,
        employeeType: 'Bar'
      },
      {
        date: '2020-10-08T13:05:00',
        venue: venues[2]._id,
        // shift: shifts[0]._id,
        employeeType: 'Bar'
      }
    ]); // end of create Rosters

    await venues[0].updateOne({
      $push: {
        rosters: {
          // $each: createdShifts.map( s => s._id)
          _id: createdRosters[0]._id
        }
      }
    }); // update



    await venues[1].updateOne({
      $push: {
        rosters: {
          // $each: createdShifts.map( s => s._id)
          _id: createdRosters[1]._id
        }
      }
    }); // update



    await venues[2].updateOne({
      $push: {
        rosters: {
          // $each: createdShifts.map( s => s._id)
          _id: createdRosters[2]._id
        }
      }
    }); // update



    await venues[3].updateOne({
      $push: {
        rosters: {
          // $each: createdShifts.map( s => s._id)
          _id: createdRosters[3]._id
        }
      }
    }); // update



    await venues[4].updateOne({
      $push: {
        rosters: {
          // $each: createdShifts.map( s => s._id)
          _id: createdRosters[4]._id
        }
      }
    }); // update

    await venues[1].updateOne({
      $push: {
        rosters: {
          // $each: createdShifts.map( s => s._id)
          _id: createdRosters[5]._id
        }
      }
    }); // update

    await venues[2].updateOne({
      $push: {
        rosters: {
          // $each: createdShifts.map( s => s._id)
          _id: createdRosters[6]._id
        }
      }
    }); // update

    return createdRosters;

  } catch( err ){
    console.warn( 'Error creating rosters:', err );
    process.exit(1);
  }
}; // seedRosters

const printReport = async () => {

  // console colours (see https://stackoverflow.com/a/41407246)
  const yellow = '\x1b[33m',
    green = '\x1b[32m',
    blue = '\x1b[34m',
    reset = '\x1b[0m';

  const venueCheck = await Venue.find()
  .populate('rosters')
  // .populate({
  //   path: 'shifts.employee', // Mongoose populates this association
  //   // model: 'Employee'
  // });
console.log('====VENUES====');
  venueCheck.forEach( v => {
    console.log(
      green, `${v.name}:`, yellow, `${v.address} -> ${v.email}`,
      reset,
      v.rosters.map(r =>({
        date: r.date, employeeType: r.employeeType
      }))
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
      green, `${r._id} Type: ${r.employeeType}:`, yellow, `Venue: ${r.venue.name}`,
      reset,
    );
    console.dir(
      r.shifts.map(s =>({
      "employee.name": s.employee.name, date: s.date, shiftConfirmed: s.shiftConfirmed
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
    // .populate('roster').populate('employee');
    // path: 'shifts.venue', // Mongoose populates this association
    // model: 'Venue'
    // });
    console.log('====SHIFTS====');
    // shiftCheck.forEach(s => {
    console.log( shiftCheck );
      // green, `Employee: ${s.employee.name}`, yellow, `Date: ${s.date}`, green, `Confirmed: ${s.shiftConfirmed}`, yellow, `Roster employee type: ${s.roster.employeeType}`,
      // reset,
      //     s.shifts.map(r => (
      //       { row: r.row, col: r.col, roster: r.roster.rosterNumber }
      //     ))
    // );
    // });

}; // printReport()
