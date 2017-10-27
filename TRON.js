// TRON - Tests 
//
// A simple version of a moving, directed
// worm, a la "TRON" or "Snake"

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =================
// KEYBOARD HANDLING
// =================

var g_keys = [];

function handleKeydown(evt) {
  g_keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
  g_keys[evt.keyCode] = false;
}

// Inspects, and then clears, a key's state
//
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
//
function eatKey(keyCode) {
  var isDown = g_keys[keyCode];
  g_keys[keyCode] = false;
  return isDown;
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);

// ==============
// MOUSE HANDLING
// ==============

function handleMouse(evt) {

}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);


// ============
// SPRITE STUFF
// ============

// Construct a "sprite" from the given `image`
//
function Sprite(image) {

}
// the "Sprite" is currently just a red box
Sprite.prototype.drawCentredAt = function(ctx, cx, cy) {
		
    ctx.fillStyle="red";
		ctx.fillRect(cx,cy,10,10);
		ctx.stroke();
  
};


Sprite.prototype.drawWrappedCentredAt = function(ctx, cx, cy, rotation) {

  // We'll implement this later, should be easy enough


};

// ==========
// Snake stuff
// ==========



// A generic contructor which accepts an arbitrary descriptor object
function Snake(descr) {
  for (var property in descr) {
    this[property] = descr[property];
  }

  // Remember my reset positions
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
  this.reset_rotation = this.rotation;
}

Snake.prototype.KEY_THRUST = keyCode('W');
Snake.prototype.KEY_RETRO = keyCode('S');
Snake.prototype.KEY_LEFT = keyCode('A');
Snake.prototype.KEY_RIGHT = keyCode('D');


Snake.prototype.update = function(du) {

	if (g_keys[this.KEY_THRUST]) {
  		if(this.dir != 2)
  		this.dir = 1;
  }
  if (g_keys[this.KEY_RETRO]) {
  		if(this.dir != 1)
  		this.dir = 2;
  }
  if (g_keys[this.KEY_LEFT]) {
  		if(this.dir != 4)
  		this.dir = 3;
  }
  if (g_keys[this.KEY_RIGHT]) {
  		if(this.dir != 3)
  		this.dir = 4;
  }

  //console.log(thrust);

  // Apply thrust directionally, based on our rotation
  if(this.dir === 1)
  	this.cy -= this.vel*du;
  else if(this.dir === 2)
  	this.cy += this.vel*du;
  else if(this.dir === 3)
  	this.cx -= this.vel*du;
  else if(this.dir === 4)
  	this.cx += this.vel*du;

  //accelY += this.computeGravity();

  this.wrapPosition();
  
  this.updateTrail();
  
  this.collidesWith();

  //if (thrust === 0 || g_allowMixedActions) {
  //  this.updateRotation(du);
  //}
};

Snake.prototype.reset = function() {
  this.cx = this.reset_cx;
  this.cy = this.reset_cy;
  this.rotation = this.reset_rotation;

  this.halt();
};

Snake.prototype.halt = function() {
  this.vel = 0;
};

Snake.prototype.collidesWith = function (){

	for(var i = 0; i < this.trail.length-1; i++){
  		var pos = this.trail[i];
  		var d = Math.sqrt( ((pos.cx - this.cx)*(pos.cx - this.cx)) + 
       									 ((pos.cy - this.cy)*(pos.cy - this.cy)))
                         
      if(d < 1){
      	this.halt();
      	//this.trail = [];
      }
  }
  

};

Snake.prototype.updateTrail = function (){
	this.trail.push({cx: this.cx, cy:this.cy});
}

Snake.prototype.renderTrail = function (ctx){
	for(var i = 0; i < this.trail.length; i++){
  		ctx.fillRect(this.trail[i].cx, this.trail[i].cy,10,10);
			ctx.stroke();			
  }
}

/*
var NOMINAL_ROTATE_RATE = 0.1;

Snake.prototype.updateRotation = function(du) {

  if (g_keys[this.KEY_LEFT]) {
    this.rotation -= NOMINAL_ROTATE_RATE * du;
  }
  if (g_keys[this.KEY_RIGHT]) {
    this.rotation += NOMINAL_ROTATE_RATE * du;
  }
};
*/

Snake.prototype.wrapPosition = function() {

/*
  if (this.cy + g_snakeSprite.img.height < 0) this.cy += myCanvas.height;
  if (this.cy - g_snakeSprite.img.width > myCanvas.width) this.cy -= myCanvas.width;

  if (this.cx + g_snakeSprite.img.height < 0) this.cx += myCanvas.height;
  if (this.cx - g_snakeSprite.img.width > myCanvas.width) this.cx -= myCanvas.width;
  
*/



};

Snake.prototype.render = function(ctx) {

  g_snakeSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);

  g_snakeSprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  
  this.renderTrail(ctx);
};

// -------------------
// CONSTRUCT THE Snake
// -------------------

var g_snake = new Snake({
  cx: 140,
  cy: 200,
  dir: 2,
  vel: 4,
  trail: []
  
});


// =====
// UTILS
// =====

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

function keyCode(keyChar) {
  return keyChar.charCodeAt(0);
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
  // Nothing to do here!
  // The event handlers do everything we need for now.
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

// --------------------------
// GAME-SPECIFIC UPDATE LOGIC
// --------------------------

function updateSimulation(du) {

  processDiagnostics();

  g_snake.update(du);

  if (!g_useExtras) return;

}

// -------------------------
// GAME-SPECIFIC DIAGNOSTICS
// -------------------------

var g_allowMixedActions = true;
var g_useExtras = true;
var g_useGravity = false;

var KEY_EXTRAS = keyCode('E');
var KEY_GRAVITY = keyCode('G');
var KEY_MIXED = keyCode('M');

var KEY_HALT = keyCode('H');
var KEY_RESET = keyCode('R');

function processDiagnostics() {

  // Handle these simple diagnostic options,
  // as defined by the KEY identifiers above.
  //
  // The first three are toggles; the last two are not.
	
  if (eatKey(KEY_EXTRAS)) {
    g_useExtras = !g_useExtras;
  }

  if (eatKey(KEY_MIXED)) {
    g_allowMixedActions = !g_allowMixedActions;
  }


	// non-toggles...
  if (eatKey(KEY_HALT)) {
    g_snake.halt();

  }

  if (eatKey(KEY_RESET)) {
    g_snake.reset();

  }
}

// --------------------
// GENERIC UPDATE LOGIC
// --------------------


// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Dt means "delta time" and is in units of the timer-system (i.e. milliseconds)
//
var g_prevUpdateDt = null;

// Du means "delta u", where u represents time in multiples of our nominal interval
//
var g_prevUpdateDu = null;

// Track odds and evens for diagnostic / illustrative purposes
//
var g_isUpdateOdd = false;


function update(dt) {

  // Get out if skipping (e.g. due to pause-mode)
  //
  if (shouldSkipUpdate()) return;

  // Remember this for later
  //
  var original_dt = dt;

  // Warn about very large dt values -- they may lead to error
  //
  if (dt > 200) {
    console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
    dt = NOMINAL_UPDATE_INTERVAL;
  }

  // If using variable time, divide the actual delta by the "nominal" rate,
  // giving us a conveniently scaled "du" to work with.
  //
  var du = (dt / NOMINAL_UPDATE_INTERVAL);

  updateSimulation(du);

  g_prevUpdateDt = original_dt;
  g_prevUpdateDu = du;

  g_isUpdateOdd = !g_isUpdateOdd;
}

// Togglable Pause Mode
//
var KEY_PAUSE = 'P'.charCodeAt(0);
var KEY_STEP = 'O'.charCodeAt(0);

var g_isUpdatePaused = false;

function shouldSkipUpdate() {
  if (eatKey(KEY_PAUSE)) {
    g_isUpdatePaused = !g_isUpdatePaused;
  }
  return g_isUpdatePaused && !eatKey(KEY_STEP);
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

// -----------------------
// GAME-SPECIFIC RENDERING
// -----------------------

function renderSimulation(ctx) {

  g_snake.render(ctx);

  if (!g_useExtras) return;

}

// -----------------
// GENERIC RENDERING
// -----------------

var g_doClear = true;
var g_doBox = false;
var g_undoBox = false;
var g_doFlipFlop = false;
var g_doRender = true;

var g_frameCounter = 1;

var TOGGLE_CLEAR = 'C'.charCodeAt(0);
var TOGGLE_BOX = 'B'.charCodeAt(0);
var TOGGLE_UNDO_BOX = 'U'.charCodeAt(0);
var TOGGLE_FLIPFLOP = 'F'.charCodeAt(0);
var TOGGLE_RENDER = 'R'.charCodeAt(0);

function render(ctx) {

  // Process various option toggles
  //
  if (eatKey(TOGGLE_CLEAR)) g_doClear = !g_doClear;
  if (eatKey(TOGGLE_BOX)) g_doBox = !g_doBox;
  if (eatKey(TOGGLE_UNDO_BOX)) g_undoBox = !g_undoBox;
  if (eatKey(TOGGLE_FLIPFLOP)) g_doFlipFlop = !g_doFlipFlop;

  // Don't toggle rendering in this exercise,
  // because we're going to "steal" that key to implement "reset" instead.
  //if (eatKey(TOGGLE_RENDER)) g_doRender = !g_doRender;

  // I've pulled the clear out of `renderSimulation()` and into
  // here, so that it becomes part of our "diagnostic" wrappers
  //
  if (g_doClear) clearCanvas(ctx);

  // The main purpose of the box is to demonstrate that it is
  // always deleted by the subsequent "undo" before you get to
  // see it...
  //
  // i.e. double-buffering prevents flicker!
  //
  if (g_doBox) fillBox(ctx, 200, 200, 50, 50, "red");


  // The core rendering of the actual game / simulation
  //
  if (g_doRender) renderSimulation(ctx);


  // This flip-flip mechanism illustrates the pattern of alternation
  // between frames, which provides a crude illustration of whether
  // we are running "in sync" with the display refresh rate.
  //
  // e.g. in pathological cases, we might only see the "even" frames.
  //
  if (g_doFlipFlop) {
    var boxX = 250,
      boxY = g_isUpdateOdd ? 100 : 200;

    // Draw flip-flop box
    fillBox(ctx, boxX, boxY, 50, 50, "green");

    // Display the current frame-counter in the box...
    ctx.fillText(g_frameCounter % 1000, boxX + 10, boxY + 20);
    // ..and its odd/even status too
    var text = g_frameCounter % 2 ? "odd" : "even";
    ctx.fillText(text, boxX + 10, boxY + 40);
  }

  // Optional erasure of diagnostic "box",
  // to illustrate flicker-proof double-buffering
  //
  if (g_undoBox) ctx.clearRect(200, 200, 50, 50);

  ++g_frameCounter;
}

// =============
// PRELOAD STUFF
// =============

var g_snakeSprite;

function preloadStuff_thenCall(completionCallback) {
  var g_snakeImage = new Image();

  g_snakeImage.onload = function() {
    g_snakeSprite = new Sprite(g_snakeImage);
    completionCallback();
  };

  g_snakeImage.src = "https://notendur.hi.is/~pk/308G/images/ship.png";
}

// ========
// MAINLOOP
// ========

// The mainloop is one big object with a fairly small public interface
// (e.g. init, iter, gameOver), and a bunch of private internal helper methods.
//
// The "private" members are identified as such purely by the naming convention
// of having them begin with a leading underscore. A more robust form of privacy,
// with genuine name-hiding *is* possible in JavaScript (via closures), but I 
// haven't adopted it here.
//
var g_main = {

  // "Frame Time" is a (potentially high-precision) frame-clock for animations
  _frameTime_ms: null,
  _frameTimeDelta_ms: null

};

// Perform one iteration of the mainloop
g_main.iter = function(frameTime) {

  // Use the given frameTime to update all of our game-clocks
  this._updateClocks(frameTime);

  // Perform the iteration core to do all the "real" work
  this._iterCore(this._frameTimeDelta_ms);

  // Diagnostics, such as showing current timer values etc.
  this._debugRender(g_ctx);

  // Request the next iteration if needed
  if (!this._isGameOver) this._requestNextIteration();
};

g_main._updateClocks = function(frameTime) {

  // First-time initialisation
  if (this._frameTime_ms === null) this._frameTime_ms = frameTime;

  // Track frameTime and its delta
  this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
  this._frameTime_ms = frameTime;
};

g_main._iterCore = function(dt) {

  // Handle QUIT
  if (requestedQuit()) {
    this.gameOver();
    return;
  }

  gatherInputs();
  update(dt);
  render(g_ctx);
};

g_main._isGameOver = false;

g_main.gameOver = function() {
  this._isGameOver = true;
  console.log("gameOver: quitting...");
};

// Simple voluntary quit mechanism
//
var KEY_QUIT = 'Q'.charCodeAt(0);

function requestedQuit() {
  return g_keys[KEY_QUIT];
}

// Annoying shim for Firefox and Safari
window.requestAnimationFrame =
  window.requestAnimationFrame || // Chrome
  window.mozRequestAnimationFrame || // Firefox
  window.webkitRequestAnimationFrame; // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
  g_main.iter(frameTime);
}

g_main._requestNextIteration = function() {
  window.requestAnimationFrame(mainIterFrame);
};

// Mainloop-level debug-rendering

var TOGGLE_TIMER_SHOW = 'T'.charCodeAt(0);

g_main._doTimerShow = false;

g_main._debugRender = function(ctx) {

  if (eatKey(TOGGLE_TIMER_SHOW)) this._doTimerShow = !this._doTimerShow;

  if (!this._doTimerShow) return;

  var y = 350;
  ctx.fillText('FT ' + this._frameTime_ms, 50, y + 10);
  ctx.fillText('FD ' + this._frameTimeDelta_ms, 50, y + 20);
  ctx.fillText('UU ' + g_prevUpdateDu, 50, y + 30);
  ctx.fillText('FrameSync ON', 50, y + 40);
};

g_main.init = function() {

  // Grabbing focus is good, but it sometimes screws up jsfiddle,
  // so it's a risky option during "development"
  //
  //window.focus(true);

  // We'll be working on a black background here,
  // so let's use a fillStyle which works against that...
  //
  g_ctx.fillStyle = "white";

  this._requestNextIteration();
};

function mainInit() {
  g_main.init();
}

preloadStuff_thenCall(mainInit);
