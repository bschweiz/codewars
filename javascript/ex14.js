// some practice with differen format string methods, more practice with padding as well
// my solution:

function colorOf(r,g,b){

  var hex = '#'
  hex = hex.concat(r.toString(16).padStart(2,0))
           .concat(g.toString(16).padStart(2,0))
           .concat(b.toString(16).padStart(2,0))
  return hex
}

//  more standard and verbose:

function colorOf(r,g,b){
  r.toString(16).length < 2 ? r = '0' + r.toString(16) : r = r.toString(16);
  g.toString(16).length < 2 ? g = '0' + g.toString(16) : g = g.toString(16);
  b.toString(16).length < 2 ? b = '0' + b.toString(16) : b = b.toString(16);
  
  return '#' + r + g + b;
}
