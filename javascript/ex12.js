// my solution, for in loops, searching both keys and values for string length

function giveMeFive(obj){
  //coding here
  var results = [];
  
  for (var key in obj) {
    if (key.length == 5) {
    results.push(key);
    }
    if ( obj[key].length == 5 ) {
    results.push(obj[key]);
    }
  }
  return results
  }
