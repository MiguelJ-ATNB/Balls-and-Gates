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
//Game Variables
let gamestart = false;
let gamestate = "lvl3"
let Restart = false;
// gates
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

//Movement Functions I stole from albert. 
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

//GAME GOES brrrrrrrrrrr

requestAnimationFrame(draw)
function draw() {
    if(gamestate === "startup"){
        startscreen();
    }else if(gamestate === "lvl1" || gamestate === "lvl1R" || gamestate === "lvl2" || gamestate === "lvl2R" || gamestate === "lvl3" || gamestate === "lvl3R"){
        game();    //Matthew changed it to Sad 2 at one point
    }else if(gamestate === "gameWon1" || gamestate === "gameWon2" || gamestate === "gameWon3"){
        gameWon();
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
    
    

    if(Restart){
        gamestate ="startup"
    }
    requestAnimationFrame(draw)
}

function game(){
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
    if(gamestate === "lvl1" ||gamestate === "lvl1R"){
        document.getElementById("hidden").style.display = "none"
    }else if (gamestate === "lvl2" || gamestate === "lvl3" || gamestate === "lvl2R" || gamestate === "lvl3R"){
        document.getElementById("timestop").innerHTML = TSL;
        document.getElementById("hidden").style.display = "block"
    }
    
    //Loading positions:
    if(gamestate === "lvl1"){  
        //Reset the values
        x = 100
        y = 100
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
        rblock = true;
        rblockspeed = 14;
        rrx = 600;
        rry = 400;
        rrWidth = 25;
        rrHeight = 75;
        bblock = true;
        bblockspeed = 6;
        brx = 0;
        bry = 0;
        brWidth = 0;
        brHeight = 0;
        yblock = true;
        yblockspeedx = 6;
        yblockspeedy = 6;
        yrx = 0;
        yry = 0;
        yrWidth = 0;
        yrHeight = 0;
        gamestate = "lvl1R"
    }else if(gamestate === "lvl2"){
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
    }else if(gamestate === "lvl3"){
        //Set the values for the stage
        x = 100;
        y = 100;
        gblock = true;
        grx = 800;
        gry = 300;
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
        yry = 340;
        yblockspeedx = 8;
        yblockspeedy = 9;
        if(Math.random()<0.5){
            yblockspeedx = -yblockspeedx
        }else{
            yblockspeedx = yblockspeedx
        }if(Math.random()<0.5){
            yblockspeedy = -yblockspeedy
        }else{
            yblockspeedy = yblockspeedy
        }
        yrWidth = 25;
        yrHeight = 100;
        timestop_TL = 250;
        gamestate = "lvl3R";
    } 

    
    //Move blocks when player moves
         
    if(gamestart && gamestate === "lvl1R"){
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
    }else if(gamestart && gamestate === "lvl2R"){
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
        yrx -= yblockspeedx;
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
    }else if(gamestart && gamestate === "lvl3R"){
        let randNum = Math.random();
        grx -= gblockspeed;
        if(grx<100 || grx >900){
            gblockspeed = -gblockspeed;
        };
        pry -= pblockspeed;
        if(pry<100 || pry>550){
            pblockspeed = -pblockspeed;
            if(prx < 790){
                prx += 30
            }else {
                prx = 100
            }
        };
        rrx -= rblockspeed
        if(rrx< 0){
            rrx = cnv.width - rrWidth
        };
        yrx += yblockspeedx;
        yry += yblockspeedy;
        if(yrx <= 0 || yrx >= cnv.width - 25){
        yblockspeedx = -yblockspeedx;
        }else if (yry >= cnv.height - 100 || yry <= 0){
        yblockspeedy = -yblockspeedy;
        };
        bry += bblockspeed;
        if(bry >= cnv.height - brHeight || bry <= 0){
            if(randNum > 0.5){
                bblockspeed = -bblockspeed;
            }else if(bry <=0){
                bry = cnv.height - brHeight
            }else if(bry >= cnv.height - brHeight){
                bry = 0
            }
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
    if(x < r){
        x = r;
    }else if (x > cnv.width - r){
        x = cnv.width - r
    }
    if(y < r){
        y = r;
    }else if (y >cnv.height - r){
        y = cnv.height - r
    }
    
    //GATE DETECTION
    if(x+r >prx && x-r <prx+prWidth && y+r >pry && y-r <pry+prHeight && ballColor ==="purple"){
        pblock = false;    
    }else if(x+r >prx && x-r <prx+prWidth && y+r >pry && y-r <pry+prHeight){
        gamestate = "gameOver"
    }
    if(x+r >grx && x-r <grx+grWidth && y+r >gry && y-r <gry+grHeight && ballColor ==="green"){
        gblock = false;    
    }else if(x+r >grx && x-r <grx+grWidth && y+r >gry && y-r <gry+grHeight){
        gamestate = "gameOver"
    } 
    if(x+r >rrx && x-r <rrx+rrWidth && y+r >rry && y-r <rry+rrHeight && ballColor === "red"){
        rblock = false;    
    }else if(x+r >rrx && x-r <rrx+rrWidth && y+r >rry && y-r <rry+rrHeight){
        gamestate = "gameOver"
    }
    if(x+r >brx && x-r <brx+brWidth && y+r >bry && y-r <bry+brHeight && ballColor === "blue"){
        bblock = false;    
    }else if(x+r >brx && x-r <brx+brWidth && y+r >bry && y-r <bry+brHeight){
        gamestate = "gameOver"
    }
    if(x+r >yrx && x-r <yrx+yrWidth && y+r >yry && y-r <yry+yrHeight && ballColor === "yellow"){
        yblock = false;    
    }else if(x+r >prx && x-r <prx+prWidth && y+r >pry && y-r <yry+prHeight){
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
    }if(yblock){
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
    
    "The man, the light, and the moon"

    //How to Win the game

    if(grHeight === 0 && grWidth === 0 && prHeight === 0 && prWidth === 0 && rrHeight === 0 && rrWidth === 0 && yrHeight === 0 && yrWidth === 0 && brHeight === 0 && brWidth === 0 && gamestate === "lvl1R"){
        gamestate = "gameWon1"
    }else if(grHeight === 0 && grWidth === 0 && prHeight === 0 && prWidth === 0 && rrHeight === 0 && rrWidth === 0 && yrHeight === 0 && yrWidth === 0 && brHeight === 0 && brWidth === 0 && gamestate === "lvl2R"){
        gamestate = "gameWon2"
    }else if(grHeight === 0 && grWidth === 0 && prHeight === 0 && prWidth === 0 && rrHeight === 0 && rrWidth === 0 && yrHeight === 0 && yrWidth === 0 && brHeight === 0 && brWidth === 0 && gamestate === "lvl3R"){
        gamestate = "gameWon3"
    }

    requestAnimationFrame(draw)
}

function gameWon(){
    //Clear screen
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);
    if(gamestate === "gameWon3"){
        //Display game won
        ctx.font = "50px Arial"
        ctx.fillStyle = "White"
        ctx.fillText("You beat my game!", 295, 400)
        
        ctx.font = "15px Arial"
        ctx.fillStyle = "White"
        ctx.fillText("Good stuff, took me way too long to code this", 285, 425)
    }else{
        //Display game won
        ctx.font = "50px Arial"
        ctx.fillStyle = "White"
        ctx.fillText("WINNER", 395, 400)

        ctx.font = "15px Arial"
        ctx.fillStyle = "White"
        ctx.fillText("Press F to go to the next stage", 395, 415)
    }

    if(Restart && gamestate === "gameWon1"){
        gamestate = "lvl2"
    } else if (Restart && gamestate === "gameWon2"){
        gamestate = "lvl3"
    }
    gamestart = false;
    requestAnimationFrame(draw)
}
}