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
// PLAYER STUFF
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


//===========
//botAI
//===========
var g_botPlayer1 = new botAI({
  number: 5,
  cx: 950,
  cy: 500,
  dead: false,
  wrap: false,
  dir: 3,
  vel: 4,
  trail: [],
  rTrail: [],
  oldTrails: [],
  color: 'white'
})


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


// =================
// AUDIO STUFF
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
var silfrid = new Audio('sounds/island.wav');
var lofsongur = new Audio('sounds/lofsongur.wav');
modeManager.createmodeManager();
entityManager.createMenu();



// ============
// IMAGE STUFF
// ============

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

}




// =================
// UPDATE SIMULATION
// =================

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
  if (updateplaying === true && gameOver === false) {
    if (pickedplayers === 1) {
      g_botPlayer1.update(du);
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
    //Check for trail collision
    checkAll(pickedplayers);
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
var winnerCol = "white";
var start = false;
var info = false;
var tilBaka = false;

// GAME-SPECIFIC RENDERING

var background = new Image();
background.src = "resizeImageFolder/grid.jpg";

background.onload = function(ctx){
    ctx.drawImage(background,0,0);
}


// Logic for rendering
function renderSimulation(ctx) {
  if(playing === true) background.onload(ctx);

  // Render "pick mode" screen 
  if (picking === false && playing === false) {
    modeManager.render(ctx);
    if(numbplayers > 0 && numbplayers < 5) picking = true;
  }


  // Render "game rules" screen 
  if (info===true && playing === false) 
      showRules(ctx);

  // Render "pick mode" screen after back button is pressed
  if (picking === false && tilBaka === true && playing === false && info === false) {
    modeManager.render(ctx);
    if(numbplayers > 0 && numbplayers < 5) picking = true;
  }

  // Render "player pick" screen
  if(picking === true && updateplaying === false && start === false && info === false){
    entityManager.render(ctx);
  }


  if (pickedplayers === 1) {
    playing = true;
    g_botPlayer1.render1(ctx);
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

  // Start button
  if (playing === true && updateplaying === false && start === false)
    startButtonRender(ctx);

  if(start === true){
    updateplaying = true;
    ctx.shadowBlur = 50;
    ctx.shadowColor = "white";
    currentPowerUp.render(ctx);
    ctx.shadowBlur = 0;
  }

  if (gameOver === true)
    renderGameOver(ctx);

};

// Kick it off
g_main.init();

requestPreloads();
