const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  logo: Text,
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
  membershipDate: Datetime
});

module.exports = mongoose.model('Venue', venueSchema);
