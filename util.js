let cnv = document.getElementById("canv");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 1000;
//
let x = 100;
let y = 100;
let frameCount = 0;
let mouseIsPressed = false;
let mouseX, mouseY;
//
requestAnimationFrame(draw)
//
function draw() {
    // frameCount++;
    // if (frameCount < 2500) {
    //     x++;
    //     y++;
    // }

    if (mouseIsPressed) {
        x = mouseX
        y = mouseY
    }

    // if (x <500){
    //     x++;
    //     x++;
        
    // }
    // if (y <500){
    //     y++;
    //     y++;
    // }

    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    let mouseCoordsStr = "(" + mouseX + "," + mouseY + ")";
    ctx.fillText(mouseCoordsStr, mouseX, mouseY);


    
    // if (x >= 500) {
    //     x = 100;
    //     y = 100;
    // }

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,cnv.width,cnv.height);
    
    requestAnimationFrame(draw)
}

 // Event Listeners & Handlers
 document.addEventListener("mousedown", mousedownHandler);
 document.addEventListener("mouseup", mouseupHandler);
 
 function mousedownHandler() {
     mouseIsPressed = true;
 }
 
 function mouseupHandler() {
     mouseIsPressed = false;
 }

 document.addEventListener("mousemove", mousemoveHandler);

 



 function mousemoveHandler(event) {
     // Get rectangle info about canvas location
     let cnvRect = cnv.getBoundingClientRect(); 
 
     // Calc mouse coordinates using mouse event and canvas location info
     mouseX = Math.round(event.clientX - cnvRect.left);
     mouseY = Math.round(event.clientY - cnvRect.top); 
    }