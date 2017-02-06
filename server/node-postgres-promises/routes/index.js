var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var router = express.Router();

var queries = require('./queries');
var users = require('./users');
var courses = require('./courses');

var mockdata = require('../utils/MOCK_DATA');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/home/monollama/cs407/Open-Alexandria/front_end/ui/index.html');
});

router.get('/getRelatedItems', queries.getRelatedItems);
router.post('/uploadDocuments', upload.single('document'), queries.uploadDocuments);

router.post('/loginUser', users.loginUser);
router.get('/logoutUser', users.logoutUser);
router.post('/createNewUser', users.createNewUser);
router.get('/getUserInfo', users.getUserInfo);
router.post('/editUserInfo', users.editUserInfo);

router.post('/addNewCourse', courses.addNewCourse);
router.get('/getCourseInfo', courses.getCourseInfo);
router.get('/getCourseKeyword', courses.getCourseKeyword);
router.get('/disableCourse', courses.disableCourse);
router.get('/enableCourse', courses.enableCourse);
router.post('/editCourseInfo', courses.editCourseInfo);


module.exports = router;
