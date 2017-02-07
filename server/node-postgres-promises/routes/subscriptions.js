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

var userAuth = require("../utils/userAuth");

function subscribeCourse(req, res, next){
  var courseid = req.query.courseid;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
    return;
  }
  var dbInsert = 'insert into SUBSCRIPTIONS (SUBSCRIPTIONS_COURSEID, SUBSCRIPTIONS_USERID) values ($1, $2);';
  var dbUpdate = 'update SUBSCRIPTIONS set SUBSCRIPTIONS_ISACTIVE = true where SUBSCRIPTIONS_COURSEID = $1 and SUBSCRIPTIONS_USERID = $2;';
  var dbSelect = "select * from SUBSCRIPTIONS where SUBSCRIPTIONS_COURSEID = $1 and SUBSCRIPTIONS_USERID = $2 and SUBSCRIPTIONS_ISACTIVE = false;";

  db.one(dbSelect, [courseid, userid])
    .then(function(data){
      db.none(dbUpdate, [courseid, userid])
        .then(function(){
          res.status(200).json({
            status: "Successful subscribed to course",
            code: 1
          });
        }).catch(function(err){
          res.status(500).json({
            status: "Error unknown",
            error: {name: err.name, message: err.message},
            code: -1
          });
        });
    }).catch(function(err){
      db.none(dbInsert, [courseid, userid])
        .then(function(){
          res.status(200).json({
            status: "Successful subscribed to course",
            code: 1
          });
        }).catch(function(err){
          res.status(500).json({
            status: "Error unknown",
            error: {name: err.name, message: err.message},
            code: -1
          });
        });
    });
}

module.exports = {
  subscribeCourse: subscribeCourse,
  unsubscribeCourse: unsubscribeCourse,
};
