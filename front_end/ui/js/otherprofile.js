$(document).ready(function() {
  var userid = getUrlParameter('userid');
  loadUserProfile(userid);
});

function loadUserProfile(userid){
  $.ajax({
    type: "GET",
    url: globalUrl + 'getUserInfoFromUID/',
    data: ({userid: userid}),
    dataType: "json",
    success: function(data) {
      var hashedCode = md5(data.firstname + data.lastname + data.email + userid);
      $("#userimg").attr("src",  "https://robohash.org/" + hashedCode + ".jpg");
      $("#name").text(data.firstname + " " + data.lastname);
      $("#email").text(data.email);
    },
    error: function(data) {
      console.log(data)
    }
  });
};
