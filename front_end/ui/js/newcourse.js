$( document ).ready(function() {
  setNewCourseAutocomplete();
    console.log( "ready!" );
     $('#createBttn').on('click', function(e) {  
         if (validate()) {
             var courseName = $('#courseNameBox').val();
         var courseDescription = $('#courseDescrBox').val();
         var schoolID = getSchoolID();
         console.log(schoolID);
         
         createCourse(courseName, courseDescription, schoolID);
         }
        
    });
    
     $('#cancelBttn').on('click', function(e) {  
        
         location.href = './index.html';
    });
});

function validate() {
    if ($('#courseNameBox').val().trim() < 5) {
        return 0;
    }
    
    return 1;
}


function createCourse(cn, cd, sid) {
     $.ajax({
        type: "POST",
        url: globalUrl + 'addNewCourse/',
        data: ({ coursename : cn, coursedescription: cd, courseschoolid : sid}),
        dataType: "html",
        success: function(data) {
            console.log(data);
            location.href = './index.html'
        },
        error: function(data) {
            console.log(data.error.message);
            
        }
    });
}
