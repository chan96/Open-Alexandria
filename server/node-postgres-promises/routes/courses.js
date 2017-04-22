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

var userAuth = require('../utils/userAuth');

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://alexdb.us.to:5432/openalexandriadb';
var db = pgp(connectionInfo);

function addNewCourse(req, res, next) {
  var courseName = req.body.coursename;
  var courseDescription = req.body.coursedescription;
  var courseSchoolID = req.body.courseschoolid;
  var token = req.cookies.token;
  var dbSelect = 'select * from COURSES where COURSES_NAME = $1 and COURSES_ISACTIVE = true;';
  var dbInsert = 'insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION, COURSES_SCHOOL_ID) values ($1, $2, $3);';

  if(userAuth.checkUserAlive(token)){
    db.any(dbSelect, [courseName])
      .then(function(data){
        if(data.length > 0){
          res.status(202).json({
            status: "Duplicate courses already",
            code: 0
          });
        }else if(data.length === 0){
          db.none(dbInsert,[courseName, courseDescription, courseSchoolID])
            .then(function(){
              res.status(200).json({
                status: "Successful added course",
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
  }else{
    res.status(401).json({
      status: "Error Authentication Error",
      code: -1
    });
  }

}

function getCourseKeyword(req, res, next) {
  var keyword = req.query.query;
  var dbSelect = 'select * from COURSES join UNIVERSITIES on COURSES.COURSES_SCHOOL_ID = UNIVERSITIES.UNIVERSITIES_UNIQUE_ID where COURSES_NAME ~* $1 and COURSES_ISACTIVE = true;';
  //var dbSelect = "select * from courses join universities on COURSES_SCHOOL_ID = universities.universities_code where COURSES_NAME ~* $1 and COURSES_ISACTIVE = true;";

  db.any(dbSelect, [keyword])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var courseInfo = {
          coursename: data[i].courses_name,
          coursedescription: data[i].courses_description,
          coursenummember: data[i].courses_nummember,
          courseuniqueid: data[i].courses_unique_id,
          courseschoolname: data[i].universities_name,
          courseschoolwebsite: data[i].universities_site
        }
        commonString.push({value:data[i].courses_name,data:courseInfo});
      }
      res.status(200).json({suggestions:commonString});
    })
  .catch(function(err){
    console.log(err);
  });
}

function getAllCourse(req, res, next) {
  var keyword = req.query.query;
  var token = req.cookies.token;
  var adminid = userAuth.getUserID(req.cookies.token);
  var adminStatus = userAuth.checkUserAdmin(req.cookies.token);

  if(!adminid || !adminStatus){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
    return;
  }

  var dbSelect = "select * from courses join universities on courses_school_id = universities_unique_id;";

  db.any(dbSelect)
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        commonString.push({value:data[i].courses_name,data:data[i]});
      }
      res.status(200).json({suggestions:commonString});
    })
  .catch(function(err){
    console.log(err);
  });

}

function getCourseInfo(req, res, next){
  var uniqueID = req.query.uniqueid;

  var dbSelect = 'select * from courses join universities on courses_school_id = universities_unique_id where COURSES_UNIQUE_ID = $1 and COURSES_ISACTIVE = true;';
  db.one(dbSelect, [uniqueID])
    .then(function(data){
      res.status(200).json({
        status: "Successful retrieved course",
        code: 1,
        courseuniqueid: data.courses_unique_id,
        coursename: data.courses_name,
        coursedescription: data.courses_description,
        coursenummember: data.courses_nummember,
        courseschoolname: data.universities_name,
        courseschoolwebsite: data[i].universities_site
      });
    })
  .catch(function(err){
    res.status(500).json({
      status: "Error unknown",
      error: {name: err.name, message: err.message},
      code: -1
    })
  });
}

function disableCourse(req, res, next){
  var uniqueid = req.query.uniqueid;
  var token = req.cookies.token;
  var dbUpdate = 'update courses set COURSES_ISACTIVE = $1 where COURSES_UNIQUE_ID = $2;';
  var dbSelect = 'select * from courses where COURSES_UNIQUE_ID = $1 and COURSES_ISACTIVE = true;';

  if(userAuth.checkUserAlive(token) && userAuth.checkUserAdmin(token)){
    db.one(dbSelect, [uniqueid])
      .then(function(data){
        db.none(dbUpdate, [false, uniqueid])
          .then(function(){
            res.status(200).json({
              status: "Successful course disabled",
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

function enableCourse(req, res, next){
  var uniqueid = req.query.uniqueid;
  var token = req.cookies.token;
  var dbUpdate = 'update courses set COURSES_ISACTIVE = $1 where COURSES_UNIQUE_ID = $2;';
  var dbSelect = 'select * from courses where COURSES_UNIQUE_ID = $1 and COURSES_ISACTIVE = false;';

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

function editCourseInfo(req, res, next){
  var uniqueid = req.body.uniqueid;
  var coursedescription = req.body.coursedescription;
  var token = req.cookies.token;
  var dbSelect = 'select * from courses where COURSES_UNIQUE_ID = $1 and COURSES_ISACTIVE = true;';
  var dbUpdate = 'update courses set COURSES_DESCRIPTION = $1 where COURSES_UNIQUE_ID = $2;';

  if(userAuth.checkUserAlive(token)){
    db.one(dbSelect, [uniqueid])
      .then(function(data){
        db.none(dbUpdate, [coursedescription, uniqueid])
          .then(function(){
            res.status(200).json({
              status: "Successful courses description changed",
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
          status: "Error Unique ID not found",
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

module.exports = {
  addNewCourse: addNewCourse,
  getCourseInfo: getCourseInfo,
  getCourseKeyword: getCourseKeyword,
  getAllCourse: getAllCourse,
  disableCourse: disableCourse,
  enableCourse: enableCourse,
  editCourseInfo: editCourseInfo,
};
