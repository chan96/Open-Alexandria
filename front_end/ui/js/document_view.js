$(document).ready(function() {
  var url = decodeURIComponent(getUrlParameter('docUrl'));
  console.log('li ' + url);
  $('#doc-frame').attr('src', url);
  $('#doc-name').text(getUrlParameter('docName'));
})
