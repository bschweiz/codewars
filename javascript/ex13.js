// particularities of the number varialbel type

// my solution, issue here is that it doesn't work for negative numbers or zero
function whatNumberIsIt(n){

  if (n == Number.POSITIVE_INFINITY) {
      return "Input number is Number.POSITIVE_INFINITY" 
  } else if (n == Number.MAX_VALUE) {
    return "Input number is Number.MAX_VALUE" 
  } else if (n == Number.MIN_VALUE) {
    return "Input number is Number.MIN_VALUE" 
  } else if (n == Number.NEGATIVE_INFINITY) {
    return "Input number is Number.NEGATIVE_INFINITY" 
  } else if (n != Number && n >1) {
    console.log(n)
    var string = "Input number is " + n
    return string
} else { return "Input number is Number.NaN"}
  
  }

// slicker, could still assign the first 3 words to a varible and then return that plus the result of the filter check

function whatNumberIsIt(n){
  switch(n){
    case Number.MAX_VALUE: return ("Input number is Number.MAX_VALUE"); 
    case Number.MIN_VALUE: return  ("Input number is Number.MIN_VALUE");
    case Number.POSITIVE_INFINITY: return ("Input number is Number.POSITIVE_INFINITY");
    case Number.NEGATIVE_INFINITY: return ("Input number is Number.NEGATIVE_INFINITY");
    case Number(n) : return "Input number is " + n;
  default: return "Input number is Number.NaN";
  }
}
