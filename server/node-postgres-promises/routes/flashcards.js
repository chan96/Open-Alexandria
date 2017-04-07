//
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

  var userid = userAuth.getUserID(token);
  if(!userid){
res.status(401).json({
      status: "Error unauthorized action",
      code: -1
    });
    return;
  }
  var courseid = req.query.courseid;
  var deckname = req.query.deckname;

  var dbInsert = "insert into FLASHCARDDECKS (FLASHCARDDECKS_COURSES_ID, FLASHCARDDECKS_USERS_ID, FLASHCARDDECKS_NAME) values ($1, $2, $3);";

  db.none(dbInsert, [courseid, userid, deckname])
    .then(function(){
      res.status(200).json({
        status: "Succesful added new flashcard decks",
        code: 1
      });     
    }).catch(function(err){
      res.status(500).json({
        status: "Failure",
        error: {name: err.name, message: err.message},
        code: -1
      });
    });
}

function createCardInDeck(req, res, next){
  var userid = userAuth.getUserID(req.cookies.token);
  if(!userid){
res.status(401).json({
      status: "Error unauthorized action",
      code: -1
    });
    return;
  }

  var deckid = req.query.deckid;
  var deckfront = req.query.front;
  var deckback = req.query.back;

  var dbSelect = "select * from flashcarddecks where flashcarddecks_unique_id = $1 and flashcarddecks_isactive = true;";
  var dbInsert = "insert into FLASHCARDS (flashcards_flashcardsdecks_id, FLASHCARDS_FRONT, FLASHCARDS_BACK) values ($1, $2, $3);";

  db.one(dbSelect, [deckid])
    .then(function(data){
      db.none(dbInsert, [deckid, deckfront, deckback])
        .then(function(){
          res.status(200).json({
            status: "Successful added new flash cards into deck",
            deckid: deckid,
            code: 1
          });
        }).catch(function(err){
          res.status(500).json({
            status: "Failure",
            error: {name: err.name, message: err.message},
            code: -1
          });
        });
    }).catch(function(err){
      res.status(500).json({
        status: "Failure",
        error: {name: err.name, message: err.message},
        code: -1
      });
    });

}

function searchFlashDeckName(req, res, next){
  var keyword = req.query.query;

  var dbSelect = 'select * from flashcarddecks where flashcarddecks_name ~* $1 and flashcarddecks_isactive = true;';

  db.any(dbSelect, [keyword])
    .then(function(data){
      var commonString = [];
      for (var i = 0; i < data.length; i++){
        var flashDeckInfo = {
          flashcarddecks_unique_id: data[i].flashcarddecks_unique_id,
          flashcarddecks_courses_id: data[i].flashcarddecks_courses_id,
          flashcarddecks_users_id: data[i].flashcarddecks_users_id,
          flashcarddecks_name: data[i].flashcarddecks_name,
          flashcarddecks_description: data[i].flashcarddecks_description,
          flashcarddecks_dateupdated: data[i].flashcarddecks_dateupdated
        } 
        commonString.push({value:data[i].flashcarddecks_name, data: flashDeckInfo});
      }
      res.status(200).json({suggections:commonString});
    }).catch(function(err){
      res.status(500).json({
        status: "Failure",
        error: {name: err.name, message: err.message},
        code: -1
      });
    });
}

function searchFlashDeckNameByCourse(req, res, next){
  var keyword = req.query.query;
  var courseid = req.query.courseid;

  var dbSelect = 'select * from flashcarddecks where flashcarddecks_name ~* $1 and flashcarddecks_isactive = true and flashcarddecks_courses_id = $2;';

  db.any(dbSelect, [keyword, courseid])
    .then(function(data){
      var commonString = [];
      for (var i = 0; i < data.length; i++){
        var flashDeckInfo = {
          flashcarddecks_unique_id: data[i].flashcarddecks_unique_id,
          flashcarddecks_courses_id: data[i].flashcarddecks_courses_id,
          flashcarddecks_users_id: data[i].flashcarddecks_users_id,
          flashcarddecks_name: data[i].flashcarddecks_name,
          flashcarddecks_description: data[i].flashcarddecks_description,
          flashcarddecks_dateupdated: data[i].flashcarddecks_dateupdated
        } 
        commonString.push({value:data[i].flashcarddecks_name, data: flashDeckInfo});
      }
      res.status(200).json({suggections:commonString});
    }).catch(function(err){
      res.status(500).json({
        status: "Failure",
        error: {name: err.name, message: err.message},
        code: -1
      });
    });
}


function getFlashCardsForDeck(req, res, next){
  var deckid = req.query.deckid;

  var dbSelect = 'select * from flashcards where flashcards_flashcardsdecks_id = $1 and flashcards_isactive = true;';

  db.any(dbSelect, [deckid])
    .then(function(data){
      var commonString = [];
      for (var i = 0; i < data.length; i++){
        var flashCardInfo = {
          flashcards_unqiue_id: data[i].flashcards_unique_id,
          flashcards_flashcardsdecks_id: data[i].flashcardsdecks_id,
          flashcards_front: data[i].flashcards_front,
          flashcards_back: data[i].flashcards_back,
          flashcards_isactive: data[i].flashcards_isactive,
          flashcards_datecreated: data[i].flashcards_datecreated
        }
        commonString.push({value:data[i].flashcards_front, data:flashCardInfo});
      }
      res.status(200).json({suggections:commonString});
    }).catch(function(err){
      res.status(500).json({
        status: "Failure",
        error: {name: err.name, message: err.message},
        code: -1
      });
    });

}

module.exports = {
  createDeck: createDeck,
  createCardInDeck: createCardInDeck,
  searchFlashDeckName: searchFlashDeckName,
  searchFlashDeckNameByCourse: searchFlashDeckNameByCourse,
  getFlashCardsForDeck: getFlashCardsForDeck,
};
