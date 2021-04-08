// sorting an array of numbers into odd and even
function pickIt(arr){
  var odd=[],even=[];
  //coding here
  var len = arr.length
  for (var n=0; n < len; n++) {
    
    console.log(arr[n])
    if (arr[n] % 2 !== 0) {
      odd.push(arr[n])
    } else {
      even.push(arr[n])
    }
  }
  return [odd,even];
}
