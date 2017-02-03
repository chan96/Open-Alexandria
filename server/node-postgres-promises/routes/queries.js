var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var connectionInfo = {
  host: 'alexdb.us.to',
  port: 5432,
  database: 'openalexandriadb',
  user: 'cs407team4',
  password: 'openalexandria'
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://alexdb.us.to:5432/openalexandriadb';
var db = pgp(connectionInfo);

var mockdata = require('../utils/MOCK_DATA');
var relatedString = require('../utils/relatedString');

function getRelatedItems(req, res, next) {
  var phrase = req.query.query;
  var data = relatedString.findString(mockdata.Hi, phrase);
  res.status(200).json({
    suggestions: data
  }); 
}

function uploadDocuments(req, res, next){
  console.log(req.file);
  res.status(200).json(req.file);
}
module.exports = {
  getRelatedItems: getRelatedItems,
  uploadDocuments: uploadDocuments,
};
