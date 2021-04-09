// this one definitely took a while, and is prtty ugly

function persistence(num) {
  
  let count = 0;
  let multiplied = [...num.toString()].reduce((a,b) => a * b);
  let length = multiplied.length
  
  if (length == 1) {
    return count;
    } 
  
  else {
      count++
        
    do {
        if (multiplied == "0") {return count};
      
        multiplied = [...multiplied.toString()].reduce((a,b) => a * b);
        count++;
        length = multiplied.toString().length;
        }
    while (length > 1)  
      } 
    return count;
}

  
//    some cool ones:
  
function persistence(num) {
   for (var i = 0; num > 9; i++) {
     num = num.toString().split('').reduce((t, c) => c * t);
   }
   return i;
}
  
function persistence(num) {
   var times = 0;
   
   num = num.toString();
   
   while (num.length > 1) {
     times++;
     num = num.split('').map(Number).reduce((a, b) => a * b).toString();
   }
   
   return times;
}
