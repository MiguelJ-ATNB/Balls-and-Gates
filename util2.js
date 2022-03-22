let cnv = document.getElementById("canv");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;

// Position
let x = 100;
let y = 100;
let r = 15;

//Move Variables
let rightMove = false;
let leftMove = false;
let upMove = false;
let downMove = false;
let ballColor = "green";
let sprint = false;
let gamestart = false;


// Gates
let blockspeed = 6;
let grx = 900;
let gry = 600;




requestAnimationFrame(draw)
function draw() {
    //Game Starting
    if(x !== 100 || y !== 100){
        gamestart = true;
    }
    //Move blocks when player moves
         
    if(gamestart){
        grx -= blockspeed;
        if(grx<100 || grx >900){
            blockspeed = -blockspeed
        }
            
    }

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
    //Collision detection
    if(x < 15){
        x = 15;
    }else if (x >985){
        x = 985
    }
    if(y < 15){
        y = 15;
    }else if (y >785){
        y = 785
    }
    //Filling Blank Canv
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);

    //Making the Ball/Circle
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(x , y , r, 0, 2 * Math.PI)
    ctx.fill();
    
    //Draw
    ctx.fillStyle = "green";
    ctx.fillRect(grx, gry, 25, 100);

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
