const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  logo: String,
  name: String,
  address: String,
  phone: String,
  email: String,
  licenseeName: String,
  liquorLicNo: String,
  liquorLicStatus: Boolean,
  masterLicNo: String,
  masterLicExp: Date,
  masterLicStatus: Boolean,
  membershipDate: Date
});

module.exports = mongoose.model('Venue', venueSchema);
