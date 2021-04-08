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

// the nicer solutions:

function padIt(str,n){
  while(n>0){
    if(n%2 === 0) {
      str = str + "*";
    }else{
      str = "*" + str;
    }
    n --;
  }
  return str;
}

// most elegant
function padIt(str, n) {
  while (n > 0) {
    str = n-- % 2 ? '*' + str : str + '*';
  }
  return str;
}

