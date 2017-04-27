var questionID;
var currentQuestion = 0;
$( document ).ready(function() {
  console.log( "ready!" );
  questionID = getUrlParameter('questionid');
  showQuestionInfo(questionID);
  getAnswers(questionID);
  setAnswerBoxListener();
});

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

function getUserID() {
  var userID = document.cookie.split(';')[1].split('=')[1];

  console.log('userID = ' + userID);

  return userID;
}

function showQuestionInfo(qid) {

  console.log('hi');
  $.ajax({
    type: "GET",
    url: globalUrl + 'getQuestionInfo/?questionid=' + qid,
    dataType: "html",
    success: function(data) {
      var parsedData = $.parseJSON(data).question[0].data;
      var title = parsedData.title;
      var body = parsedData.body;
      var userID = parsedData.creatorid;
      var t = parsedData.dateupdated.split(/[T .]/);
      var date = t[0];
      var time = t[1];
      var contentDiv = $('.author-content.comment-content');
      var questionID = getUrlParameter('questionid');

      $('.topic-title').text(title);
      $("[name='posting-date-author']").text(date + ', ' + time);
      $('.author-content').text(' ' + body);

      showQuestionAuthor(userID);
      console.log(contentDiv);
      
    createLikesDislikes(parsedData.numdislike, parsedData.numlike, contentDiv, questionID, 'q');
      //showLikesDislikes(parsedData.);

    },
    error: function(data) {
      console.log(data.error.message);

    }
  });
}

function showQuestionAuthor(uid) {

  console.log(uid + ' asdf');
  $.ajax({
    type: "GET",
    url: globalUrl + 'getUserInfoFromUID/',
    data: ({ userid : uid}),
    dataType: "html",
    success: function(data) {
      console.log('qwer ' + data.firstname);
      var parsedData = $.parseJSON(data);
      var fname = parsedData.firstname;
      var lname = parsedData.lastname;
      console.log(fname + lname);

      $("#author-poster").text(fname + ' ' + lname);
      var hashedCode = md5(parsedData.firstname + parsedData.lastname + parsedData.email + uid);
      $("#author-posterpic").attr("src", "https://robohash.org/" + hashedCode + ".jpg");
    },
    error: function(data) {
      console.log(data.error);

    }
  });
}

function getAnswers(qid) {

  $.ajax({
    type: "GET",
    url: globalUrl + 'getAnswersToQuestion/',
    data: ({ questionid : qid}),
    dataType: "html",
    success: function(data) {
      console.log(data);
      var parsedData = $.parseJSON(data).suggestions;

      console.log(parsedData);
      showAnswers(parsedData);

    },
    error: function(data) {
      console.log(data.error.message);

    }
  });
}

function showAnswersAuthor(uid, answerDiv) {

  console.log('qid ' + uid);

  $.ajax({
    type: "GET",
    url: globalUrl + 'getUserInfoFromUID/',
    data: ({ userid : uid}),
    dataType: "html",
    success: function(data) {
      console.log('asdf ' + data.firstname);
      var parsedData = $.parseJSON(data);

      console.log('author ' + parsedData.firstname);
      answerDiv.find('#author0').text(parsedData.firstname + ' ' + parsedData.lastname);
      answerDiv.find('#author0').prop('id', 'author' + uid );
      var hashedCode = md5(parsedData.firstname + parsedData.lastname + parsedData.email + uid);
      console.log(hashedCode);
      answerDiv.find("#author0pic").attr("src", "https://robohash.org/" + hashedCode + ".jpg");

    },
    error: function(data) {
      console.log(data.error.message);

    }
  });
}

function createLikesDislikes(numDislikes, numLikes, div, id, QorA) {
  var contentContainer = div;

  contentContainer.prepend(' <a href="#" class="btn btn-xs btn-success">0</a> <a href="#" class="btn btn-xs btn-warning">0</a>' );
  var likeBttn = contentContainer.find('.btn.btn-xs.btn-success');
  var dislikeBttn = contentContainer.find('.btn.btn-xs.btn-warning');
  console.log('likes ' + numLikes);
  likeBttn.text(numLikes);
  dislikeBttn.text(numDislikes);

  likeBttn.prepend('<span id=' + QorA + id + ' class="glyphicon glyphicon-thumbs-up"></span> ');
  dislikeBttn.prepend('<span id=' + QorA + id + ' class="glyphicon glyphicon-thumbs-down"></span> ');


  $(likeBttn).click(function (e) {

    var id = $(this).find('span').attr('id');
    var route = (id[0] === 'a' ? 'likeAnswer?answerid=' : 'likeQuestion?questionid=');
    var idNum = id.replace ( /[^\d.]/g, '' );

    e.preventDefault();

    $.ajax({
      type: "GET",
      url: globalUrl + route + idNum,
      dataType: "json",
      success: function(data) {
        console.log(data);
        location.reload();
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
      }
    });
  });

  $(dislikeBttn).click(function (e) {

    var id = $(this).find('span').attr('id');
    var route = (id[0] === 'a' ? 'dislikeAnswer?answerid=' : 'dislikeQuestion?questionid=');
    var idNum = id.replace ( /[^\d.]/g, '' );

    e.preventDefault();

    $.ajax({
      type: "GET",
      url: globalUrl + route + idNum,
      dataType: "json",
      success: function(data) {
        console.log(data);
        location.reload();
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
      }
    });
  });
}

function showAnswers(jsonData) {

  for (var i = currentQuestion; i < jsonData.length; i++) {
    console.log(jsonData[i].value.answers_body);
    var $div = $('.empty-response');
    var id = jsonData[i].value.answers_unique_id;
    var t = jsonData[i].value.answers_dateupdated.split(/[T .]/);
    var date = t[0];
    var time = t[1];
    var $answer = $div.clone().removeClass('empty-response');
    var $commentBox = $answer.find('.comment-content');

    console.log(id);
    $answer.find('#answer0').html('\t' + jsonData[i].value.answers_body);
    $answer.find('#answer0').prop('id', 'answer'+id );
    $answer.find("[name='posting-date']").text(date + ', ' + time);


    showAnswersAuthor(jsonData[i].value.answers_users_id, $answer);

    console.log(jsonData[i]);
    createLikesDislikes(jsonData[i].value.answers_numdislike, jsonData[i].value.answers_numlike, $commentBox, jsonData[i].value.answers_unique_id, 'a');

    $('.inner-comments-container').append($answer);
    $answer.show();
  }
  currentQuestion = i;

}


function setAnswerBoxListener() {
  $('#message-box-submit-bttn').click(function () {
    if (document.cookie == '') {
      location.href = globalUrl + '/login.html' + '?redirect=' + location.href;
      return;
    }
    if (!$.trim($("#message-box-text-box").val())) {
      alert('You must enter a message'); 

      return;
    }
    var qid = getUrlParameter('questionid');
    var cid = getUrlParameter('courseid');
    var qbody = $('#message-box-text-box').val();
    var uid = getUserID();

    console.log('hi2');

    createAnswer(qid, cid, qbody, uid);
    //location.reload();
    return false;
  });
}


function createAnswer(qid, cid, qbody, uid) {
  var fullUrl = globalUrl + `addAnswerToQuestion/?questionid=${qid}&courseid=${cid}&userid=${uid}`;
  console.log(fullUrl);
  $.ajax({
    type: "POST",
    url: globalUrl + `addAnswerToQuestion/?questionid=${qid}&courseid=${cid}&userid=${uid}`,
    data: {
      'answerbody'        : qbody
    },
    //dataType: "html",
    success: function(data) {
      console.log(data.message);
      getAnswers(questionID);
      $('#message-box-text-box').val('');
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      alert(err.Message);
    }
  });
}

/**
 *
 * jquery.charcounter.js version 1.2
 * requires jQuery version 1.2 or higher
 * Copyright (c) 2007 Tom Deater (http://www.tomdeater.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($) {
  /**
   * attaches a character counter to each textarea element in the jQuery object
   * usage: $("#myTextArea").charCounter(max, settings);
   */

  $.fn.charCounter = function (max, settings) {
    max = max || 100;
    settings = $.extend({
      container: "<span></span>",
      classname: "charcounter",
      format: "(%1 characters remaining)",
      pulse: true,
      delay: 0
    }, settings);
    var p, timeout;

    function count(el, container) {
      el = $(el);
      if (el.val().length > max) {
        el.val(el.val().substring(0, max));
        if (settings.pulse && !p) {
          pulse(container, true);
        };
      };
      if (settings.delay > 0) {
        if (timeout) {
          window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
          container.html(settings.format.replace(/%1/, (max - el.val().length)));
        }, settings.delay);
      } else {
        container.html(settings.format.replace(/%1/, (max - el.val().length)));
      }
    };

    function pulse(el, again) {
      if (p) {
        window.clearTimeout(p);
        p = null;
      };
      el.animate({ opacity: 0.1 }, 100, function () {
        $(this).animate({ opacity: 1.0 }, 100);
      });
      if (again) {
        p = window.setTimeout(function () { pulse(el) }, 200);
      };
    };

    return this.each(function () {
      var container;
      if (!settings.container.match(/^<.+>$/)) {
        // use existing element to hold counter message
        container = $(settings.container);
      } else {
        // append element to hold counter message (clean up old element first)
        $(this).next("." + settings.classname).remove();
        container = $(settings.container)
          .insertAfter(this)
          .addClass(settings.classname);
      }
      $(this)
        .unbind(".charCounter")
        .bind("keydown.charCounter", function () { count(this, container); })
        .bind("keypress.charCounter", function () { count(this, container); })
        .bind("keyup.charCounter", function () { count(this, container); })
        .bind("focus.charCounter", function () { count(this, container); })
        .bind("mouseover.charCounter", function () { count(this, container); })
        .bind("mouseout.charCounter", function () { count(this, container); })
        .bind("paste.charCounter", function () {
          var me = this;
          setTimeout(function () { count(me, container); }, 10);
        });
      if (this.addEventListener) {
        this.addEventListener('input', function () { count(this, container); }, false);
      };
      count(this, container);
    });
  };

})(jQuery);

$(function() {
  $(".counted").charCounter(320,{container: "#counter"});
});
