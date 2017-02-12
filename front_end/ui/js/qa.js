$( document ).ready(function() {
    console.log( "ready!" );
});

function getQuestions(courseID) {
    
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
