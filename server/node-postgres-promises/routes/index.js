var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    status: 'success',
    data: 'hi',
    message: 'Retrieved ALL puppies'
  });
});

module.exports = router;