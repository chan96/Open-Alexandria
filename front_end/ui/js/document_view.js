$(document).ready(function() {
  var url = decodeURIComponent(getUrlParameter('docUrl'));
  console.log('https://view.officeapps.live.com/op/embed.aspx?src=' + url);
  //use microsoft viewer 
  //$('#doc-frame').attr('src', 'https://view.officeapps.live.com/op/embed.aspx?src=' + url);
  
  //use google doc viewer
  $('#doc-frame').attr('src', 'https://docs.google.com/gview?url=' + url + '&embedded=true');
  $('#doc-name').text(getUrlParameter('docName'));
})
