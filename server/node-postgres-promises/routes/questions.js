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
  var dbSelect = " select * from courses c inner join questions q on q.QUESTIONS_COURSES_ID=c.COURSES_UNIQUE_ID where c.COURSES_UNIQUE_ID=$1;"

  db.any(dbSelect, [keyword])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var courseInfo = {
          title:        data[i].questions_title,
          datecreated:  data[i].questions_datecreated,
          dateupdated:  data[i].questions_dateupdated
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

  db.any(dbSelect, [keyword])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var courseInfo = {
          title:        data[i].questions_title,
          datecreated:  data[i].questions_datecreated,
          dateupdated:  data[i].questions_dateupdated,
          body:         data[i].questions_body,
          creatorid:    data[i].questions_users_id,
          courseid:     data[i].questions_courses_id
        }
        commonString.push({value:data[i].courses_name,data:courseInfo});
      }
      res.status(200).json({suggestions:commonString});
    })
  .catch(function(err){
    console.log(err);
  });
}

function postQuestion(req, res, next) {
  var qTitle = req.query.questiontitle;
  var qBody = req.query.questionbody;
  var qCourseID = req.query.courseid;
  var creatorID = req.query.creatorid;
  var token = req.cookies.token;

  var dbInsert = 'insert into questions(QUESTIONS_TITLE, QUESTIONS_BODY, QUESTIONS_COURSES_ID, QUESTIONS_USERS_ID) values($1, $2, $3, $4);'

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
}

module.exports = {
  getQuestions: getQuestions,
  getQuestionInfo: getQuestionInfo,
  postQuestion: postQuestion
};
