const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Query {
    authenticatedEmployee: Employee,
    
    employee(email: String): Employee,

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
      membershipDate: String,
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


  type Mutation {
    deleteVenue(
        _id: String
    ): Venue
    
    upsertVenue(
      _id: String,
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
    ): Venue
  },
  
  
  type Mutation {
    deleteEmployee(
        email: String
    ): Employee
    
     upsertEmployee(
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
     ): Employee
  },


  type Mutation {
    deleteRoster(
        _id: String
    ): Roster
    
     upsertRoster(
       date: String,
       venue: String,
       employeeType: String
     ): Roster
  },
  
  
  type Mutation {
    deleteShift(
        _id: String
    ): Shift
    
     upsertShift(
       date: String,
       clockOnDate: String,
       clockOffDate: String,
       employee: String,
       roster: String,
       shiftConfirmed: Boolean
     ): Shift
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
    venue: Venue,
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
    _id: String,
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
