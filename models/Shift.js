const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  date: Date,
  clockOnDate: Date,
  clockOffDate: Date,
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  roster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roster'
  },
  shiftConfirmed: Boolean
});

module.exports = mongoose.model('Shift', shiftSchema);
