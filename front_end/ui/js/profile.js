var userID;
var dataGlobalUser;
var cookieField = document.cookie.split("; ");

function submitChange(form){
  if(checkAllInputs()){
    var theUrl = globalUrl + "editUserInfo";
    //var theUrl = "http://openalexandria.us.to/loginUser";
    var formData = $(form).serializeArray();
    console.log(formData);
    $.post(theUrl, formData, function (data) {
        console.log("Profile information changed!");
        $("#log").html("<p color='black'>Profile information changed!</p>");
      }).done(function(){
        //document.cookie;

      }).fail(function (){
          $("#log").html("<p>Changes failed to save</p>");
      });
      return false;
  }
  return false;
}



$(document).ready(function(){
  loadUserProfile();
  setDocumentGridListener();
  console.log(cookieField);
  getDocPreviewsUser(4);
});

function setDocumentGridListener() {
    $('#pinBoot').pinterest_grid({
        no_columns: 4,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 700
    });
}

function loadUserProfile(){
  	//var theUrl = "http://localhost:3000/getCourseKeyword?query=";
  var userUrl = globalUrl +"getUserInfo";
    //USERS
    $.get(userUrl, function (data) {
      dataGlobalUser = data;
      var hashedCode = md5(data.firstname + data.lastname + data.email + data.userid);
      $("#avatarImg").attr('src', "https://robohash.org/" + hashedCode + ".jpg");

            //$("#PersonalInfo").html("<thead><tr><th>First Name</th><th>Last Name</th><th>User Email</th><th>Admin Status</th><th>User ID</th></tr></thead>");
      console.log(dataGlobalUser);
      $("#name").html(data.firstname + ' ' + data.lastname);
      $("#type").html(data.isadmin);
      $("#email").html(data.email);
      document.getElementById("firstname").value = data.firstname;
      document.getElementById("lastname").value = data.lastname;
      document.getElementById("email").value = data.email;


      /*
      $("#firstname").html(data.firstname);
      $("#lastname").html(data.lastname);
      $("#email").html(data.email);
      */
      /*
      for(var count = 0; count < Object.keys(dataGlobalUser.suggestions).length; count++){
        var buttonText = "";
        if(data.suggestions[count].data.users_isactive){
          buttonText = "Block User";
        }else{
          buttonText = "Unblock User";
        }
        $("#PersonalInfo").append("<tbody><tr><td>" + data.suggestions[count].data.users_firstname + "</td><td>" + data.suggestions[count].data.users_lastname + 
          "</td><td>"+ data.suggestions[count].data.users_email +"</td><td>"+ data.suggestions[count].data.users_isadmin +
          "</td><td>" + data.suggestions[count].data.users_unique_id + 
          "<td><button id='block" + count + "' type='button' onclick='blockUser(" + count + ")'>" + buttonText + "</button></td></tr></tbody>");
      }
      */
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
      //document.cookie;

    }).fail(function (){
      console.log("fail");
    });
}
/*
function checkPassword(){
  if(document.getElementById("password").value === document.getElementById("confirm password").value){
    return true;
  }
  else{
    alert("Password does not match.");
    return false;
  }
}
*/
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validateNumber(number) {
    return /^[0-9]+$/.test(number);
}
function validateLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
}
function checkAllInputs(){

  if(!validateEmail(document.getElementById("email").value)){
    alert("Invalid email");
    return false;
  }
  else if(!validateLetters(document.getElementById("firstname").value) || !validateLetters(document.getElementById("lastname").value)){
    alert("Invalid name");
    return false
  }
  else{
    return true;
  }
}

(function ($, window, document, undefined) {
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

