var square = null; // object
var horiz = 'right';
var vert = 'down';

function doMove() {
  var obj = {},
  distance = 10,
  rect = square.getBoundingClientRect();
if( horiz == "left") {
   if(rect.right > 0 && rect.right < 10) {
      distance = rect.right;
   }
   else if (rect.right <= 0) {
      horiz = "right";
   }   
}
else {
   if(rect.right > (window.innerWidth-10) && rect.right+1<window.innerWidth) {
       distance = (window.innerWidth-rect.right); 
   }
   else if(rect.right+1 >=window.innerWidth){
      horiz = "left";
   }

}
if( vert == "up") {
   if(rect.top > 0 && rect.top < 10) {
      distance = rect.top;
   }
   else if (rect.top <= 0) {
      vert = "down";
   }   
}
else {
   if(rect.bottom > (window.innerHeight-10) && rect.bottom+1<window.innerHeight) {
       distance = (window.innerHeight-rect.bottom); 
   }
   else if(rect.bottom+1 >= window.innerHeight){
      vert = "up";
   }

}
if ( horiz == "right" ) {
   square.style.left = parseInt(square.style.left)+parseInt(distance)+'px';    
}

else {
   square.style.left = parseInt(square.style.left)-parseInt(distance)+'px';    
}
if ( vert == 'down' ) {
   square.style.top = parseInt(square.style.top)+parseInt(distance)+'px';
}
else {
   square.style.top = parseInt(square.style.top)-parseInt(distance)+'px';
}
setTimeout(doMove,200); // call doHoriz in 200 ms
}

function init() {
  square = document.getElementById('square'); // get the square object
  square.style.left = '0px'; // set square's intial position
  square.style.top = '50px';
  doMove(); // start animating
}

window.onload = init;
