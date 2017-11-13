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

var picking = false;
var playing = false;
var updateplaying = false;
var gameOver = false;
var deadPlayers = 0;
// GAME-SPECIFIC RENDERING


function renderSimulation(ctx) {

  //g_ball.render(ctx);

  if (picking === false && playing === false) {
    modeManager.render(ctx);
    if(numbplayers > 0 && numbplayers < 5) picking = true;
  }
  if(picking === true && updateplaying === false){
    entityManager.render(ctx);
    //playing = true;
  }
  if (pickedplayers === 1) {
    g_snakePlayer1.render1(ctx);
    playing = true;
  }
  if (pickedplayers === 2 && selectedplayers.length === 2) {
    g_snakePlayer1.render1(ctx);
    g_snakePlayer2.render2(ctx);
    playing = true;
  }
  if (pickedplayers === 3 && selectedplayers.length === 3) {
    g_snakePlayer1.render1(ctx);
    g_snakePlayer2.render2(ctx);
    g_snakePlayer3.render3(ctx);
    playing = true;
  }
  if (pickedplayers >= 4 && selectedplayers.length >= 4) {
    g_snakePlayer1.render1(ctx);
    g_snakePlayer2.render2(ctx);
    g_snakePlayer3.render3(ctx);
    g_snakePlayer4.render4(ctx);
    playing = true;
  }

  if (playing === true) {
    updateplaying = true;
    currentPowerUp.render(ctx);
  };

  if (gameOver === true) {
    ctx.font = "30px Arial";
    ctx.fillText("Game over!",600,600);
    ctx.fillText("Press R to play again.", 600, 800);
  };

};


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
  g_snakePlayer4.rTrail.startX = g_snakePlayer4.cx;
  g_snakePlayer4.rTrail.startY = g_snakePlayer4.cy;

  currentPowerUp.cx = 600
  currentPowerUp.cy = 500
  currentPowerUp.type = Math.round(Math.random() * 3)
  currentPowerUp.counter = 0
  currentPowerUp.active = true

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
