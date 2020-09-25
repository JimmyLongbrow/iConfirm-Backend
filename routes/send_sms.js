// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const { smsAuthToken } = require("../utils/index");


const accountSid = 'AC0ced41845b38038f2d5e36af61b38f62';
const authToken = smsAuthToken();
const client = require('twilio')(accountSid, authToken);
const { Employee } = require("../models/Employee.js");
const employee = await Employee.findOne({ phone });

client.messages
  .create({
     body: `Do you accept the Shift? Please Reply 'YES' or 'NO'` ,
     from: '+15017122661',
     to: '+61414531659'
   })
  .then(message => console.log(message.sid));
