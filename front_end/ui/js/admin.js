$(document).ready(function(){
  	//var theUrl = "http://localhost:3000/getCourseKeyword?query=";
  	var courseUrl = globalUrl + "/getCourseKeyword?query=";
    //var userUrl = globalUrl +"/getUserInfo";
    //var questionUrl = globalUrl + "/";
  	//var formData = $(form).serializeArray();
  	var data;
  	console.log("FUCK");
  	$.get(courseUrl, function (data) {
  		console.log("SHIT");
  		console.log(data);
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
    	console.log("DOONE");
      //document.cookie;

  	}).fail(function (){
  		console.log("fail");
  	});
});