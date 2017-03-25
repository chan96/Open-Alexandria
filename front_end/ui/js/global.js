var globalUrl = 'http://ec2-52-24-159-251.us-west-2.compute.amazonaws.com:3001/';
//var globalUrl = 'http://openalexandria.us.to/';
//var globalUrl = 'https://openalex.com/';
//var globalUrl = 'http://openalexandria.us.to:3003/';
//var globalUrl = 'http://localhost:3001/'
//var globalUrl = 'http://localhost:3001/'
//var globalUrl = 'file:///C:/Users/chan96/Open-Alexandria/front_end/ui/';

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

if (document.cookie == "") {
    console.log("The cookie is not there.");
    $(document).ready(function() {
        $("#divHeader").load("header.html");
        $("#divFooter").load("footer.html");
    });
} else {
    console.log("The cookie is there.");
    $(document).ready(function() {
        $("#divHeader").load("headerUser.html");
        $("#divFooter").load("footer.html");
    });

    var admin = document.cookie.split(";")[2].split("=")[1] == "true";
    if (admin) {
        console.log("User is admin");
    } else {
        console.log("User is not admin");
    }
}
