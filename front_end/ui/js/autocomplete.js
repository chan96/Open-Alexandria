$(document).ready(function(){
  setClassesAutocompleteHeader();
  $("input[id='classes']").prop("checked", true);
  if($("input[id='classes']").is(':checked')){
    setClassesAutocomplete();
  }
});
function setSchoolID(idNum) {
  $('#schoolID').val(idNum);
}
function getSchoolID() {

  return $('#schoolID').val();
}
function setNewCourseAutocomplete() {
    $('#schoolBoxAutocomplete').autocomplete({

      minChars: 3,
      lookupLimit: 5,
      serviceUrl: globalUrl + 'getUniversity/',
      onSelect: function (suggestion) {
        setSchoolID(suggestion.data.universities_unique_id);
        console.log(getSchoolID());
      },
      showNoSuggestionNotice: true
    });
}
function setClassesAutocompleteHeader() {
    $('#headerSearch').autocomplete({

      serviceUrl: globalUrl + 'getCourseKeyword/',
      onSearchComplete: function (query, suggestions) {
        console.log(suggestions);
      },
      formatResult: function (suggestion, currentValue) {
        console.log(suggestion);
        return suggestion.value + ' - ' + suggestion.data.courseschoolname; //+ ' - ' + suggestion.data.courseschoolwebsite;
      },
      onSelect: function (suggestion) {
        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        console.log(suggestion.data);
        console.log(suggestion.data.coursename);

        location.href = globalUrl + 'search.html?courseid=' +  suggestion.data.courseuniqueid + '&coursename=' + suggestion.data.coursename;

      },
      showNoSuggestionNotice: true
    });
}
function setClassesAutocomplete() {
    $('#autocomplete').autocomplete({

      serviceUrl: globalUrl + 'getCourseKeyword/',
      onSearchComplete: function (query, suggestions) {
        console.log(suggestions);
      },
      formatResult: function (suggestion, currentValue) {
        console.log(suggestion);
        return suggestion.value + ' - ' + suggestion.data.courseschoolname; //+ ' - ' + suggestion.data.courseschoolwebsite;
      },
      onSelect: function (suggestion) {
        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        console.log(suggestion.data);
        console.log(suggestion.data.coursename);

        location.href = globalUrl + 'search.html?courseid=' +  suggestion.data.courseuniqueid + '&coursename=' + suggestion.data.coursename;

      },
      showNoSuggestionNotice: true
    });
}

$("input[id='classes']").click(function(){
            console.log("Classes checked");
            setClassesAutocomplete();
});
$("input[id='files']").click(function(){
            console.log("files checked");
            $('#autocomplete').autocomplete({

                serviceUrl: globalUrl + 'searchDocument/',
                onSearchComplete: function (query, suggestions) {
                    console.log(suggestions);
                },
                onSelect: function (suggestion) {
                //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
                console.log(suggestion.data);
                console.log(suggestion.data.documentname);

                location.href = globalUrl + 'document_view.html?docName=' + suggestion.data.documentname + 
                '&docID=' + suggestion.data.documentuniqueid + '&docUrl=' + suggestion.data.documentlink;


            },

            showNoSuggestionNotice: true


        });
});
/*$( "#txtcity" ).autocomplete({
  // do whatever
}).val('Banana').data('autocomplete')._trigger('select');*/
