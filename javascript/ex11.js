// breaks and continues in for loops
// my solution:

function grabDoll(dolls) {
  
  var bag=[];
  
  for (var i=0; i<dolls.length; i++) {
   
      if (dolls[i] === 'Hello Kitty' || dolls[i] === 'Barbie doll') {
        bag.push(dolls[i]);
      } else  {continue;}
      if (bag.length >= 3) {
        break;
      }
  }
  return bag;
  
}

// another good one, but mine wasn't far off

function grabDoll(dolls){
  var bag=[];
  for (d in dolls) {
     if (dolls[d]=="Hello Kitty"||dolls[d]=="Barbie doll") bag.push(dolls[d]);
     if (bag.length<3) continue;
     break;
  }
  return bag;
}
