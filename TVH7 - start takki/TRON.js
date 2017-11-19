// "Crappy PONG" -- step by step
//
// Step 13: Simplify
/*
Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.
I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...
The "MAINLOOP" code, inside g_main, is much simplified as a result.
*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
// private variables for the boys.
/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ============
// PADDLE STUFF
// ============

// Player 1

var KEY_W = 'W'.charCodeAt(0);
var KEY_S = 'S'.charCodeAt(0);
var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);

var g_snakePlayer1 = new Snake({
  number: 1,
  cx: 50,
  cy: 500,
  dead: false,
  wrap: false,
  dir: 4,
  vel: 4,
  trail: [],
  rTrail: [],
  oldTrails: [],
  color: '#00FFFF',

  //Movement
  GO_UP: KEY_W,
  GO_DOWN: KEY_S,
  GO_LEFT: KEY_A,
  GO_RIGHT: KEY_D,
});

// Player 2

var KEY_I = 'I'.charCodeAt(0);
var KEY_K = 'K'.charCodeAt(0);
var KEY_J = 'J'.charCodeAt(0);
var KEY_L = 'L'.charCodeAt(0);

var g_snakePlayer2 = new Snake({
  number: 2,
  cx: 1150,
  cy: 500,
  dead: false,
  wrap: false,
  dir: 3,
  vel: 4,
  trail: [],
  rTrail: [],
  oldTrails: [],
  color: '#00FF00',

  //Movement Reversed due to speed beeing negative
  GO_UP: KEY_I,
  GO_DOWN: KEY_K,
  GO_LEFT: KEY_J,
  GO_RIGHT: KEY_L,
});
//player 3
var KEY_UP = 38; //up arrow key
var KEY_DOWN = 40; // down arrow key
var KEY_LEFT = 37; //left arrow key
var KEY_RIGHT = 39; // right arrow key

var g_snakePlayer3 = new Snake({
  number: 3,
  cx: 600,
  cy: 50,
  dead: false,
  wrap: false,
  dir: 2,
  vel: 4,
  trail: [],
  rTrail: [],
  oldTrails: [],
  color: 'red',

  GO_UP: KEY_UP,
  GO_DOWN: KEY_DOWN,
  GO_LEFT: KEY_LEFT,
  GO_RIGHT: KEY_RIGHT,
});

var KEY_UP_8 = 104; //numpad 8 key
var KEY_DOWN_5 = 101; // numpad 5 key
var KEY_LEFT_4 = 100; // numpad 4 key
var KEY_RIGHT_6 = 102; // numpad 6 key

//player 4
var g_snakePlayer4 = new Snake({
  number: 4,
  cx: 600,
  cy: 950,
  dead: false,
  wrap: false,
  dir: 1,
  vel: 4,
  trail: [],
  rTrail: [],
  oldTrails: [],
  color: 'purple',


  GO_UP: KEY_UP_8,
  GO_DOWN: KEY_DOWN_5,
  GO_LEFT: KEY_LEFT_4,
  GO_RIGHT: KEY_RIGHT_6,
});
//================
// POWERUPS
//================
var currentPowerUp = new powerUp({
  cx: 600,
  cy: 500,
  type: Math.round(Math.random() * 3),
  counter: 0,
  active: true

});

// =============
// GATHER INPUTS
// =============



// =================
// ALLT FRÁ menuENTITIES
// =================
var startingSoundEffects = [
  new Audio('sounds/intro-bjarni-ben.wav'),
  new Audio('sounds/intro-gudlaugur.wav'),
  new Audio('sounds/intro-katrin-jak.wav'),
  new Audio('sounds/intro-sigmundur-D.wav'),
  new Audio('sounds/intro-helgi-hrafn.wav'),
  new Audio('sounds/intro-logi-einarsson.wav'),
  new Audio('sounds/intro-siggi-ingi.wav'),
  new Audio('sounds/intro-þorgerður-kat.wav')
];
var endingSoundEffects = [
  new Audio('sounds/outro-bjarni-ben.wav'),
  new Audio('sounds/outro-gudlaugur.wav'),
  new Audio('sounds/outro-katrin-jak.wav'),
  new Audio('sounds/outro-sigmundur-D.wav'),
  new Audio('sounds/outro-helgi-hrafn.wav'),
  new Audio('sounds/outro-logi-einarsson.wav'),
  new Audio('sounds/outro-siggi-ingi1.wav'),
  new Audio('sounds/outro-þorgerður-kat.wav')
];
var silfrid = new Audio('sounds/silfuregils.wav');
//var tap = new Audio('sounds/intro.mp3');
//var taplag = new Audio('sounds/intro.mp3');
//var taptal = new Audio('sounds/intro.mp3');
//g_canvas.fillStyle = "black";
modeManager.createmodeManager();
entityManager.createMenu();

function gatherInputs() {
  //ónotað gums frá pat
}
var g_images = {};


function requestPreloads() {

  var requiredImages = {
    bjarni: "myndir/betriUnits/unit_bjarni_ben.png",
    gudlaugur: "myndir/betriUnits/unit_gudlaugur_thor.png",
    katrin: "myndir/betriUnits/unit_katrin_jak.png",
    simmi: "myndir/betriUnits/unit_simmi_d.png",
    helgi: "myndir/betriUnits/unit-helgi-hrafn.png",
    logi: "myndir/betriUnits/unit-logi-einarsson.png",
    siggi: "myndir/betriUnits/unit-siggi-ingi.png",
    thorgerdur: "myndir/betriUnits/unit-thorgerdur-kat.png",

    clear: "resizeImageFolder/PowUpClearReSize.png",
    althingi: "resizeImageFolder/resizeAlthingi.png",
    cash: "resizeImageFolder/resizeCashMáney.png",
    guardian: "resizeImageFolder/resizeGuardian.png",
    stundin: "resizeImageFolder/resizestundin.png",
    wikileaks: "resizeImageFolder/resizewikileaks.png"
  };

  imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = [];
var p_sprites = [];

function preloadDone() {

  g_sprites.push(new Sprite(g_images.bjarni));
  g_sprites.push(new Sprite(g_images.gudlaugur));
  g_sprites.push(new Sprite(g_images.katrin));
  g_sprites.push(new Sprite(g_images.simmi));
  g_sprites.push(new Sprite(g_images.helgi));
  g_sprites.push(new Sprite(g_images.logi));
  g_sprites.push(new Sprite(g_images.siggi));
  g_sprites.push(new Sprite(g_images.thorgerdur));


  p_sprites.push(new Sprite(g_images.clear));
  p_sprites.push(new Sprite(g_images.althingi));
  p_sprites.push(new Sprite(g_images.cash));
  p_sprites.push(new Sprite(g_images.guardian));
  p_sprites.push(new Sprite(g_images.stundin));
  p_sprites.push(new Sprite(g_images.wikileaks));

  //g_main.init();
}




// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
  //g_ball.update(du);
  if (updateplaying === true && gameOver === false) {
    if (pickedplayers === 1) {
      g_snakePlayer1.update(du);
    }
    if (pickedplayers === 2) {
      g_snakePlayer1.update(du);
      g_snakePlayer2.update(du);
    }
    if (pickedplayers === 3) {
      g_snakePlayer1.update(du);
      g_snakePlayer2.update(du);
      g_snakePlayer3.update(du);
    }
    if (pickedplayers === 4) {
      g_snakePlayer1.update(du);
      g_snakePlayer2.update(du);
      g_snakePlayer3.update(du);
      g_snakePlayer4.update(du);
    }
    checkWin();
    currentPowerUp.update(du);
    checkAll(pickedplayers);
    //console.log("þú hefur kallað á þetta fall");
  };
}



// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`

var flag = 0;
var picking = false;
var playing = false;
var updateplaying = false;
var gameOver = false;
var deadPlayers = 0;
var winner = "     Enginn";
var start = false;
var info = false;
var tilBaka = false;

// GAME-SPECIFIC RENDERING

var background = new Image();
background.src = "resizeImageFolder/grid.jpg";

background.onload = function(ctx){
    ctx.drawImage(background,0,0);
}

function renderSimulation(ctx) {
  if(playing === true) background.onload(ctx);


  if (picking === false && playing === false) {
    modeManager.render(ctx);
    if(numbplayers > 0 && numbplayers < 5) picking = true;
  }


  //leikreglur
  if (info===true && playing === false) {
    //clearum canvasið
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;;
    ctx.stroke();

    //bakgrunnnur
    var background1 = new Image();
    background1.src = "resizeImageFolder/FPBG.jpg";
    ctx.drawImage(background1,0,0);

    //header
    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.font = "bold 90px Bungee Shade";
    ctx.fillText("Leikreglur!", 200, 250);
    ctx.stroke();

    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.font = "bold 50px Bungee Shade";
    ctx.fillText("POWER UPS:", 400, 320);
    ctx.stroke();

    //myndir af powerups og texti
    //BOOM
    var power1 = new Image();
    power1.src = "resizeImageFolder/PowUpClearReSize.png"
    ctx.drawImage(power1,300,350, 50, 50);
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 20px Bungee Shade";
    ctx.fillText("Slóð óvina hverfur", 390, 380);
    ctx.stroke();

    //Althingi
    var power2 = new Image();
    power2.src = "resizeImageFolder/resizeAlthingi.png"
    ctx.drawImage(power2,300,420, 50, 50);
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 20px Bungee Shade";
    ctx.fillText("Leikmaður fer hraðar en óvinur", 390, 450);
    ctx.stroke();

    //Cash
    var power3 = new Image();
    power3.src = "resizeImageFolder/resizeCashMáney.png"
    ctx.drawImage(power3,300,490, 50, 50);
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 20px Bungee Shade";
    ctx.fillText("Óvinur fer hægar en Leikmaður", 390, 520);
    ctx.stroke();

    //Guardian
    var power4 = new Image();
    power4.src = "resizeImageFolder/resizeGuardian.png"
    ctx.drawImage(power4,300,560, 50, 50);
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 20px Bungee Shade";
    ctx.fillText("Leikmaður getur farið í gegnum ytri veggi", 390,590);
    ctx.stroke();


    //leikmaður 1
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 30px Bungee Shade";
    ctx.fillText("Leikmaður 1 ", 20, 700);
    ctx.fillText("W ", 130,750);
    ctx.fillText("A ", 80,800);
    ctx.fillText("S ", 130,800);
    ctx.fillText("D ", 180, 800);
    ctx.shadowBlur = 0;
    ctx.stroke();

    //leikmaður 2
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 30px Bungee Shade";
    ctx.fillText("Leikmaður 2 ", 320, 700);
    ctx.fillText("🡩 ", 430,750);
    ctx.fillText("🡨 ", 370,800);
    ctx.fillText("🡫 ", 430,800);
    ctx.fillText("🡪 ", 490, 800);
    ctx.shadowBlur = 0;
    ctx.stroke();

    //leikmaður 3
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 30px Bungee Shade";
    ctx.fillText("Leikmaður 3 ", 620, 700)
    ctx.fillText("I ", 730,750);
    ctx.fillText("J ", 670,800);
    ctx.fillText("K ", 730,800);
    ctx.fillText("L ", 790, 800);
    ctx.shadowBlur = 0;
    ctx.stroke();

    //leikmaður 4
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 30px Bungee Shade";
    ctx.fillText("Leikmaður 4 ", 920, 700)
    ctx.fillText("8 ", 1030,750);
    ctx.fillText("4 ", 970,800);
    ctx.fillText("5 ", 1030,800);
    ctx.fillText("6 ", 1090, 800);
    ctx.shadowBlur = 0;
    ctx.stroke();

    //Til Baka takki
    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.fillRect(475,850,285,80);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(480,855,275,70);
    ctx.stroke();
    ctx.shadowBlur = 50;
    ctx.shadowColor = "yellow";
    ctx.fillStyle = "yellow";
    ctx.font = "bold 40px Bungee Shade";
    ctx.fillText("Til baka ", 500, 900)
    ctx.shadowBlur = 0;
    ctx.stroke();
  }

  if (picking === false && tilBaka === true && playing === false && info === false) {
    modeManager.render(ctx);
    if(numbplayers > 0 && numbplayers < 5) picking = true;
  }

  if(picking === true && updateplaying === false && start === false && info === false){
    entityManager.render(ctx);
    //playing = true;
  }

  if (pickedplayers === 1) {
    playing = true;
    g_snakePlayer1.render1(ctx);
    picking = false;
  }

  if (pickedplayers === 2 && selectedplayers.length === 2) {
    playing = true;
    g_snakePlayer1.render1(ctx);
    g_snakePlayer2.render2(ctx);
    picking = false;
  }
  if (pickedplayers === 3 && selectedplayers.length === 3) {
    playing = true;
    g_snakePlayer1.render1(ctx);
    g_snakePlayer2.render2(ctx);
    g_snakePlayer3.render3(ctx);
    picking = false;
  }
  if (pickedplayers >= 4 && selectedplayers.length >= 4) {
    playing = true;
    g_snakePlayer1.render1(ctx);
    g_snakePlayer2.render2(ctx);
    g_snakePlayer3.render3(ctx);
    g_snakePlayer4.render4(ctx);
    picking = false;
  }


  if (playing === true && updateplaying === false && start === false) {
    //if(pickedplayers ===1) start = false;
    //playing = false
    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.fillRect(400,170,400,130);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(405,175,390,120);
    ctx.stroke();
    ctx.fillStyle = "#72EAE7";
    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.font = "bold 45px Bungee Shade";
    ctx.fillText("Hefja leik! ", 425, 250)
    ctx.shadowBlur = 0;

    //start = true
  };
  if(start === true){
    updateplaying = true;
    ctx.shadowBlur = 50;
    ctx.shadowColor = "white";
    currentPowerUp.render(ctx);
    ctx.shadowBlur = 0;
  }

  if (gameOver === true) {
    ctx.shadowBlur = 50;
    ctx.shadowColor = "white";
    ctx.font = "bold 60px Bungee Shade";
    ctx.fillStyle = "white";
    ctx.fillText("Leik lokið!",340,300);
    ctx.fillText(winner, 140, 500);
    ctx.fillText("vinnur!", 690, 500);
    ctx.fillText("Ýttu á R til að spila aftur", 35, 700);
    ctx.shadowBlur = 0;

  };

};

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
            gameOver = true;
            g_snakePlayer1.vel = 0
            g_snakePlayer2.vel = 0
            g_snakePlayer3.vel = 0
            g_snakePlayer4.vel = 0

          if(g_snakePlayer1.dead === false) winner = "Leikmaður 1"
          if(pickedplayers >= 2)
            if(g_snakePlayer2.dead === false) winner = "Leikmaður 2"
          if(pickedplayers >= 3)
            if(g_snakePlayer3.dead === false) winner = "Leikmaður 3"
          if(pickedplayers === 4)
            if(g_snakePlayer4.dead === false) winner = "Leikmaður 4"


        }

        if(deadPlayers === pickedplayers && pickedplayers === 1){
          gameOver = true;
          g_snakePlayer1.vel = 0
          g_snakePlayer2.vel = 0
          g_snakePlayer3.vel = 0
          g_snakePlayer4.vel = 0
        }

        if(deadPlayers === pickedplayers){
          winner = "     Enginn";
          gameOver = true;
          g_snakePlayer1.vel = 0
          g_snakePlayer2.vel = 0
          g_snakePlayer3.vel = 0
          g_snakePlayer4.vel = 0
        }


}

function gameReset(){

  if(gameOver === true){

  //g_isUpdatePaused = true;

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

}

}

// Kick it off
g_main.init();

requestPreloads();