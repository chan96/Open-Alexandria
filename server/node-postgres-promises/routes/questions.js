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

//TODO
function getQuestions(req, res, next) {
  var courseName = req.query.courseid;
  var school = req.query.school;
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
          title: data[i].questions_title,
          datecreated: data[i].questions_datecreated,
          dateupdated: data[i].questions_dateupdated
        }
        commonString.push({value:data[i].courses_name,data:courseInfo});
      }
      res.status(200).json({suggestions:commonString});
    })
  .catch(function(err){
    console.log(err);
  });
}
