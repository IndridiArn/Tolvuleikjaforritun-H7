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
var playing = false;
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
  cx: 50,
  cy: 400,
  dir: 4,
  vel: 4,
  trail: [],
  color : '#00FFFF',

  //Movement
  GO_UP   : KEY_W,
  GO_DOWN : KEY_S,
  GO_LEFT : KEY_A,
  GO_RIGHT : KEY_D,
});

// Player 2

var KEY_I = 'I'.charCodeAt(0);
var KEY_K = 'K'.charCodeAt(0);
var KEY_J = 'J'.charCodeAt(0);
var KEY_L = 'L'.charCodeAt(0);

var g_snakePlayer2 = new Snake({
  cx: 950,
  cy: 400,
  dir: 3,
  vel: 4,
  trail: [],
  color:'#00FF00',


  GO_UP   : KEY_I,
  GO_DOWN : KEY_K,
  GO_LEFT : KEY_J,
  GO_RIGHT: KEY_L,
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

//var tap = new Audio('sounds/intro.mp3');
//var taplag = new Audio('sounds/intro.mp3');
//var taptal = new Audio('sounds/intro.mp3');
//g_canvas.fillStyle = "black";
var prevfillStyle = g_ctx.fillStyle;
g_ctx.fillStyle = "black";
g_ctx.font ="bold 24px consolas";
g_ctx.fillText("ÞingmannaTron", 500, 100);
g_ctx.fillStyle = prevfillStyle;

entityManager.createMenu();


function gatherInputs(){
  //ónotað gums frá pat
}
var g_images = {};


function requestPreloads() {

    var requiredImages = {
	    bjarni : "myndir/betriUnits/unit_bjarni_ben.png",
	    gudlaugur:  "myndir/betriUnits/unit_gudlaugur_thor.png",
      katrin : "myndir/betriUnits/unit_katrin_jak.png",
      simmi : "myndir/betriUnits/unit_simmi_d.png",
      helgi : "myndir/betriUnits/unit-helgi-hrafn.png",
      logi : "myndir/betriUnits/unit-logi-einarsson.png",
      siggi : "myndir/betriUnits/unit-siggi-ingi.png",
      thorgerdur : "myndir/betriUnits/unit-thorgerdur-kat.png"

    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = [];


function preloadDone() {

    g_sprites.push(new Sprite(g_images.bjarni));
    g_sprites.push(new Sprite(g_images.gudlaugur));
    g_sprites.push(new Sprite(g_images.katrin));
    g_sprites.push(new Sprite(g_images.simmi));
    g_sprites.push(new Sprite(g_images.helgi));
    g_sprites.push(new Sprite(g_images.logi));
    g_sprites.push(new Sprite(g_images.siggi));
    g_sprites.push(new Sprite(g_images.thorgerdur));
    g_main.init();
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

    g_snakePlayer1.update(du);
    g_snakePlayer2.update(du);

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


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    //g_ball.render(ctx);

    if(playing === false){
    entityManager.render(ctx);
  }

    if(playing === false){
    g_snakePlayer1.render(ctx);
    g_snakePlayer2.render(ctx);
  }

}

// Kick it off
g_main.init();
requestPreloads();
