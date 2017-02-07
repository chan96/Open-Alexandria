var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var router = express.Router();

var queries = require('./queries');
var users = require('./users');
var courses = require('./courses');
var documents = require('./documents');

var mockdata = require('../utils/MOCK_DATA');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/home/monollama/cs407/Open-Alexandria/front_end/ui/index.html');
});

router.get('/getRelatedItems', queries.getRelatedItems);

/**
 * POST loginUser
 * @param {string} username
 * @param {string} password
 */
router.post('/loginUser', users.loginUser);
/**
 * GET logoutUser
 * @param {cookie} token
 */
router.get('/logoutUser', users.logoutUser);
/** 
 * POST createNewUser
 * @param {string} email
 * @param {string] password
 * @param {string} firstname
 * @param {string} lastname
 */
router.post('/createNewUser', users.createNewUser);
/**
 * GET getUserInfo
 * @param {cookie} token
 * @param {string} userID
 */
router.get('/getUserInfo', users.getUserInfo);
/**
 * POST editUserInfo
 * @param {cookie} token
 * @param {string} username
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} password
 */
router.post('/editUserInfo', users.editUserInfo);

/**
 * POST addNewCourse
 * @param {cookie} token
 * @param {string} coursename
 * @param {string} coursedescription
 */
router.post('/addNewCourse', courses.addNewCourse);
/**
 * GET getCourseInfo 
 * @param {string} uniqueid
 */
router.get('/getCourseInfo', courses.getCourseInfo);
/**
 * GET getCourseKeyword
 * @param {string} query
 */
router.get('/getCourseKeyword', courses.getCourseKeyword);a
/**
 * GET disableCourse
 * @param {cookie} token
 * @param {string} uniqueid
 */
router.get('/disableCourse', courses.disableCourse);
/**
 * GET enableCourse
 * @param {cookie} token
 * @parm {string} uniqueid
 */
router.get('/enableCourse', courses.enableCourse);
/**
 * POST editCourseInfo
 * @param {cookie} token
 * @param {string} uniqueid
 * @param {string} coursedescription
 */
router.post('/editCourseInfo', courses.editCourseInfo);

/**
 * POST uploadDocuments
 * @param {cookie} token
 * @param {string} rename
 * @param {string} courseid
 * @param {string} type
 * @param {string} description
 */
router.post('/uploadDocuments', upload.single('document'), documents.uploadDocuments);
/**
 * GET searchDocument
 * @param {string} query
 */
router.get('/searchDocument', documents.searchDocument);
/**
 * GET searchDocumentByCourse
 * @param {string} query
 * @param {string} courseid
 */
router.get('/searchDocumentByCourse', documents.searchDocumentByCourse);
/**
 * GET searchDocumentByUser
 * @param {string} query
 * @param {string} userid
 */
router.get('/searchDocumentByUser', documents.searchDocumentByUser);
/**
 * GET getDocument
 * @param {string} documentuniqueid
 */
router.get('/getDocument', documents.getDocument);
/**
 * GET disableDocument
 * @param {cookie} token
 * @param {string} uniqueid
 */
router.get('/disableDocument', documents.disableDocument);
/**
 * GET enableDocument
 * @param {cookie} token
 * @param {string} uniqueid
 */
router.get('/enableDocument', documents.enableDocument);


module.exports = router;
