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
var userAuth = require('../utils/userAuth');

function report(req, res, next){
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Authentication Error",
      code: -1
    });
  }
  var body = req.query.text;
  var type = req.query.type;
  var id = req.query.id;
  var messagetype = req.query.messagetype;

  var dbInsert = "insert into MESSAGE (message_sender_id, message_item_type, message_item_id, message_message_type, message_text) values ($1, $2, $3, $4, $5);";

  db.none(dbInsert, [userid, type, id, messagetype, body])
    .then(function(){
      res.status(200).json({
        status: "Succesfully reported",
        code: 1
      });
    }).catch(function(err){
      res.status(500).json({
        status: "Error",
        error: {name: err.name, message: err.message},
        code: -1 
      })
    });
}

function getUniversity(req, res, next){
  var query = req.query.query;
  
  var dbSelect = 'select * from universities where UNIVERSITIES_NAME~*$1;';
  db.any(dbSelect,[query])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        commonString.push({value: data[i].universities_name, data:data[i]});
      }
      res.status(200).json({suggestions:commonString}); 
    }).catch(function(err){
      res.status(500).json({
        status: "Failure",
        error: {name: err.name, message: err.message},
        code: -1
      });

    })
}

module.exports = {
  report: report,
  getUniversity: getUniversity,
};
