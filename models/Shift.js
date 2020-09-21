const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  date: Date,
  clockOnDate: Date,
  clockOffDate: Date,
  employeeId: Integer,
  employee: Employee,
  rosterId: Integer,
  roster: Roster,
  shiftConfirmed: Boolean
});

module.exports = mongoose.model('Shift', shiftSchema);
