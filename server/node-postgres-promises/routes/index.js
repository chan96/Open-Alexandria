var express = require('express');
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

router.get('/getRelatedItems/:phrase', db.getRelatedItems);

module.exports = router;
