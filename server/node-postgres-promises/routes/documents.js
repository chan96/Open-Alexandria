v0a88a4d1decar promise = require('bluebird');
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

function uploadDocuments(req, res, next){
  var filename = req.query.rename;
  if(filename === undefined){
    filename = req.file.originalname;
  }
  var filepath = req.file.path;
  var filecourseid = req.query.courseid;
  var fileuserid = req.query.userid;
  var filetype = req.query.type;
  var dbInsert = 'insert into documents (DOCUMENTS_NAME, DOCUMENTS_LINK) values ($1, $2);';

  db.none(dbInsert, [filename, filepath])
    .then(function(){

    }).catch(function(err){
    })



  

  console.log(req.file);
  res.status(200).json(req.file);
}
module.exports = {
  uploadDocuments: uploadDocuments,
};
