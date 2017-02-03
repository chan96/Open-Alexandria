var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://alexdb.us.to:5432/openalexandriadb';
var db = pgp(connectionString);

var mockdata = require('../utils/MOCK_DATA');
var relatedString = require('../utils/relatedString');
var userAuth = require('../utils/userAuth');

var fs = require('fs');

function getRelatedItems(req, res, next) {
  var phrase = req.query.query;
  var data = relatedString.findString(mockdata.Hi, phrase);
  res.status(200).json({
    suggestions: data
  }); 
}

function loginUser(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var token = req.cookies.token;
  var tokenUserID = userAuth.getUserID(token);
  var ttl = userAuth.getTokenTTL(token); 

  if (userAuth.checkUserAlive(token) && (tokenUserID === username)){
    res.status(200).json({
      status: "Already logged in",
      ttl: ttl
    });
  } else{
    ttl = 60*60*24*7;
    token = userAuth.addUserToMap(username, ttl, false);
    tokenUserID = userAuth.getUserID(token);
    res.cookie('token', token);
    res.status(200).json({
      status: "Successful login",
      ttl: ttl
    });
  }
}

function uploadDocuments(req, res, next){
  console.log(req.file);
  res.status(200).json(req.file);
}
module.exports = {
  getRelatedItems: getRelatedItems,
  loginUser: loginUser,
  uploadDocuments: uploadDocuments,
};
