let cnv = document.getElementById("canv");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;

// Position
let x = 100;
let y = 100;

//Move Variables
let rightMove = false;
let leftMove = false;
let upMove = false;
let downMove = false;
let ballColor = "green";
let sprint = false;

requestAnimationFrame(draw)



//
function draw() {
    //Movement Handler
    let speed = 5;
    if(sprint){
        speed = 7.5;
    }
    if(rightMove){
        x += speed;
        ballColor = "red";
    }else {
        ballColor = "green";
    }
    if(leftMove){
        x -= speed;
        ballColor ="blue";
    }
    if(upMove){
        y -= speed;
        ballColor = "purple";
    }
    if(downMove){
        y += speed;
        ballColor ="yellow";
    }
    //Filling Blank Canv
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);
    //Making the Ball/Circle
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(x , y ,  15, 0 , 2 * Math.PI)
    ctx.fill();
    requestAnimationFrame(draw)
}

document.addEventListener("keydown", MovementHandler)
document.addEventListener("keyup", MoveStopHandler)


function MovementHandler(event){
    
    if(event.code === "ShiftLeft"){
        sprint = true;
    } else if (event.code === "ArrowRight" || event.code === "KeyD"){
        rightMove = true;
    }else if (event.code === "ArrowUp" || event.code === "KeyW"){
        upMove = true;
    }else if (event.code === "ArrowDown" || event.code === "KeyS"){
        downMove = true;
    }else if(event.code === "ArrowLeft" || event.code === "KeyA"){
        leftMove = true;}
    console.log(event.code)
}

function MoveStopHandler(event){

    if(event.code === "ArrowLeft" || event.code === "KeyA"){
        leftMove = false;
    } else if (event.code === "ArrowRight" || event.code === "KeyD"){
        rightMove = false;
    }else if (event.code === "ArrowUp" || event.code === "KeyW"){
        upMove = false;
    }else if (event.code === "ArrowDown" || event.code === "KeyS"){
        downMove = false;
    }else if(event.code === "ShiftLeft"){
        sprint = false;
    }
}
