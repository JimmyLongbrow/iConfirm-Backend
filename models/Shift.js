const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  date: Date,
  clockOnDate: Date,
  clockOffDate: Date,
  employeeId: Number,
  employee: String,
  rosterId: Number,
  roster: String,
  shiftConfirmed: Boolean
});

module.exports = mongoose.model('Shift', shiftSchema);
