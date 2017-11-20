// =====
// UTILS
// =====
 function square(x) {
    return x*x;
};
function wrappedDistSq(x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2-x1),
	dy = Math.abs(y2-y1);
    if (dx > xWrap/2) {
	dx = xWrap - dx;
    };
    if (dy > yWrap/2) {
	dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
};
function clearCanvas(ctx) {
  var prevfillStyle = ctx.fillStyle;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = prevfillStyle;
}

function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function fillBox(ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
}
function gameEnd() {
  silfrid.setcurrentTime = 0;
  silfrid.pause();
}

// ===================
// WIN CHECK AND RESET
// ===================

// A win check function that checks all cases
function checkWin(){
      var countDead = 0

          if(g_snakePlayer1.dead === true) countDead = countDead+1
          if(pickedplayers >= 2)
            if(g_snakePlayer2.dead === true) countDead = countDead+1
          if(pickedplayers >= 3)
            if(g_snakePlayer3.dead === true) countDead = countDead+1
          if(pickedplayers === 4)
            if(g_snakePlayer4.dead === true) countDead = countDead+1

        deadPlayers = countDead

        console.log("Dead players: " + deadPlayers + "    Picked players: " + pickedplayers)

          if(deadPlayers === pickedplayers - 1 && pickedplayers > 1){
            silfrid.pause();
            gameOver = true;
            g_snakePlayer1.vel = 0
            g_snakePlayer2.vel = 0
            g_snakePlayer3.vel = 0
            g_snakePlayer4.vel = 0

          if(g_snakePlayer1.dead === false){ 
            winner = "Leikmaður 1"
            winnerCol = g_snakePlayer1.color
          }
          if(pickedplayers >= 2)
            if(g_snakePlayer2.dead === false){
             winner = "Leikmaður 2"
             winnerCol = g_snakePlayer2.color
           }
          if(pickedplayers >= 3)
            if(g_snakePlayer3.dead === false){
             winner = "Leikmaður 3"
             winnerCol = g_snakePlayer3.color
           }
          if(pickedplayers === 4)
            if(g_snakePlayer4.dead === false){
             winner = "Leikmaður 4"
             winnerCol = g_snakePlayer1.color
           }


        }

        if(deadPlayers === pickedplayers && pickedplayers === 1){
          silfrid.pause();
          gameOver = true;
          g_snakePlayer1.vel = 0
          g_snakePlayer2.vel = 0
          g_snakePlayer3.vel = 0
          g_snakePlayer4.vel = 0
        }

        if(deadPlayers === pickedplayers){
          silfrid.pause();
          winner = "     Enginn";
          gameOver = true;
          g_snakePlayer1.vel = 0
          g_snakePlayer2.vel = 0
          g_snakePlayer3.vel = 0
          g_snakePlayer4.vel = 0
        }


}

// A reset function which initializes all values
function gameReset(){

  if(gameOver === true){

  g_snakePlayer1.cx = 50
  g_snakePlayer1.cy = 500
  g_snakePlayer1.dead = false
  g_snakePlayer1.wrap = false
  g_snakePlayer1.dir = 4
  g_snakePlayer1.vel = 4
  g_snakePlayer1.trail = []
  g_snakePlayer1.rTrail = []
  g_snakePlayer1.oldTrails = []
  g_snakePlayer1.particles = []
  g_snakePlayer1.rTrail.startX = g_snakePlayer1.cx;
  g_snakePlayer1.rTrail.startY = g_snakePlayer1.cy;

  g_snakePlayer2.cx = 1150
  g_snakePlayer2.cy = 500
  g_snakePlayer2.dead = false
  g_snakePlayer2.wrap = false
  g_snakePlayer2.dir = 3
  g_snakePlayer2.vel = 4
  g_snakePlayer2.trail = []
  g_snakePlayer2.rTrail = []
  g_snakePlayer2.oldTrails = []
  g_snakePlayer2.particles = []
  g_snakePlayer2.rTrail.startX = g_snakePlayer2.cx;
  g_snakePlayer2.rTrail.startY = g_snakePlayer2.cy;

  g_snakePlayer3.cx = 600
  g_snakePlayer3.cy = 50
  g_snakePlayer3.dead = false
  g_snakePlayer3.wrap = false
  g_snakePlayer3.dir = 2
  g_snakePlayer3.vel = 4
  g_snakePlayer3.trail = []
  g_snakePlayer3.rTrail = []
  g_snakePlayer3.oldTrails = []
  g_snakePlayer3.particles = []
  g_snakePlayer3.rTrail.startX = g_snakePlayer3.cx;
  g_snakePlayer3.rTrail.startY = g_snakePlayer3.cy;

  g_snakePlayer4.cx = 600
  g_snakePlayer4.cy = 950
  g_snakePlayer4.dead = false
  g_snakePlayer4.wrap = false
  g_snakePlayer4.dir = 1
  g_snakePlayer4.vel = 4
  g_snakePlayer4.trail = []
  g_snakePlayer4.rTrail = []
  g_snakePlayer4.oldTrails = []
  g_snakePlayer4.particles = []
  g_snakePlayer4.rTrail.startX = g_snakePlayer4.cx;
  g_snakePlayer4.rTrail.startY = g_snakePlayer4.cy;

  currentPowerUp.cx = 600
  currentPowerUp.cy = 500
  currentPowerUp.type = Math.round(Math.random() * 3)
  currentPowerUp.counter = 0
  currentPowerUp.active = true

  for(var i = 0; i < g_sprites.length; i++)
    g_sprites[i].glow = false;

  start = false;
  picking = false;
  playing = false;
  updateplaying = false;
  numbplayers = 0;
  pickedplayers = 0;
  gameOver = false;
  deadPlayers = 0;
  selectedplayers = [];
  silfrid.currentTime = 0;
  lofsongur.play();

}

}

