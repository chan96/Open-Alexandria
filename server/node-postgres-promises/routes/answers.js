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

  db.none(dbInsert, [questionid, courseid, userid, answerbody])
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

function editAnswer(req, res, next){
  var answerid = req.query.answerid;
  var answerbody = req.body.answerbody;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
  }

  var dbSelect = "select * from answers where ANSWERS_UNIQUE_ID = $1 and ANSWERS_ISACTIVE = true;";
  var dbUpdate = "update answers set (ANSWERS_BODY) = ($1) where ANSWERS_UNIQUE_ID = $2 and ANSWERS_ISACTIVE = true;";

  db.one(dbSelect, [answerid])
    .then(function(){
      db.none(dbUpdate, [answerbody, answerid])
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

    }).catch(function(err){
      res.status(500).json({
        status: "Error unknown",
        error: {name: err.name, message: err.message},
        code: -1 
      });

    });
}

function disableAnswer(req, res, next){
  var answerid = req.query.answerid;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
  }

  var dbUpdate = "update answers set (ANSWERS_ISACTIVE) = (false) where ANSWERS_UNIQUE_ID = $1 and ANSWERS_ISACTIVE = true;";

  db.none(dbUpdate, [answerid])
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

function enableAnswer(req, res, next){
  var answerid = req.query.answerid;
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
    res.status(401).json({
      status: "Error authentication error",
      code: -1
    });
  }

  var dbUpdate = "update answers set (ANSWERS_ISACTIVE) = (true) where ANSWERS_UNIQUE_ID = $1 and ANSWERS_ISACTIVE = false;";

  db.none(dbUpdate, [answerid])
    .then(function(){
      res.status(200).json({
        status: "Succesful enabled question",
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


function getAnswersToQuestion(req, res, next){
  var questionid = req.query.questionid;

  var dbSelect = "select * from answers where ANSWERS_QUESTIONS_ID = $1 and ANSWERS_ISACTIVE = true;";

  db.any(dbSelect, [questionid])
    .then(function(data){
      var commonString = [];
      for(var i = 0; i < data.length; i++){
        var answersInfo = {
          answersuniqueid: data[i].ANSWERS_UNIQUE_ID,
          answersquestionsid: data[i].ANSWERS_QUESTIONS_ID,
          answerscoursesid: data[i].ANSWERS_COURSES_ID ,
          answersusersid: data[i].ANSWERS_USERS_ID,
          answersbody: data[i].ANSWERS_BODY,
          answersupdated: data[i].ANSWERS_DATEUPDATED,
          answerslike: data[i].ANSWERS_NUMLIKE,
          answersdislike: data[i].ANSWERS_NUMDISLIKE
        }
        commonString.push({value:data[i], data:answersInfo});
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
  addAnswerToQuestion: addAnswerToQuestion,
  editAnswer: editAnswer,
  disableAnswer: disableAnswer,
  enableAnswer: enableAnswer,
  getAnswersToQuestion: getAnswersToQuestion
};
