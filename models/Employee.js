const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeType: String,
  profilePic: String,
  name: String,
  shifts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift'
  }],
  dob: Date,
  address: String,
  phone: String,
  email: String,
  passwordDigest: String,
  emergencyContactName: String,
  emergencyContactPhone: String,
  securityLicNo: String,
  securityLicStatus: Boolean,
  rsaNo: String,
  rsaLicStatus: Boolean,
  firstAidExp: Date
});

employeeSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

employeeSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Employee', employeeSchema);
