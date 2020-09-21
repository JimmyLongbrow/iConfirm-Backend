const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeType: String,
  profilePic: String,
  name: String,
  shifts:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift'
  },
  dob: Date,
  address: String,
  phone: Number,
  email: String,
  passwordDigest: String,
  emergencyContactName: String,
  emergencyContactPhone: Number,
  securityLicNo: String,
  securityLicStatus: Boolean,
  rsaNo: String,
  rsaLicStatus: Boolean,
  firstAidExp: Date
});

module.exports = mongoose.model('Employee', employeeSchema);
