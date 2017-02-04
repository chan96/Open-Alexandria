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

function loginUser(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var token = req.cookies.token;
  var tokenUserID = userAuth.getUserID(token);
  var ttl = userAuth.getTokenTTL(token); 
  db.one('select * from users where USERS_EMAIL = $1 and USERS_PASSWORD = $2 and USERS_ISACTIVE = true;', [username, password])
    .then(function(data){
      if (userAuth.checkUserAlive(token) && (tokenUserID === username)){
        res.status(200).json({
          status: "Already logged in",
          code: 1,
          ttl: ttl
        });
      } else{
        var adminStatus = data.users_isadmin;
        ttl = 60*60*24*7;
        token = userAuth.addUserToMap(data.users_unique_id, ttl, adminStatus);
        tokenUserID = userAuth.getUserID(token);
        res.cookie('token', token);
        res.status(200).json({
          status: "Successful login",
          code: 1,
          ttl: ttl
        });
      }
      console.log(data);
    }).catch(function(error){
      res.status(401).json({
        status: "Authentication has failed. Incorrect username or password.",
        code: -1
      });
    });
}

function logoutUser(req, res, next) {
  var token = req.cookies.token;
  userAuth.removeUser(token);
  res.status(200).json({
    status: "Successful logout",
    code: 1
  });
}


function createNewUser(req, res, next){
  var username = req.body.email;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var isactive = true;
  var dbSearch = 'select * from users where USERS_EMAIL = $1 and USERS_ISACTIVE = true;';
  var dbQuery = 'insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD) values ($1, $2, $3, $4, $5);';

  db.none(dbSearch, [username])
    .then(function(){
      db.none(dbQuery, [firstname, lastname, isactive, username, password])
        .then(function(){
          res.status(200).json({
            status: "Successful creation",
            code: 1
          }); 
        })
      .catch(function(error){
        res.status(500).json({
          status: "Error in creating account. Please try again.",
          error: error,
          code: -1
        });
      });
    })
  .catch(function(err){
    res.status(400).json({
      status: "Email is already being used. Please using another email or try to login",
      error: {name: err.name, message: err.message},
      code: -1
    });
  });
}

function getUserInfo(req, res, next){
  var token = req.cookies.token;
  var userID = userAuth.getUserID(token);
  var dbSearch = 'select * from users where USERS_UNIQUE_ID = $1 and USERS_ISACTIVE = true';

  db.one(dbSearch, [userID])
    .then(function(data){
      res.status(200).json({
        status: "Successful retrieval",
        code: 1,
        firstname: data.users_firstname,
        lastname: data.users_lastname,
        email: data.users_email
      });
    })
    .catch(function(err){
      res.status(400).json({
        status: "Error cannot find user.",
        code: -1
      });
    });
}

function editUserInfo(req, res, next){
  var username = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var password = req.body.password;
  var token = req.cookies.token;
  var userID = userAuth.getUserID(token);
  var dbInsert = 'update users set(USERS_FIRSTNAME, USERS_LASTNAME, USERS_EMAIL, USERS_PASSWORD) = ($1, $2, $3, $4) where USERS_UNIQUE_ID = $5';
  db.none(dbInsert, [firstname, lastname, username, password, userID])
    .then(function(){
      res.status(200).json({
        status: "Successful profile changed",
        code: 1,
        firstname: firstname,
        lastname: lastname,
        email: username,
      });
    })
    .catch(function(err){
      res.status(400).json({
        status: "Error cannot change profile",
        code: -1,
        error: {name:err.name, message: err.message}
      });
    });
}

module.exports = {
  loginUser: loginUser,
  logoutUser: logoutUser,
  createNewUser: createNewUser,
  getUserInfo: getUserInfo,
  editUserInfo: editUserInfo,
};
