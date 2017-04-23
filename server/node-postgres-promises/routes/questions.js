var promise = require('bluebird');
var options = {
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

var userAuth = require('../utils/userAuth');

function getQuestions(req, res, next) {
  var courseID = req.query.courseid;
  var token = req.cookies.token;

  //query to get the questions of a course based on given school name and course.
  //Does not need courseID.
  //select * from courses c inner join universities u on u.universities_unique_id=c.courses_unique_id inner join questions q on q.QUESTIONS_COURSES_ID=c.COURSES_UNIQUE_ID where c.courses_name='COURSE_NAME_HERE' and u.universities_name='SCHOOL_NAME_HERE';

  //gets questions based off of given course ID. Not as safe?
  var dbSelect = "select * from courses c inner join questions q on q.QUESTIONS_COURSES_ID=c.COURSES_UNIQUE_ID where c.COURSES_UNIQUE_ID=$1 and c.COURSES_ISACTIVE = true and q.QUESTIONS_ISACTIVE = true;"

    db.any(dbSelect, [courseID])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var courseInfo = {
          title:        data[i].questions_title,
          datecreated:  data[i].questions_datecreated,
          dateupdated:  data[i].questions_dateupdated,
          questionid:   data[i].questions_unique_id,
          questionisactive: data[i]. questions_isactive
        }
        commonString.push({value:data[i].courses_name,data:courseInfo});
      }
      res.status(200).json({suggestions:commonString});
    })
  .catch(function(err){
    console.log(err);
  });
}

function getAllQuestions(req, res, next){
  var courseID = req.query.courseid;
  var adminid = userAuth.getUserID(req.cookies.token);
  var adminStatus = userAuth.checkUserAdmin(req.cookies.token);

  if(!adminid || !adminStatus){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
    return;
  }
  var dbSelect = "select * from courses c inner join questions q on q.QUESTIONS_COURSES_ID=c.COURSES_UNIQUE_ID where c.COURSES_UNIQUE_ID=$1 and c.COURSES_ISACTIVE = true;";

  db.any(dbSelect, [courseID])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var courseInfo = {
          title:        data[i].questions_title,
          questionid:   data[i].questions_unique_id,
          questionisactive: data[i]. questions_isactive
        }
        commonString.push({value:data[i].courses_name,data:courseInfo});
      }
      res.status(200).json({suggestions:commonString});
    })
  .catch(function(err){
    console.log(err);
  });
}

function getQuestionInfo(req, res, next) {
  var questionID = req.query.questionid
    var token = req.cookies.token;

  var dbSelect = "select * from questions where questions_unique_id=$1;"

    db.any(dbSelect, [questionID])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var courseInfo = {
          title:        data[i].questions_title,
          datecreated:  data[i].questions_datecreated,
          dateupdated:  data[i].questions_dateupdated,
          body:         data[i].questions_body,
          creatorid:    data[i].questions_users_id,
          courseid:     data[i].questions_courses_id,
          numlike:      data[i].questions_numlike,
          numdislike:   data[i].questions_numdislike
        }
        commonString.push({value:data[i].courses_name,data:courseInfo});
      }
      res.status(200).json({question:commonString});
    })
  .catch(function(err){
    console.log(err);
  });
}

function postQuestion(req, res, next) {
  var qTitle = req.body.questiontitle;
  var qBody = req.body.questionbody;
  var qCourseID = req.body.courseid;
  var creatorID = req.body.creatorid;
  var token = req.cookies.token;


  console.log(qTitle + '| ' + qBody + '|' + qCourseID + '|' + creatorID);

  var dbInsert = 'insert into questions(QUESTIONS_TITLE, QUESTIONS_BODY, QUESTIONS_COURSES_ID, QUESTIONS_USERS_ID) values($1, $2, $3, $4);'

    if(userAuth.checkUserAlive(token)){
      db.none(dbInsert, [qTitle, qBody, qCourseID, creatorID])
        .then(function(){
          res.status(200).json({
            status: "Successful question insert",
            code: 1,
            title: qTitle,
            body: qBody,
            courseid: qCourseID,
            creatorid: creatorID
          });
        })
      .catch(function(err){
        res.status(400).json({
          status: "Error cannot insert question",
          code: -1,
          error: {name:err.name, message: err.message}
        });
      });
    } else {
      res.status(401).json({
        status: "Error Authentication Error",
        code: -1
      });
    }
}

function disableQuestion(req, res, next){
  var uniqueid = req.query.uniqueid;
  var token = req.cookies.token;
  var dbUpdate = 'update questions set QUESTIONS_ISACTIVE = $1 where QUESTIONS_UNIQUE_ID = $2;';
  var dbSelect = 'select * from QUESTIONS where QUESTIONS_UNIQUE_ID = $1 and QUESTIONS_ISACTIVE = true;';

  if(userAuth.checkUserAlive(token) && userAuth.checkUserAdmin(token)){
    db.one(dbSelect, [uniqueid])
      .then(function(data){
        db.none(dbUpdate, [false, uniqueid])
          .then(function(){
            res.status(200).json({
              status: "Successful question disabled",
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
        res.status(404).json({
          status: "Error Unique ID not found or already disabled",
          error: {name: err.name, message: err.message},
          code: -1
        });
      });
  }else{
    res.status(401).json({
      status: "Error Authentication Error",
      code: -1
    });

  }
}

function enableQuestion(req, res, next){
  var uniqueid = req.query.uniqueid;
  var token = req.cookies.token;
  var dbUpdate = 'update QUESTIONS set QUESTIONS_ISACTIVE = $1 where QUESTIONS_UNIQUE_ID = $2;';
  var dbSelect = 'select * from QUESTIONS where QUESTIONS_UNIQUE_ID = $1 and QUESTIONS_ISACTIVE = false;';

  if(userAuth.checkUserAlive(token) && userAuth.checkUserAdmin(token)){
    db.one(dbSelect, [uniqueid])
      .then(function(data){
        db.none(dbUpdate, [true, uniqueid])
          .then(function(){
            res.status(200).json({
              status: "Successful course enabled",
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
        res.status(404).json({
          status: "Error Unique ID not found or already enabled",
          error: {name: err.name, message: err.message},
          code: -1
        });
      });
  }else{
    res.status(401).json({
      status: "Error Authentication Error",
      code: -1
    });
  }
}

function likeQuestion(req, res, next){
  var userid = userAuth.getUserID(req.cookies.token);
  var questionid = req.query.questionid;
  if(!userid){
    res.status(401).json({
      status: "Error Authentication Error",
      code: -1
    });
  }

  var dbInsert = 'insert into USERSFEEDBACK (USERSFEEDBACK_USERS_ID, USERSFEEDBACK_TYPE, USERSFEEDBACK_ITEM_ID, USERSFEEDBACK_ISLIKE) values ($1, 2, $2, true);';
  var dbUpdate = 'update USERSFEEDBACK set USERSFEEDBACK_ISLIKE = true where USERSFEEDBACK_USERS_ID = $1 and USERSFEEDBACK_TYPE = 2 and USERSFEEDBACK_ITEM_ID = $2;';
  var dbSelect = 'select from USERSFEEDBACK where USERSFEEDBACK_USERS_ID = $1 and USERSFEEDBACK_TYPE = 2 and USERSFEEDBACK_ITEM_ID = $2;'; 

  db.oneOrNone(dbSelect, [userid, questionid])
    .then(function(data){
      if(data == null){
        db.none(dbInsert, [userid, questionid])
          .then(function(){
            res.status(200).json({
              status: "Successful liked Question",
              code: 1
            });
          }).catch(function(err){
            res.status(500).json({
              status: "Error unknown",
              error: {name: err.name, message: err.message},
              code: -1
            });
          });
      }else {
        db.none(dbUpdate, [userid, questionid])
          .then(function(){
            res.status(200).json({
              status: "Successful liked Question",
              code: 1
            });
          }).catch(function(err){
            res.status(500).json({
              status: "Error unknown",
              error: {name: err.name, message: err.message},
              code: -1
            });
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

function dislikeQuestion(req, res, next){
  var userid = userAuth.getUserID(req.cookies.token);
  var questionid = req.query.questionid;
  if(!userid){
    res.status(401).json({
      status: "Error Authentication Error",
      code: -1
    });
  }

  var dbInsert = 'insert into USERSFEEDBACK (USERSFEEDBACK_USERS_ID, USERSFEEDBACK_TYPE, USERSFEEDBACK_ITEM_ID, USERSFEEDBACK_ISLIKE) values ($1, 2, $2, false);';
  var dbUpdate = 'update USERSFEEDBACK set USERSFEEDBACK_ISLIKE = false where USERSFEEDBACK_USERS_ID = $1 and USERSFEEDBACK_TYPE = 2 and USERSFEEDBACK_ITEM_ID = $2;';
  var dbSelect = 'select from USERSFEEDBACK where USERSFEEDBACK_USERS_ID = $1 and USERSFEEDBACK_TYPE = 2 and USERSFEEDBACK_ITEM_ID = $2;'; 

  db.oneOrNone(dbSelect, [userid, questionid])
    .then(function(data){
      if(data == null){
        db.none(dbInsert, [userid, questionid])
          .then(function(){
            res.status(200).json({
              status: "Successful disliked Question",
              code: 1
            });
          }).catch(function(err){
            res.status(500).json({
              status: "Error unknown",
              error: {name: err.name, message: err.message},
              code: -1
            });
          });
      }else {
        db.none(dbUpdate, [userid, questionid])
          .then(function(){
            res.status(200).json({
              status: "Successful liked Question",
              code: 1
            });
          }).catch(function(err){
            res.status(500).json({
              status: "Error unknown",
              error: {name: err.name, message: err.message},
              code: -1
            });
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

module.exports = {
  getQuestions: getQuestions,
  getAllQuestions: getAllQuestions,
  getQuestionInfo: getQuestionInfo,
  postQuestion: postQuestion,
  enableQuestion: enableQuestion,
  disableQuestion: disableQuestion,
  likeQuestion: likeQuestion,
  dislikeQuestion: dislikeQuestion, 
};
