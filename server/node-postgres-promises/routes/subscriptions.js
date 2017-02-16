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

function subscribeUserToCourse(req, res, next){
  var courseid = req.query.courseid;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
    return;
  }

  var dbInsert = 'insert into SUBSCRIPTIONS (SUBSCRIPTIONS_COURSES_ID, SUBSCRIPTIONS_USERS_ID) values ($1, $2);';
  var dbUpdate = 'update SUBSCRIPTIONS set SUBSCRIPTIONS_ISACTIVE = true where SUBSCRIPTIONS_UNIQUE_ID = $1';
  var dbSelect = "select * from SUBSCRIPTIONS where SUBSCRIPTIONS_COURSES_ID = $1 and SUBSCRIPTIONS_USERS_ID = $2;";
  var dbUpdateCourse = 'update courses set COURSES_nummember = COURSES_NUMMEMBER+1 where courses_unique_id = $1';
  db.oneOrNone(dbSelect, [courseid, userid])
    .then(function(data){
      if(data == null){
        db.none(dbInsert, [courseid, userid])
          .then(function(data){
            db.none(dbUpdateCourse, [courseid])
              .then(function(){
                res.status(200).json({
                  status: "Successful course update",
                  code: 1
                });
              });
          }).catch(function(err){
            res.status(500).json({
              status: "Error unknown",
              error: {name: err.name, message: err.message},
              code: -1
            });
          });
      } else if(data.subscriptions_isactive == false){
        db.none(dbUpdate, [data.subscriptions_unique_id])
          .then(function(data){
            db.none(dbUpdateCourse, [courseid])
              .then(function(){
                res.status(200).json({
                  status: "Successful course update",
                  code: 1
                });
              });
          }).catch(function(err){
            res.status(500).json({
              status: "Error unknown",
              error: {name: err.name, message: err.message},
              code: -1
            });
          });
      }else{
        res.status(200).json({
          status: "Already subscribe to course",
          code: 1
        });
      }
    }).catch(function(err){
      res.status(500).json({
        status: "Error unknown",
        error: {name: err.name, message: err.message},
        code: -1
      });
    });
}

function unsubscribeUserToCourse(req,res, next){
  var courseid = req.query.courseid;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
    return;
  }

  var dbUpdate = 'update SUBSCRIPTIONS set SUBSCRIPTIONS_ISACTIVE = false where SUBSCRIPTIONS_UNIQUE_ID = $1';
  var dbSelect = "select * from SUBSCRIPTIONS where SUBSCRIPTIONS_COURSES_ID = $1 and SUBSCRIPTIONS_USERS_ID = $2;";
  var dbUpdateCourse = 'update courses set COURSES_nummember = COURSES_NUMMEMBER-1 where courses_unique_id = $1';

  db.oneOrNone(dbSelect, [courseid, userid])
    .then(function(data){
      if(data.subscriptions_isactive == true){
        db.none(dbUpdate, [data.subscriptions_unique_id])
          .then(function(data){
            db.none(dbUpdateCourse, [courseid])
              .then(function(){
                res.status(200).json({
                  status: "Successful course unsubscription",
                  code: 1
                });
              });
          }).catch(function(err){
            res.status(500).json({
              status: "Error unknown",
              error: {name: err.name, message: err.message},
              code: -1
            });
          });
      }else{
        res.status(200).json({
          status: "Course subscription does not exist",
          code: 1
        });
      }
    }).catch(function(err){
      res.status(500).json({
        status: "Error unknown",
        error: {name: err.name, message: err.message},
        code: -1
      });
    });
}


function subscriptionsByUser(req, res, next){
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
    return;
  }
  //select subscriptions.subscriptions_courses_id, subscriptions.subscriptions_unique_id, courses.courses_name from subscriptions inner join courses  on courses.courses_unique_id = subscriptions.subscriptions_courses_id and subscriptions.subscriptions_users_id = 2;
  var dbSelect = `SELECT subscriptions.subscriptions_courses_id, 
  subscriptions.subscriptions_unique_id, 
  courses.courses_name, 
  universities.universities_name 
    FROM   subscriptions 
    INNER JOIN courses 
    ON courses.courses_unique_id = 
    subscriptions.subscriptions_courses_id 
    AND subscriptions.subscriptions_users_id = $1
    INNER JOIN universities 
    ON universities.universities_unique_id = 
    courses.courses_school_id;`;

  db.any(dbSelect, [userid])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var subscriptionInfo = {
          courseid: data[i].subscriptions_courses_id,
          subscriptionid: data[i].subscriptions_unique_id,
          coursename: data[i].courses_name,
          universityname: data[i].universities_name
        }
        commonString.push({value:subscriptionInfo.coursename, data:subscriptionInfo});
      }
      res.status(200).json({suggestions:commonString});
    }).catch(function(err){
      res.status(500).json({
        status: "Error unknown",
        error: {name: err.name, message: err.message},
        code: -1
      });

    });
}

function subscriptionsByCourse(req, res, next){
  var courseid = req.query.courseid;

  var dbSelect = `SELECT subscriptions.subscriptions_courses_id, 
  subscriptions.subscriptions_unique_id, 
  courses.courses_name, 
  universities.universities_name, 
  users.users_email, 
  users.users_unique_id 
    FROM   subscriptions 
    INNER JOIN courses 
    ON courses.courses_unique_id = 
    subscriptions.subscriptions_courses_id 
    AND courses.courses_unique_id = 1 
    INNER JOIN universities 
    ON universities.universities_unique_id = 
    courses.courses_school_id 
    INNER JOIN users 
    ON users.users_unique_id = subscriptions.subscriptions_users_id;`;

  db.any(dbSelect, [courseid])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var subscriptionInfo = {
          courseid: data[i].subscriptions_courses_id,
          subscriptionid: data[i].subscriptions_unique_id,
          coursename: data[i].courses_name,
          universityname: data[i].universities_name,
          email: data[i].users_email,
          userid: data[i].users_unique_id
        }
        commonString.push({value:subscriptionInfo.users_email, data:subscriptionInfo});
      }
      res.status(200).json({suggestions:commonString});
    }).catch(function(err){
      res.status(500).json({
        status: "Error unknown",
        error: {name: err.name, message: err.message},
        code: -1
      });
    });
}

module.exports = {
  subscribeUserToCourse: subscribeUserToCourse,
  unsubscribeUserToCourse: unsubscribeUserToCourse,
  subscriptionsByUser: subscriptionsByUser,
  subscriptionsByCourse: subscriptionsByCourse,
};
