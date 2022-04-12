let cnv = document.getElementById("canv");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;

// Position
let x = 100;
let y = 100;
let r = 15;
let speed = 5;
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
let purp = "purple"
let rblock = true;
let rblockspeed = 14;
let rrx = 600;
let rry = 400;
let rrWidth = 25;
let rrHeight = 75;
let bblock = true;
let bblockspeed = 6;
let brx = 532;
let bry = 600;
let brWidth = 25;
let brHeight = 100;
let yblock = true;
let yblockspeedx = 6;
let yblockspeedy = 6;
let yrx = 400;
let yry = 640;
let yrWidth = 25;
let yrHeight = 100;

// Time stop function
let timeStop = false
let timestop_TL = 100;
    
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
    }else if(event.code === "Space" || event.code === "KeyF"){
        Restart = true;
    }
    if (event.code === "KeyG"){
        timeStop = true;
    }else {
        timeStop = false;
    }
}

function MoveStopHandler(event){

    if(event.code === "ShiftLeft"){
        sprint = false;
    } else if (event.code === "ArrowRight" || event.code === "KeyD"){
        rightMove = false;
    }else if (event.code === "ArrowUp" || event.code === "KeyW"){
        upMove = false;
    }else if (event.code === "ArrowDown" || event.code === "KeyS"){
        downMove = false;
    }else if(event.code === "ArrowLeft" || event.code === "KeyA"){
        leftMove = false;
    }else if(event.code === "Space" || event.code === "KeyF"){
        Restart = false;
    }
}

requestAnimationFrame(draw)

function draw() {
    if(gamestate === "startup"){
        startscreen();
    }else if(gamestate === "lvl1" || gamestate === "lvl1R" ){
        lvl1();    //Matthew changed it to Sad 2 at one point
    }else if(gamestate === "lvl2" || gamestate === "lvl2R" ){
        lvl2();
    }else if(gamestate === "gameWon1"){
        gameWinl1();
    }else if(gamestate === "gameWon2"){
        gameWinl2();
    }else if(gamestate === "gameOver"){
        gameOver();
    }
    

function startscreen(){
    //Filling Blank Canv
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("Press the Arrowkeys or WASD to start game", 200,400)

    if(rightMove || leftMove || upMove || downMove){
        gamestate = "lvl1"
    }
    requestAnimationFrame(draw)
}

function gameOver(){
    //Clear screen
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);
    //Display game over
    ctx.font = "50px Arial"
    ctx.fillStyle = "Red"
    ctx.fillText("GAME OVER", 350, 400)
    
    ctx.font = "15px Arial"
    ctx.fillStyle = "Red"
    ctx.fillText("Press Space to Continue", 425, 415)
    
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(x , y , r, 0, 2 * Math.PI)
    ctx.fill();
    
    //Reset X/Y 
    x = 100
    y = 100

    if(Restart){
        gamestate ="startup"
    }
    requestAnimationFrame(draw)
}

function lvl1(){
    //Filling Blank Canv
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);

    //Loading positions:
    if(gamestate === "lvl1"){  
        //Reset the values
        gblock = true;
        gblockspeed = 6;
        grx = 900;
        gry = 600;
        grWidth = 25;
        grHeight = 100;
        pblock = true;
        pblockspeed = 6;
        prx = 500;
        pry = 500;
        prWidth = 100;
        prHeight = 25;
        purp = "purple"
        rblock = true;
        rblockspeed = 14;
        rrx = 600;
        rry = 400;
        rrWidth = 25;
        rrHeight = 75;
        bblock = true;
        bblockspeed = 6;
        brx = 532;
        bry = 600;
        brWidth = 25;
        brHeight = 100;
        yblock = true;
        yblockspeed = 6;
        yrx = 400;
        yry = 640;
        yrWidth = 25;
        yrHeight = 100;
        gamestate = "lvl1R"
    }

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
        }
        rrx -= rblockspeed
        if(rrx<100 || rrx>900){
            rblockspeed  = -rblockspeed
        }   
    }

    //Movement Handler
    if(sprint){
        speed = 7.5;
    }else{
        speed = 5;
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
    }else if(x>grx && x < grx+grWidth && y >gry && y < gry+grHeight && ballColor !=="green"){
        gamestate = "gameOver"
    } 
    if(x>rrx && x < rrx+rrWidth && y >rry && y < rry+rrHeight && ballColor === "red"){
        rblock = false;    
    }else if(x>rrx && x < rrx+rrWidth && y >rry && y < rry+rrHeight && ballColor !=="red"){
        gamestate = "gameOver"
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
        ctx.fillStyle = purp;
        ctx.fillRect(prx, pry, prWidth, prHeight)
    }else{
        prWidth = 0;
        prHeight = 0;
    }
    if(rblock){
        ctx.fillStyle = "red";
        ctx.fillRect(rrx, rry, rrWidth, rrHeight)
    }else{
        rrWidth = 0;
        rrHeight = 0;
    }

    // if(bblock){}

    // if(yblock){}

    //Making the Ball/Circle
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(x , y , r, 0, 2 * Math.PI)
    ctx.fill();
    
    "The man, the light, and the moon"

    //How to Win the game

    if(grHeight === 0 && grWidth === 0 && prHeight === 0 && prWidth === 0 && rrHeight === 0 && rrWidth === 0){
        gamestate = "gameWon1"
    }

    requestAnimationFrame(draw)
}

function gameWinl1(){
    //Clear screen
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);
    //Display game won
    ctx.font = "50px Arial"
    ctx.fillStyle = "White"
    ctx.fillText("WINNER", 395, 400)

    ctx.font = "15px Arial"
    ctx.fillStyle = "White"
    ctx.fillText("Press F to go to the next stage", 395, 415)
  
    if(Restart){
        gamestate ="lvl2"
    } 
    gamestart = false;
    requestAnimationFrame(draw)
}

function lvl2(){
    //Filling Blank Canv
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);
    
    //Game Starting
    if(x === 100 && y === 100){
        gamestart = false;
    }else if(timeStop && timestop_TL > 0 ){
        gamestart = false;
        timestop_TL--
    }else if (x !== 100 || y !== 100){
        gamestart = true;
    }
    let TSL = timestop_TL;
    document.getElementById("timestop").innerHTML = TSL;
    document.getElementById("hidden").style.display = "block"
    if(gamestate === "lvl2"){
        //Set the values for the stage
        x = 100;
        y = 100;
        gblock = true;
        grx = 300;
        gry = 200;
        grWidth = 25;
        grHeight = 100;
        pblock = true;
        prx = 100;
        pry = 500;
        prWidth = 100;
        prHeight = 25;
        rblock = true;
        rrx = 300;
        rry = 400;
        rrWidth = 25;
        rrHeight = 75;
        bblock = true;
        brx = 532;
        bry = 600;
        brWidth = 25;
        brHeight = 100;
        yblock = true;
        yrx = 400;
        yry = 640;
        yrWidth = 25;
        yrHeight = 100;
        timestop_TL = 100;
        gamestate = "lvl2R";
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
        rrx -= rblockspeed
        if(rrx<100 || rrx>900){
            rblockspeed  = -rblockspeed
        };
        yrx += yblockspeedx;
        yry += yblockspeedy;
        if(yrx <= 200 || yrx >= 700){
            yblockspeedx = -yblockspeedx;
        }else if (yry >= 640 || yry <= 100){
            yblockspeedy = -yblockspeedy;
        };  
        bry += bblockspeed;
        if(bry >= 640 || bry <= 100){
            bblockspeed = -bblockspeed;
        };
    }

    //Movement Handler

    if(sprint){
        speed = 7.5;
    }else{
        speed = 5;
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

    //Keeping it in the box
    if(x < r){
        x = r;
    }else if (x  > cnv.width - r){
        x = cnv.width - r;
    }
    if(y < r){
        y = r;
    }else if (y > cnv.height - r){
        y = cnv.height - r;
    }

    //GATE DETECTION
    if(x>prx && x < prx+prWidth && y >pry && y < pry+prHeight && ballColor ==="purple"){
        pblock = false;    
    }else if(x>prx && x < prx+prWidth && y >pry && y < pry+prHeight){
        gamestate = "gameOver"
    }
    if(x>grx && x < grx+grWidth && y >gry && y < gry+grHeight && ballColor ==="green"){
        gblock = false;    
    }else if(x>grx && x < grx+grWidth && y >gry && y < gry+grHeight){
        gamestate = "gameOver"
    } 
    if(x>rrx && x < rrx+rrWidth && y >rry && y < rry+rrHeight && ballColor === "red"){
        rblock = false;    
    }else if(x>rrx && x < rrx+rrWidth && y >rry && y < rry+rrHeight){
        gamestate = "gameOver"
    }
    if(x>brx && x < brx+brWidth && y >bry && y < bry+brHeight && ballColor === "blue"){
        bblock = false;    
    }else if(x>brx && x < brx+brWidth && y >bry && y < bry+brHeight){
        gamestate = "gameOver"
    }
    if(x>yrx && x < yrx+yrWidth && y > yry && y < yry+yrHeight && ballColor === "yellow"){
        yblock = false;    
    }else if(x>yrx && x < yrx+yrWidth && y > yry && y < yry+yrHeight){
        gamestate = "gameOver"
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
        ctx.fillStyle = purp;
        ctx.fillRect(prx, pry, prWidth, prHeight)
    }else{
        prWidth = 0;
        prHeight = 0;
    }
    if(rblock){
        ctx.fillStyle = "red";
        ctx.fillRect(rrx, rry, rrWidth, rrHeight)
    }else{
        rrWidth = 0;
        rrHeight = 0;
    }
    if(bblock){
        ctx.fillStyle = "blue";
        ctx.fillRect(brx, bry, brWidth, brHeight)
    }else{
        brWidth = 0;
        brHeight = 0;
    }
    if(yblock){
        ctx.fillStyle = "yellow";
        ctx.fillRect(yrx, yry, yrWidth, yrHeight)
    }else{
        yrWidth = 0;
        yrHeight = 0;
    }

    //Making the Ball/Circle
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(x , y , r, 0, 2 * Math.PI)
    ctx.fill();

    ctx.font = "10px Arial"
    ctx.fillStyle = "White"
    ctx.fillText("G to Stop time", 10 , 15)

    "The man, the light, and the moon"
    
    //How to Win the game
    if(grHeight === 0 && grWidth === 0 && prHeight === 0 && prWidth === 0 && rrHeight === 0 && rrWidth === 0 && yrHeight === 0 && yrWidth === 0 && brHeight === 0 && brWidth === 0){
        gamestate = "gameWon2"
    }

    requestAnimationFrame(draw)
}

function gameWinl2(){
    //Clear screen
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);
    //Display game won
    ctx.font = "50px Arial"
    ctx.fillStyle = "White"
    ctx.fillText("WINNER", 395, 400)

    ctx.font = "15px Arial"
    ctx.fillStyle = "White"
    ctx.fillText("Press F to go to the next stage", 395, 415)
  
    if(Restart){
        gamestate ="lvl3"
    } 
    gamestart = false;
    requestAnimationFrame(draw)    
}
}