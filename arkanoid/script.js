

var GAME = {
    width: 500,
    height: 500,
    background: '#E6E6FA'
}

var MENU_BUTTON = {
    x: 450,
    y: 45,
    radius: 25,
 } 

 var CONTINUE_BUTTON = {
    x: 150,
    y: 150,
    width: 200,
    height: 50,
 }
 
 var RESTART_BUTTON = {
    x: 150,
    y: 710,
    width: 200,
    height: 50,
 }


function myRandom (from,to) {
    return Math.floor((Math.random()*(to-from+1)) + from);
}

var rand = myRandom(26,474);
var rand1 = myRandom(-6,8);
var rand2 = myRandom(5,8);

var BALL = {
    color: "red",
    x: rand,
    y: 80,
    radius: 13,
    out: "black",
    xDirection: rand1,
    yDirection: rand2,
}

var RACKET = {
    color: "gray",
    x: 0,
    y: 450,
    width: 100,
    height: 10,
    xDirection: 5,
    yDirection: 5,
    counter: 0,
}


var ANIMATION = {
    img: new Image(),      
    imgIsLoad: false,      
    
 }
 
 function initAnimation() {
    ANIMATION.img.src = "./img/scr.png"
    ANIMATION.img.onload = () => {
        ANIMATION.imgIsLoad = true;
     }
  
}

function drawAnimation() {
    if (ANIMATION.imgIsLoad) {
        canvasContext.drawImage(ANIMATION.img, 0, 0)
    }
 }

var AUDIO = {
    src: new Audio("./audio/bounce.mp3"),
    /*audioIsOn: true,*/
} 
var AUDIO1 = {
    src: new Audio("./audio/vin.mp3"),
    audio1IsOn: true,
} 
var AUDIO2 = {
    src: new Audio("./audio/end.mp3"),
    audio1IsOn: true,
} 

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");


function drawBall() {
    canvasContext.fillStyle = BALL.color;
    canvasContext.strokeStyle = BALL.out;
    canvasContext.lineWidth = 1;
    canvasContext.beginPath();
    canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.fill();
    canvasContext.stroke();
}
function drawMenuButton() {
    canvasContext.fillStyle = RACKET.color;
    canvasContext.beginPath();
    canvasContext.arc(MENU_BUTTON.x, MENU_BUTTON.y,  MENU_BUTTON.radius, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.fillRect(MENU_BUTTON.x - 8 , MENU_BUTTON.y - 10, 5 ,20)
    canvasContext.fillRect(MENU_BUTTON.x + 3 , MENU_BUTTON.y - 10, 5 ,20)
 }
 /*function drawContinueButton() {
    canvasContext.fillStyle = RACKET.color;
    canvasContext.fillRect(CONTINUE_BUTTON.x, CONTINUE_BUTTON.y, CONTINUE_BUTTON.width, CONTINUE_BUTTON.height);
    canvasContext.fillStyle = "white";
    canvasContext.font = "italic small-caps bold  arial  ";
    canvasContext.fillText("Continue", 160, 190);
    
}
function drawRestartButton() {
   canvasContext.fillStyle = RACKET.color;
   canvasContext.fillRect(RESTART_BUTTON.x, RESTART_BUTTON.y, RESTART_BUTTON.width, RESTART_BUTTON.height);
   canvasContext.fillStyle = "white";
   canvasContext.font = "italic small-caps bold  arial  ";
   canvasContext.fillText("Restart", 180, 250);
   
}*/

/*function drawMenu() {
    drawContinueButton();
    drawRestartButton();
 }*/

/*function isOnMenuButton(event) {
    if (((event.x >= MENU_BUTTON.x - MENU_BUTTON.radius) && (event.x <= MENU_BUTTON.x + MENU_BUTTON.radius)) &&
        ((event.y >= MENU_BUTTON.y - MENU_BUTTON.radius) && (event.y <= MENU_BUTTON.y + MENU_BUTTON.radius))) {
        return true;
    }
 }

function openMenu(event) {
    if (isOnMenuButton(event)) {
        cancelAnimationFrame(drawStatus);
        drawMenu();
    }
}*/
  
function drawRacket() {
    canvasContext.fillStyle = RACKET.color;
    canvasContext.fillRect(RACKET.x, RACKET.y, RACKET.width, RACKET.height);
}
function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}
function drawScore() {
    canvasContext.font = "48px serif";
    canvasContext.fillText("Score: " + RACKET.counter, 10, 50);
}
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawMenuButton();
    drawBall();
    drawRacket();
    drawScore();
}
function FinishDraw() {
    drawAnimation();
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 2;
    canvasContext.font = "bold 70px serif";
    canvasContext.strokeText("VICTORY", 78, 280);
}
function FinishDraw1() {
    drawBackground();
    canvasContext.fillStyle = "black";
    canvasContext.lineWidth = 2;
    canvasContext.font = "bold 60px serif";
    canvasContext.fillText("GAME OVER", 60, 270);
}

function updateBall() {
    BALL.x += BALL.xDirection;
    BALL.y += BALL.yDirection;
    if ( (BALL.y - BALL.radius < 0)) {
        BALL.yDirection = -BALL.yDirection;
    
        AUDIO.src.play()
      
    }
    if ((BALL.x + BALL.radius > GAME.width) || (BALL.x - BALL.radius < 0)) {
        BALL.xDirection = -BALL.xDirection;
       
        AUDIO.src.play()
      
    }
    

    counter1();

}

function jumping() {
    var racketTopLineCollision = BALL.y + BALL.radius > RACKET.y;
    var racketLeftLineCollision = BALL.x + BALL.radius > RACKET.x;
    var racketDownLineCollision = BALL.y - BALL.radius < RACKET.y + RACKET.height;
    var racketRightLineCollision = BALL.x - BALL.radius < RACKET.x + RACKET.width;
    if ((racketTopLineCollision && racketLeftLineCollision) && (racketDownLineCollision && racketRightLineCollision)) {
        BALL.yDirection = -BALL.yDirection - 1.9;
        BALL.xDirection = BALL.xDirection + 1.9;
        AUDIO.src.play()
      
        return true;
    }
  }

function counter1() {
    if (jumping()) {
        RACKET.counter += 1;

        console.log("SCORE ", RACKET.counter)
        drawBall()
    }
}


function finish() {
    if (BALL.y + BALL.radius > GAME.height) {
        FinishDraw1();
        AUDIO2.src.play()
    }
    else if (RACKET.counter > 9) {
        FinishDraw();
        AUDIO1.src.play()
    }
        
      
    else requestAnimationFrame(play) 
    return true;   
    
        
}

function play() {
    drawFrame();
    updateBall();
    finish();
       
}

function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown);
}
function clampRacketPosition() {
    if (RACKET.x < 0) {
        RACKET.x = 0;
    }
    if (RACKET.x + RACKET.width > GAME.width) {
        RACKET.x = GAME.width - RACKET.width;
    }
}
function onCanvasMouseMove(event) {
    RACKET.x = event.clientX;
  
 
    clampRacketPosition();
}
function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        RACKET.x -= RACKET.xDirection -10;
    }
    if (event.key === "ArrowRight") {
        RACKET.x += RACKET.xDirection +10;
    }
    
    clampRacketPosition();
}

initAnimation();
initEventsListeners();
play();
