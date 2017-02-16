$( document ).ready(function() {
    console.log( "ready!" );
     $('#createBttn').on('click', function(e) {  
         if (validate()) {
             var courseName = $('#courseNameBox').val();
         var courseDescription = $('#courseDescrBox').val();
         var school = $('#schoolBox').val();
         
         createCourse(courseName, courseDescription, school);
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

function createCourse(cn, cd, s) {
     $.ajax({
        type: "POST",
        url: globalUrl + 'addNewCourse/',
        data: ({ coursename : cn, coursedescription: cd, school : s}),
        dataType: "html",
        success: function(data) {
            console.log(data);
        },
        error: function(data) {
            console.log(data.error.message);
            
        }
    });
}
