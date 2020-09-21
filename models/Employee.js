const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeType: String,
  profilePic: Text,
  name: String,
  shifts: [Shift],
  dob: Date,
  address: String,
  phone: String,
  email: String,
  passwordDigest: Text,
  emergencyContactName: String,
  emergencyContactPhone: String,
  securityLicNo: String,
  securityLicStatus: Boolean,
  rsaNo: String,
  rsaLicStatus: Boolean,
  firstAidExp: Date
});

module.exports = mongoose.model('Employee', employeeSchema);
