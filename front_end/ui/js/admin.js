$(document).ready(function(){
  	var theUrl = "http://localhost:3000/getCourseInfo?uniqueid=1";
  	//var theUrl = "http://openalexandria.us.to/getCourseInfo?uniqueid=1";
  	//var formData = $(form).serializeArray();
  	var data;
  	console.log("FUCK");
  	$.get(theUrl, function (data) {
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