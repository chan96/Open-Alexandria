$( document ).ready(function() {
  console.log( "ready!" );
  var questionID = getUrlParameter('questionid');
  getQuestionInfo(questionID);
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

function getQuestionInfo(qid) {

  console.log('hi');
  $.ajax({
    type: "GET",
    url: globalUrl + 'getQuestionInfo/',
    data: ({ questionid : qid}),
    dataType: "html",
    success: function(data) {
      var parsedData = $.parseJSON(data).question[0].data;
      var title = parsedData.title;
      var body = parsedData.body;

      $('.topic-title').text(title);
      $('.author-content').text(body);

    },
    error: function(data) {
      console.log(data.error.message);

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
      var parsedData = $.parseJSON(data).question[0].data;
      var title = parsedData.title;
      var body = parsedData.body;

      //$('.topic-title').text(title);
      //$('.author-content').text(body);

    },
    error: function(data) {
      console.log(data.error.message);

    }
  });
}


function setAnswerBoxListener() {
  $('#answer-form').submit(function() {

    var qid = getUrlParameter('questionid');
    var cid = getUrlParameter('courseid');
    var qbody = $('#message-box-text-box').val();
    var uid = getUserID();

    console.log('hi2');

    createAnswer(qid, cid, qbody, uid);
  location.reload();
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
