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

function createDeck(req, res, next){
  var courseid = req.query.courseid;
  var userid = req.query.userid;
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

function getRelatedItems(req, res, next) {
  var phrase = req.query.query;
  var data = relatedString.findString(mockdata.Hi, phrase);
  res.status(200).json({
    suggestions: data
  }); 
}

function uploadDocuments(req, res, next){
  console.log(req.file);
  res.status(200).json(req.file);
}
module.exports = {
  getRelatedItems: getRelatedItems,
  uploadDocuments: uploadDocuments,
};
