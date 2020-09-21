// DB init

const { MongoClient, ObjectId } = require('mongodb');
let db;

MongoClient.connect('mongodb://127.0.0.1:27017', {userNewUrlParser:true, useUnifiedTopology:true}, (err, client) => {

  if(err) return console.log( err );

  db = client.db('iconfirm') // success!
  console.log('Connected, using db: iconfirm');

}); // connect()

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const jwtAunthenticate = require('express-jwt');

const checkAuth = () => {
  return jwtAunthenticate({
    secret: SERVER_SECRET_KEY,
    algorithms: ['HS256']
  });
};

console.log(process.env.SERVER_SECRET_KEY);
