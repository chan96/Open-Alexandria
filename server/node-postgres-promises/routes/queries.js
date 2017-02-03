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

}

module.exports = {
  getRelatedItems: getRelatedItems,
  loginUser: loginUser,
};
