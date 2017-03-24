//
const exec = require('child_process').exec;
var promise = require('bluebird');
var path = require('path');
var mime = require('mime-types');
var options = {
  // Initialization Options
  promiseLib: promise
};
var fileOptions = {
  width: 1920,
  height: 1080
};

var connectionInfo = {
  host: 'alexdb.us.to',
  port: 5432,
  database: 'openalexandriadb',
  user: 'cs407team4',
  password: 'openalexandria'
};

var projectPath = path.normalize(path.join(__dirname, '../documents/'));

var filepreview = require('filepreview');
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://alexdb.us.to:5432/openalexandriadb';
var db = pgp(connectionInfo);

var userAuth = require("../utils/userAuth");

function uploadDocuments(req, res, next){
  var token = req.cookies.token;
  if(token === undefined){
    res.status(401).json({
      status: "Error unauthorized action",
      code: -1
    });
   return;
  };
  var filename = req.query.rename;
  console.log(req.file);
  if(filename === undefined){
    filename = req.file.originalname;
  }
  var destFileName = req.file.filename;

  console.log("File Path:" + req.file.path);
  var filecourseid = req.query.courseid;
  var fileuserid = userAuth.getUserID(token);
  var filetype = req.query.type;
  var filedescription =req.query.description;
  if(filedescription === undefined){
    filedescription = "document";
  }

  if(filetype === undefined){
    filetype = mime.extension(req.file.mimetype);
  }

  var filepath = "/documents/" + destFileName;

  var dbInsert = 'insert into documents (DOCUMENTS_NAME, DOCUMENTS_LINK, DOCUMENTS_COURSES_ID, DOCUMENTS_USERS_ID, DOCUMENTS_TYPE, DOCUMENTS_DESCRIPTION, DOCUMENTS_PREVIEW) values ($1, $2, $3, $4, $5, $6, $7);';
  var previewPath = path.join(projectPath, "/" + req.file.filename + ".jpg");

  if(!filepreview.generateSync(req.file.path, previewPath)){
    console.log("error");
  } else {
    console.log("previewPath: " + previewPath);
  }

  db.none(dbInsert, [filename, filepath, filecourseid, fileuserid, filetype, filedescription, previewPath])
    .then(function(){
      res.status(200).json({
        status: "Successful file upload",
        filename: filename,
        destFileName: destFileName,
        code: 1
      });
    }).catch(function(error){
      exec('rm -rf ' + filepath + " " + previewPath, function(err, stdout, stderr){
        res.status(500).json({
          status: "Error unknown",
          error: {name: error.name, message: error.message},
          err: err,
          code: -1
        });
      });
    })
}

function searchDocument(req, res, next){
  var filename = req.query.query;

  var dbSelect = 'select * from documents where DOCUMENTS_NAME ~* $1 and DOCUMENTS_ISACTIVE = true;';

  db.any(dbSelect, [filename])
    .then(function(data){
      var commonString = [];
      for (var i = 0; i < data.length; i++){
        var documentInfo = {
          documentuniqueid: data[i].documents_unique_id,
          documentname: data[i].documents_name,
          documentlink: "https://openalex.com" + data[i].documents_link,
          documentcourse: data[i].documents_courses_id,
          documentuser: data[i].documents_users_id,
          documentdescription: data[i].documents_description,
          documenttype: data[i].documents_type,
          documentlike: data[i].documents_numlike,
          documentdislike: data[i].documents_numdislike,
          documentdatecreated: data[i].documents_datecreated
        }
        commonString.push({value:data[i].documents_name,data:documentInfo});
      }
      res.status(200).json({suggestions:commonString});
    }).catch(function(err){
      res.status(500).json({
        status: "Error unknown",
        error: {name:err.name, message: err.message},
        code: -1
      });

    });
}

function searchDocumentByCourse(req,res,next){
  var query = req.query.query;
  var course = req.query.courseid;
  var dbSelect = 'select * from documents where DOCUMENTS_NAME ~* $1 and DOCUMENTS_COURSES_ID = $2 and DOCUMENTS_ISACTIVE = true;';

  db.any(dbSelect,[query,course])
    .then(function(data){
      var commonString = [];
      for (var i = 0; i < data.length; i++){
        var documentInfo = {
          documentuniqueid: data[i].documents_unique_id,
          documentname: data[i].documents_name,
          documentlink: "https://openalex.com" + data[i].documents_link,
          documentcourse: data[i].documents_courses_id,
          documentuser: data[i].documents_users_id,
          documentdescription: data[i].documents_description,
          documenttype: data[i].documents_type,
          documentlike: data[i].documents_numlike,
          documentdislike: data[i].documents_numdislike,
          documentdatecreated: data[i].documents_datecreated
        }
        commonString.push({value:data[i].documents_name, data: documentInfo});
      } 
      res.status(200).json({suggestions:commonString});
    }).catch(function(err){
      res.status(500).json({
        status: "Error unknown",
        error: {name:err.name, message: err.message},
        code: -1
      });

    });
}

function searchDocumentByUser(req,res,next){
  var query = req.query.query;
  var user = req.query.userid;
  var dbSelect = 'select * from documents where DOCUMENTS_NAME ~* $1 and DOCUMENTS_USERS_ID = $2 and DOCUMENTS_ISACTIVE = true;';

  db.any(dbSelect,[query,user])
    .then(function(data){
      var commonString = [];
      for (var i = 0; i < data.length; i++){
        var documentInfo = {
          documentuniqueid: data[i].documents_unique_id,
          documentname: data[i].documents_name,
          documentlink: "https://openalex.com" + data[i].documents_link,
          documentcourse: data[i].documents_courses_id,
          documentuser: data[i].documents_users_id,
          documentdescription: data[i].documents_description,
          documenttype: data[i].documents_type,
          documentlike: data[i].documents_numlike,
          documentdislike: data[i].documents_numdislike,
          documentdatecreated: data[i].documents_datecreated,
          documentisactive: data[i].documents_isactive
        }
        commonString.push({value:data[i].documents_name, data: documentInfo});
      } 
      res.status(200).json({suggestions:commonString});
    }).catch(function(err){
      res.status(500).json({
        status: "Error unknown",
        error: {name:err.name, message: err.message},
        code: -1
      });
    });
}

function getDocument(req, res, next){
  var documentuniqueid = req.query.documentuniqueid;
  var dbSelect = 'select * from documents where DOCUMENTS_UNIQUE_ID = $1 and DOCUMENTS_ISACTIVE = true;';
  db.one(dbSelect, [documentuniqueid])
    .then(function(data){
      res.status(200).json({
        documentuniqueid: data.documents_unique_id,
        documentname: data.documents_name,
        documentlink: "https://" + req.get('host') + data.documents_link,
        documentcourse: data.documents_courses_id,
        documentuser: data.documents_users_id,
        documentdescription: data.documents_description,
        documenttype: data.documents_type,
        documentlike: data.documents_numlike,
        documentdislike: data.documents_numdislike,
        documentdatecreated: data[i].documents_datecreated
      });
    }).catch(function(err){
      res.status(500).json({
        status: "Error file not found",
        error: {name: err.name, message: err.message},
        code: -1
      });
    });
}

function disableDocument(req, res, next){
  var uniqueid = req.query.uniqueid;
  var token = req.cookies.token;
  var dbUpdate = 'update DOCUMENTS set DOCUMENTS_ISACTIVE = $1 where DOCUMENTS_UNIQUE_ID = $2;';
  var dbSelect = 'select * from DOCUMENTS where DOCUMENTS_UNIQUE_ID = $1 and DOCUMENTS_ISACTIVE = true;';

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

function enableDocument(req, res, next){
  var uniqueid = req.query.uniqueid;
  var token = req.cookies.token;
  var dbUpdate = 'update DOCUMENTS set DOCUMENTS_ISACTIVE = $1 where DOCUMENTS_UNIQUE_ID = $2;';
  var dbSelect = 'select * from DOCUMENTS where DOCUMENTS_UNIQUE_ID = $1 and DOCUMENTS_ISACTIVE = false;';

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


module.exports = {
  uploadDocuments: uploadDocuments,
  searchDocument: searchDocument,
  searchDocumentByCourse: searchDocumentByCourse,
  searchDocumentByUser:searchDocumentByUser, 
  getDocument: getDocument,
  disableDocument: disableDocument,
  enableDocument: enableDocument,
};
