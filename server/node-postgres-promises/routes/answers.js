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

function addAnswerToQuestion(req, res, next){
  var questionid = req.query.questionid;
  var courseid = req.query.courseid;
  var answerbody = req.body.answerbody;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
  }

  var dbInsert = "insert into answers (ANSWERS_QUESTIONS_ID, ANSWERS_COURSES_ID, ANSWERS_USERS_ID, ANSWERS_BODY) values ($1, $2, $3, $4);";

  db.none(dbInsert, [questionsid, courseid, userid, answerbody])
    .then(function(data){
      res.status(200).json({
        status: "Succesful question added",
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

function editAnswerToQuestion(req, res, next){
  var questionid = req.query.questionid;
  var answerbody = req.body.answerbody;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
  }

  var dbUpdate = "update answers set (ANSWERS_BODY) = ($1) where ANSWERS_QUESTIONS_ID = $2 and ANSWERS_ISACTIVE = true;";

  db.none(dbUpdate, [answerbody, 50])
    .then(function(){
      res.status(200).json({
        status: "Succesful question updated",
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

function deleteAnswerToQuestion(req, res, next){
  var questionid = req.query.questionid;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
  }

  var dbUpdate = "update answers set (ANSWERS_ISACTIVE) = (false) where ANSWERS_QUESTIONS_ID = $1 and ANSWERS_ISACTIVE = true;";

  db.none(dbUpdate, [questionid])
    .then(function(){
      res.status(200).json({
        status: "Succesful disabled question",
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

function getAnswerByQuestion(req, res, next){
  var questionid = req.query.questionid;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
  }

  var dbSelect = "select * from answers where ANSWERS_QUESTIONS_ID = $1 and ANSWERS_ISACTIVE = true;";

  db.any(dbSelect, [questionid])
    .then(function(data){
      var commonString = []l
      for(int i = 0; i < data.length; i++){
        var answersInfo = {
          answersuniqueid: data[i].ANSWERS_UNIQUE_ID,
          answersquestionsid = data[i].ANSWERS_QUESTIONS_ID,
          answerscoursesid = data[i].ANSWERS_COURSES_ID ,
          answersusersid = data[i].ANSWERS_USERS_ID,
          answersbody = data[i].ANSWERS_BODY,
          answersupdated = data[i].ANSWERS_DATEUPDATED,
          answerslike = data[i].ANSWERS_NUMLIKE,
          answersdislike = data[i].ANSWERS_NUMDISLIKE,
        }
        commonString.push({value:data[i], data:answersIndo});
      }
      res.status(200).json({
        suggestions:commonString  
      });
    }).catch(function(err){
      res.status(500).json({
        status: "Error unknown",
        error: {name: err.name, message: err.message},
        code: -1 
      });
    });

}

module.exports = {
  getRelatedItems: getRelatedItems,
  uploadDocuments: uploadDocuments,
};
