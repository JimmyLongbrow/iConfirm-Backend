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
        path: "employee",
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

const deleteVenue = async ({ _id }) => {
  console.log(arguments);
  await Venue.deleteOne({ _id });

  return {};
};

const upsertVenue = async (query) =>
  Venue.update({ _id: query._id }, query, { upsert: true });

module.exports = {
  roster: getRoster,
  rosters: getRosters,
  venue: getVenue,
  venues: getVenues,
  shift: getShift,
  shifts: getShifts,
  employee: getEmployee,
  // employees: getEmployees,
  authenticatedEmployee: getAuthenticatedEmployee,
  upsertVenue: upsertVenue,
  deleteVenue: deleteVenue,
};
