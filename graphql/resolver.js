const { Employee, Roster, Shift, Venue } = require("../models");

const getRoster = async ({ id }) =>
  Roster.findOne({ _id: id }).populate("shifts").populate("venue");

const getRosters = async (query) =>
  Roster.find(query).populate("venue").populate("shifts");

const getVenue = async ({ id }) => Venue.findOne({ _id: id });

const getVenues = async (query) => {
  const venues = await Venue.find(query).populate({
    path: "rosters",
    populate: {
      path: "shifts",
      populate: {
        path: "employees",
      },
    },
  });

  return venues;
};

const getShift = async ({ id }) => Shift.findOne({ _id: id });

const getShifts = async (query) =>
  Shift.find(query).populate("employees").populate("rosters");

const getEmployee = async (query) => Employee.findOne(query);

const getEmployees = async (query) => Employee.find(query).populate("shifts"); //getEmployees

const getAuthenticatedEmployee = async (query, req) => {
  Employee.findOne({ _id: req.user._id }).populate({
    path: "shifts",
    populate: {
      path: "roster",
      populate: {
        path: "venue",
      },
    },
  });
};

const deleteRoster = async ({ _id }) => {
  console.log(arguments);
  await Roster.deleteOne({ _id });

  return {};
};

const upsertRoster = async (query) =>
  Roster.update({ _id: query._id }, query, { upsert: true });

///////////////////////////////////////////////////////////////
const deleteShift = async ({ _id }) => {
  console.log(arguments);
  await Shift.deleteOne({ _id });

  return {};
};

const upsertShift = async (query) =>
  Shift.update({ _id: query._id }, query, { upsert: true });
////////////////////////////////////////////////////////////////

const deleteEmployee = async ({ _id }) => {
  console.log(arguments);
  await Employee.deleteOne({ _id });

  return {};
};

const upsertEmployee = async (query) =>
  Employee.update({ _id: query._id }, query, { upsert: true });

///////////////////////////////////////////////////////////////////
const deleteVenue = async ({ _id }) => {
  console.log(arguments);
  await Venue.deleteOne({ _id });

  return {};
};

const upsertVenue = async (query) =>{
  console.log("Upsert Venue:", query);
// const result = await Venue.updateOne({ _id: query._id }, query, { upsert: true });
const result = await Venue.create(query);
console.log("Result:", result);
return result
};
////////////////////////////////////////////////////////////////////

module.exports = {
  roster: getRoster,
  rosters: getRosters,
  venue: getVenue,
  venues: getVenues,
  shift: getShift,
  shifts: getShifts,
  employee: getEmployee,
  employees: getEmployees,
  authenticatedEmployee: getAuthenticatedEmployee,
  upsertVenue: upsertVenue,
  deleteVenue: deleteVenue,
  upsertEmployee: upsertEmployee,
  deleteEmployee: deleteEmployee,
  upsertRoster: upsertRoster,
  deleteRoster: deleteRoster,
  upsertShift: upsertShift,
  deleteShift: deleteShift,
};
