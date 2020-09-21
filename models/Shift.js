const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  date: Date,
  clockOnDate: Date,
  clockOffDate: Date,
  employeeId: Number,
  employee: Employee,
  rosterId: Number,
  roster: Roster,
  shiftConfirmed: Boolean
});

module.exports = mongoose.model('Shift', shiftSchema);
