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
let gamestate = "startup"
let Restart = false;
// Gates
let gblock = true;
let gblockspeed = 6;
let grx = 900;
let gry = 600;
let grWidth = 25;
let grHeight = 100;
let pblock = true;
let pblockspeed = 6;
let prx = 500;
let pry = 500;
let prWidth = 100;
let prHeight = 25;


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
        leftMove = true;
    }else if(event.code === "Space"){
        Restart = true;
    }
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
    }else if(event.code === "Space"){
        Restart = false;
    }
}

requestAnimationFrame(draw)


function draw() {
    if(gamestate === "startup"){
        startscreen();
    }else if(gamestate === "gameOn"){
        gamescreen();
    }else if(gamestate === "gameOver"){
        gameOver();
    }
}

function startscreen(){
    //Filling Blank Canv
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("Press the Arrowkeys or WASD to start game", 200,400)

    if(rightMove || leftMove || upMove || downMove){
        gamestate = "gameOn"
    }
    requestAnimationFrame(draw)
}

function gamescreen(){
    //Filling Blank Canv
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);

    //Game Starting
    if(x !== 100 || y !== 100){
        gamestart = true;
    }
    //Move blocks when player moves
         
    if(gamestart){
        grx -= gblockspeed;
        if(grx<100 || grx >900){
            gblockspeed = -gblockspeed;
        };
        pry -= pblockspeed;
        if(pry<100 || pry>550){
            pblockspeed = -pblockspeed;
        };
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

    //Collision detection //NOT REALLY
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
    
    //GATE DETECTION
    if(x>prx && x < prx+prWidth && y >pry && y < pry+prHeight && ballColor ==="purple"){
        pblock = false;    
    }else if(x>prx && x < prx+prWidth && y >pry && y < pry+prHeight && ballColor !=="purple"){
        gamestate = "gameOver"
    }
    if(x>grx && x < grx+grWidth && y >gry && y < gry+grHeight && ballColor ==="green"){
        gblock = false;    
    }
    


    

    //Draw the Gates
    if(gblock){
        ctx.fillStyle = "green";
        ctx.fillRect(grx, gry, grWidth, grHeight);
    }else{
        grWidth = 0;
        grHeight = 0;
    }

    if(pblock){ 
        ctx.fillStyle = "purple";
        ctx.fillRect(prx, pry, prWidth, prHeight)
    }else{
        prWidth = 0;
        prHeight = 0;
    }

    
    //Making the Ball/Circle
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(x , y , r, 0, 2 * Math.PI)
    ctx.fill();
    
    "The man, the light, and the moon"

    
    requestAnimationFrame(draw)
}

function gameOver(){

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);


    ctx.font = "50px Arial"
    ctx.fillStyle = "Red"
    ctx.fillText("GAME OVER", 350, 400)
    
    ctx.font = "15px Arial"
    ctx.fillStyle = "Red"
    ctx.fillText("Press Space to Continue", 425, 415)


    ctx.fillStyle = "green";
    ctx.fillRect(900,600, 25, 100);
    
    ctx.fillStyle = "purple";
    ctx.fillRect(prx, pry, prWidth, prHeight)
    
    
    //Making the Ball/Circle
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(x , y , r, 0, 2 * Math.PI)
    ctx.fill();
    

    if(Restart){
        gamestate ="startup"
    }
    requestAnimationFrame(draw)
}