var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var router = express.Router();

var db = require('./queries');

var mockdata = require('../utils/MOCK_DATA');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    status: 'success',
    data: mockdata.Hi,
    message: 'Retrieved ALL puppies'
  });
});

router.get('/getRelatedItems', db.getRelatedItems);
router.post('/loginUser', db.loginUser);
router.post('/uploadDocuments', upload.single('document'), db.uploadDocuments);

module.exports = router;
