const mongoose = require('mongoose');

const rosterSchema = new mongoose.Schema({
  date: Date,
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue'
  },
  shifts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift'
  }],
  employeeType: String
});

module.exports = mongoose.model('Roster', rosterSchema);
