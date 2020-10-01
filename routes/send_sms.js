// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const { smsAuthToken } = require("../utils/index");


const accountSid = procces.env.ACC_SID;
const authToken = smsAuthToken();
const client = require('twilio')(accountSid, authToken);
const { Employee } = require("../models/Employee.js");
const employee = await Employee.findOne({ phone });

client.messages
  .create({
     body: `Do you accept the Shift? Please Reply 'YES' or 'NO'` ,
     //from: '',
     //to: ''
   })
  .then(message => console.log(message.sid));
