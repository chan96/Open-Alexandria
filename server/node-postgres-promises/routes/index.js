var express = require('express');
var path = require('path');
var multer  = require('multer');
var mime = require('mime-types');
var projectPath = path.normalize(path.join(__dirname, '../'));
var documentsPath = path.normalize(path.join(projectPath, './documents/'));
console.log("Index documentsPath: " + documentsPath);
var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, documentsPath);
  },
  filename: function (req, file, cb){
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });


var router = express.Router();

var queries = require('./queries');
var users = require('./users');
var courses = require('./courses');
var documents = require('./documents');
var subscriptions = require('./subscriptions');
var questions = require('./questions');
var answers = require('./answers');
var flashcards = require('./flashcards');

const exec = require('child_process').exec;

var mockdata = require('../utils/MOCK_DATA');

router.post('/report', queries.report);

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
router.get('/userTTL', users.userTTL);
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


router.get('/getUserInfoFromUID', users.getUserInfoFromUID);
/**
 * POST editUserInfo
 * @param {cookie} token
 * @param {string} username
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} password
 */
router.post('/editUserInfo', users.editUserInfo);
router.post('/checkPassword', users.checkPassword);
router.post('/editUserPassword', users.editUserPassword);

router.get('/enableUser', users.enableUser);
router.get('/disableUser', users.disableUser);
router.get('/listAllUsers', users.listAllUsers);


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
router.get('/getCourseKeyword', courses.getCourseKeyword);
router.get('/getAllCourse', courses.getAllCourse);
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
router.get('/searchDocumentByCurrentUser', documents.searchDocumentByCurrentUser);

router.get('/searchDocumentByUser', documents.searchDocumentByUser);
router.get('/searchDocumentByUserAdmin', documents.searchDocumentByUserAdmin);
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

router.get('/likeDocument', documents.likeDocument);
router.get('/dislikeDocument', documents.dislikeDocument);
router.post('/postDocumentComment', documents.postDocumentComment);
router.get('/getDocumentComment', documents.getDocumentComment);
router.get('/addTagToDocument', documents.addTagToDocument);
router.get('/getDocumentsFromTag', documents.getDocumentsFromTag);
router.get('/getTagsFromDocument', documents.getTagsFromDocument);
router.get('/addRatingToDocument', documents.addRatingToDocument);
router.get('/getDocumentRating', documents.getDocumentRating);

router.get('/subscribeUserToCourse', subscriptions.subscribeUserToCourse);
router.get('/unsubscribeUserToCourse', subscriptions.unsubscribeUserToCourse);
router.get('/subscriptionsByUser', subscriptions.subscriptionsByUser);
router.get('/subscriptionsByCourse', subscriptions.subscriptionsByCourse);

/**
 * GET getQuestions
 * @param {cookie} token
 * @param {int} courseid
 */
router.get('/getQuestions', questions.getQuestions);

router.get('/getAllQuestions', questions.getAllQuestions);
/**
 * GET getQuestionInfo
 * @param {cookie} token
 * @param {int} questionid
 */
router.get('/getQuestionInfo', questions.getQuestionInfo);
/**
 * POST postQuestion
 * @param {cookie} token
 * @param {string} questiontitle
 * @param {string} questionbody
 * @param {int} courseid
 * @param {int} creatorid
 */
router.post('/postQuestion', questions.postQuestion);

router.post('/addAnswerToQuestion', answers.addAnswerToQuestion);
router.post('/editAnswer', answers.editAnswer);
router.get('/disableAnswer', answers.disableAnswer);
router.get('/enableAnswer', answers.enableAnswer);
router.get('/getAnswersToQuestion', answers.getAnswersToQuestion);
router.get('/likeAnswer', answers.likeAnswer);
router.get('/dislikeAnswer', answers.dislikeAnswer);

router.get('/disableQuestion', questions.disableQuestion);
router.get('/enableQuestion', questions.enableQuestion);
router.get('/likeQuestion', questions.likeQuestion);
router.get('/dislikeQuestion', questions.dislikeQuestion);

router.get('/createDeck', flashcards.createDeck);
router.get('/createCardInDeck', flashcards.createCardInDeck);
router.get('/searchFlashDeckName', flashcards.searchFlashDeckName);
router.get('/searchFlashDeckNameByCourse', flashcards.searchFlashDeckNameByCourse);
router.get('/getFlashCardsForDeck', flashcards.getFlashCardsForDeck);
router.get('/getFlashDeckById', flashcards.getFlashDeckById);

router.get('/searchFeedback', documents.searchFeedback);


/****** Uhmmm ******/
router.post('/TeamFourHasCancer', function(req, res, next){
  exec('git -C ' + projectPath + ' pull origin master', function(err, stdout, stderr){
    res.status(200).json({
      error: err
    });
    return;
  }); 
});


module.exports = router;
