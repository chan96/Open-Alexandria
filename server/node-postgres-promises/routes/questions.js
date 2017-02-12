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

  var dbSelect = " select * from courses c inner join questions q on q.QUESTIONS_COURSES_ID=c.COURSES_UNIQUE_ID where c.COURSES_UNIQUE_ID=$1;"
    //"select * from courses c, school s inner join s on s.school_id=courses_school_id where COURSES_NAME = $1 and COURSES_ISACTIVE = true;";

  db.any(dbSelect, [keyword])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var courseInfo = {
          coursename: data[i].courses_name,
          coursedescription: data[i].courses_description,
          coursenummember: data[i].courses_nummember,
          courseuniqueid: data[i].courses_unique_id
        }
        commonString.push({value:data[i].courses_name,data:courseInfo});
      }
      res.status(200).json({suggestions:commonString});
    })
  .catch(function(err){
    console.log(err);
  });
}
