//a is input String
//b is seed
function checkCommonLetter(a, b){
  return a.includes(b);
}

function checkOccurFirst(a, b){
  return (a.charAt(0) === b.charAt(0));
}


function findString(listOfString, input){
  var commonString = []; 
  var secondaryString = [];
  for(i = 0; i < listOfString.length; i++){
    var aUpper = listOfString[i].toUpperCase();
    var bUpper = input.toUpperCase();

    if(checkCommonLetter(aUpper, bUpper)){
      if(checkOccurFirst(aUpper, bUpper)){
        commonString.push({value:listOfString[i],data:'Jack has cancer'});
      }else{
        secondaryString.push({value:listOfString[i],data:'Jack has cancer'}); 
      }
    }
  }
  Array.prototype.push.apply(commonString, secondaryString)
    return commonString;
}

module.exports = {
  findString: findString,
}
