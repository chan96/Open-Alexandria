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

function createDeck(req, res, next){
  var token = req.cookies.token;
  if(token === undefined){
    res.status(401).json({
      status: "Error unauthorized action",
      code: -1
    });
    return;
  };

  var userid = userAuth.getUserID(req.query.userid);
  var courseid = req.query.courseid;
  var deckname = req.query.deckname;

  var dbInsert = "insert into FLASHCARDDECKS (FLASHCARDDECKS_COURSES_ID, FLASHCARDDECKS_USERS_ID, FLASHCARDDECKS_NAME) values ($1, $2, $3);";

  db.none(dbInsert, [courseid, userid, deckname])
    .then(function(){
      res.status(200).json({
        status: "Succesful added new flashcard decks",
        code: 1
      });     
    }).catch(function(){
      res.status(500).json({
        status: "Failure",
        code: -1
      });
    });
}

function createCardInDeck(req, res, next){
var token = req.cookies.token;
  if(token === undefined){
    res.status(401).json({
      status: "Error unauthorized action",
      code: -1
    });
    return;
  };

  var deckid = req.query.courseid;
  var deckfront = req.query.front;
  var deckback = req.query.back;

  var dbInsert = "insert into FLASHCARDS (FLASHCARDS_FLASHCARDSDECKS_ID, FLASHCARDS_FRONT, FLASHCARDS_BACK) values ($1, $2, $3);";

  db.none(dbInsert, [deckid, deckfront, deckback])
    .then(function(){
      res.status(200).json({
        status: "Successful added new flash cards into deck",
        deckid: deckid,
        code: 1
      });
    }).catch(function(){
      res.status(500).json({
        status: "Failure",
        code: -1
      });
    });
}

module.exports = {
  createDeck: createDeck,
  createCardInDeck: createCardInDeck,
};
