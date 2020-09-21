const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  date: Date,
  clockOnDate: Date,
  clockOffDate: Date,
  employeeId: String,
  employee: String,
  rosterId: String,
  roster: String,
  shiftConfirmed: Boolean
});

module.exports = mongoose.model('Shift', shiftSchema);
