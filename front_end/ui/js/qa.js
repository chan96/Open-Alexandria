$( document ).ready(function() {
  console.log( "ready!" );
  var questionID = getUrlParameter('questionid');
  getQuestionInfo(questionID);
  getAnswers(questionID);
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


function createAnswer(qid, cid, qbody, uid) {
    $.ajax({
        type: "POST",
        url: globalUrl + `addAnswerToQuestion/?questionid=${qid}&courseid=${cid}&userid=${uid}`,
        data: ({
                body        : qbody,
                }),
        dataType: "html",
        success: function(data) {
            console.log(data.message);
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}
