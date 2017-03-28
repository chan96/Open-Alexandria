var courseName;
var courseID;

$(document).ready(function() {



    courseName = getUrlParameter('coursename');
    courseID = getUrlParameter('courseid');

    $('.course-name').text(courseName);
    $('.course-name').css("font-weight","Bold");

    setListeners();

});

function setListeners() {
    setDocumentGridListener();
    setGetQuestionListener();
    setGetDocumentListener();
    setNewPostQuestionListener();
    setNewPostDocumentListener();
    setNewPostFlashcardListener();
}

function setDocumentGridListener() {
    $('#pinBoot').pinterest_grid({
        no_columns: 4,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 700
    });
}

function setGetQuestionListener() {
    
    setQuestions(courseID);
}

function setGetDocumentListener() {

    getDocPreviews(courseID);
}

function setNewPostQuestionListener() {
    $('#questionModal').on('show.bs.modal', function (e) {
        if (document.cookie == '') {
          
          location.href = globalUrl + '/login.html' + '?redirect=' + location.href;
        }
        console.log('asdfasdf');
    })
    $('#postBttn').click(function () {
        var questionTitle = $('#question-title').val();
        var questionBody = $('#question-body').val();
        var userid = getUserID();
        var courseID = getUrlParameter('courseid');
        var postBttn = $('#postBttn');
        console.log('\ncourseID:' + courseID + '\nuserid:' + userid + '\nqT:' + questionTitle + '\nqB:' + questionBody);

        postBttn.prop('disabled', true);
        postBttn.text('Submitting...');

        $.ajax({
            type: 'POST',
            url: globalUrl + 'postQuestion/',
            data: { 'questiontitle': questionTitle,
                   'questionbody': questionBody,
                   'courseid': courseID,
                   'creatorid': userid},
            //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                console.log(data);
                postBttn.prop('disabled', false);
                postBttn.text('Post Question');

                location.reload();
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.Message);
                postBttn.prop('disabled', false);
                postBttn.text('Post Question');
                //alert(data.error.message);


            }
        });
    });
}

function setNewPostFlashcardListener() {

}

function setNewPostDocumentListener() {
    
    $("#newDocumentModalContainer").load('newDocument.html', function() {
$('#documentModal').on('show.bs.modal', function (e) {
        if (document.cookie == '') {
          location.href = globalUrl + '/login.html' + '?redirect=' + location.href;
        }
    })});
    
    
}




/*
Ref:
Thanks to:
http://www.jqueryscript.net/layout/Simple-jQuery-Plugin-To-Create-Pinterest-Style-Grid-Layout-Pinterest-Grid.html
*/


/*
    Pinterest Grid Plugin
    Copyright 2014 Mediademons
    @author smm 16/04/2014

    usage:

     $(document).ready(function() {

        $('#blog-landing').pinterest_grid({
            no_columns: 4
        });

    });


*/
;(function ($, window, document, undefined) {
    var pluginName = 'pinterest_grid',
        defaults = {
            padding_x: 10,
            padding_y: 10,
            no_columns: 3,
            margin_bottom: 50,
            single_column_breakpoint: 700
        },
        columns,
        $article,
        article_width;

    
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        var self = this,
            resize_finish;

        $(window).resize(function() {
            clearTimeout(resize_finish);
            resize_finish = setTimeout( function () {
                self.make_layout_change(self);
            }, 500);
        });

        self.make_layout_change(self);

        setTimeout(function() {
            $(window).resize();
        }, 500);
    };

    Plugin.prototype.calculate = function (single_column_mode) {
        var self = this,
            tallest = 0,
            row = 0,
            $container = $(this.element),
            container_width = $container.width();
        $article = $(this.element).children();

        if(single_column_mode === true) {
            article_width = $container.width() - self.options.padding_x;
        } else {
            article_width = ($container.width() - self.options.padding_x * self.options.no_columns) / self.options.no_columns;
        }

        $article.each(function() {
            $(this).css('width', article_width);
        });

        columns = self.options.no_columns;

        $article.each(function(index) {
            var current_column,
                left_out = 0,
                top = 0,
                $this = $(this),
                prevAll = $this.prevAll(),
                tallest = 0;

            if(single_column_mode === false) {
                current_column = (index % columns);
            } else {
                current_column = 0;
            }

            for(var t = 0; t < columns; t++) {
                $this.removeClass('c'+t);
            }

            if(index % columns === 0) {
                row++;
            }

            $this.addClass('c' + current_column);
            $this.addClass('r' + row);

            prevAll.each(function(index) {
                if($(this).hasClass('c' + current_column)) {
                    top += $(this).outerHeight() + self.options.padding_y;
                }
            });

            if(single_column_mode === true) {
                left_out = 0;
            } else {
                left_out = (index % columns) * (article_width + self.options.padding_x);
            }

            $this.css({
                'left': left_out,
                'top' : top
            });
        });

        this.tallest($container);
        $(window).resize();
    };

    Plugin.prototype.tallest = function (_container) {
        var column_heights = [],
            largest = 0;

        for(var z = 0; z < columns; z++) {
            var temp_height = 0;
            _container.find('.c'+z).each(function() {
                temp_height += $(this).outerHeight();
            });
            column_heights[z] = temp_height;
        }

        largest = Math.max.apply(Math, column_heights);
        _container.css('height', largest + (this.options.padding_y + this.options.margin_bottom));
    };

    Plugin.prototype.make_layout_change = function (_self) {
        if($(window).width() < _self.options.single_column_breakpoint) {
            _self.calculate(true);
        } else {
            _self.calculate(false);
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                       new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);

$( ".talk-bubble" ).click(function() {
    location.href = globalUrl + 'qa.html?coursename=' + coursename + '&school=' + 'todo' + '&question=' + 'todo';//question;
    //window.location = './qa.html';
});

function setQuestions(cid) {
    $.ajax({
        type: "GET",
        url: globalUrl + 'getQuestions/',
        data: ({ courseid : cid}),
        dataType: "html",
        success: function(data) {
            //console.log(data);
            var jsonData = $.parseJSON(data).suggestions;
            console.log(jsonData);
            for (var i = 0; i < jsonData.length; i++) {
                console.log(jsonData[i].data.title);
                var $div = $('#question0');
                var id = jsonData[i].data.questionid;
                console.log(id);
                var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) + id;
                var $question = $div.clone().prop('id', 'question'+num );
                var qid = $question.attr('id');
                console.log(qid);

                $question.find('p').text(jsonData[i].data.title);



                $('#questions-row').append($question);
                setQuestionOnClick(qid);
                $question.show();
            }

        },
        error: function(data) {
            console.log(data.error.message);

        }
    });

}

function setQuestionOnClick(qid) {

  var qNum = qid.replace(/[^0-9]/gi, '');
    

    $('#' + qid).click(function() {
      location.href = globalUrl + 'qa.html?questionid=' + qNum + '&courseid=' + getUrlParameter('courseid');
      
    });
}

$('#topic').upvote();
$('#topic').upvote({count: 5, upvoted: 1});
$('#topic').upvote({count: 5, downvoted: 1});
$('#topic').upvote({count: 5, upvoted: 1, starred: 1});

var callback = function(data) {
    $.ajax({
        url: '/vote',
        type: 'post',
        data: { id: data.id, up: data.upvoted, down: data.downvoted, star: data.starred }
    });
};
$('#topic-123').upvote({id: 123, callback: callback});
