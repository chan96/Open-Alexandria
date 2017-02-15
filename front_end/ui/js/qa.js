$( document ).ready(function() {
  console.log( "ready!" );
  setQuestionInfo(getUrlParameter('questionid'));
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

function setQuestionInfo(qid) {

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

function getAnswers(questionID) {

}

function createQuestion(cn, cd, s) {
    $.ajax({
        type: "POST",
        url: globalUrl + 'createQuestion/',
        data: ({
                courseid    : cId,
                userid      : uId,
                title       : t,
                body        : b
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


function createAnswer(cn, cd, s) {
    $.ajax({
        type: "POST",
        url: 'http://Openalexandria.us.to/createAnswer/',
        data: ({
                questionid  : qnId,
                courseid    : cId,
                userid      : uId,
                body        : b,
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
