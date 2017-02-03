var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var router = express.Router();

var queries = require('./queries');
var users = require('./users');

var mockdata = require('../utils/MOCK_DATA');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    status: 'success',
    data: mockdata.Hi,
    message: 'Retrieved ALL puppies'
  });
});

router.get('/getRelatedItems', queries.getRelatedItems);
router.post('/uploadDocuments', upload.single('document'), queries.uploadDocuments);

router.post('/loginUser', users.loginUser);
router.get('/logoutUser', users.logoutUser);
router.post('/createNewUser', users.createNewUser);
router.get('/getUserInfo', users.getUserInfo);
router.post('/editUserInfo', users.editUserInfo);

module.exports = router;
