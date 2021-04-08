function padIt(str,n){
  //coding here
  midpoint = parseInt(n/2)
  padded = ''
  if (n == 1) {
    padded = '*' + str
    return padded
  } else {
    
  while (n>0) {
    padded = padded.padStart(n,'*');
    n--;
  }
  console.log(midpoint)
  var final = padded.substring(0, padded.length-midpoint) + str + padded.slice(-midpoint)
  return final
  }
}  
