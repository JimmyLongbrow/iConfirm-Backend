const mongoose = require('mongoose');

const rosterSchema = new mongoose.Schema({
  date: Datetime,
  venueId: Integer,
  venue: Venue,
  shifts: [Shift],
  employeeType: String
});

module.exports = mongoose.model('Roster', rosterSchema);
