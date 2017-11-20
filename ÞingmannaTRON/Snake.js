// A generic constructor which accepts an arbitrary descriptor object
function Snake(descr) {
  for (var property in descr) {
    this[property] = descr[property];
  }
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
  this.rTrail.startX = this.cx;
  this.rTrail.startY = this.cy;
  this.particles = []
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Snake.prototype.halfWidth = 10;
Snake.prototype.halfHeight = 10;

// An update function for the snake prototype
Snake.prototype.update = function(du) {
  if (this.dead === false) {

    if (g_keys[this.GO_UP]) {
      if(this.dir != 2){
        this.dir = 1;
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
      }
  }
  if (g_keys[this.GO_DOWN]) {
      if(this.dir != 1){
        this.dir = 2;
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
      
      }
  }
  if (g_keys[this.GO_LEFT]) {
      if(this.dir != 4){
        this.dir = 3;
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
      
      }
  }
  if (g_keys[this.GO_RIGHT]) {
      if(this.dir != 3){
        this.dir = 4;
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
      
      }
  }

    if (this.dir === 1)
      this.cy -= this.vel * du;
    else if (this.dir === 2)
      this.cy += this.vel * du;
    else if (this.dir === 3)
      this.cx -= this.vel * du;
    else if (this.dir === 4)
      this.cx += this.vel * du;

    this.updateTrail();

    this.collidesWith();

    this.getPowerUp(currentPowerUp);


  }

};

// A reset function, not used in the final product
Snake.prototype.reset = function() {
  this.cx = this.reset_cx;
  this.cy = this.reset_cy;

  this.halt();
};

// A function that creates a particle "bomb" that fans
// out when a player hits a wall or a trail.
Snake.prototype.deathParticles = function() {

  for(var i = 0; i < 40; i++){
    var p = new particle({
        cx: this.cx,
        cy: this.cy
    })
  
  this.particles.push(p)
  }

};

// Halt function used for player death
Snake.prototype.halt = function() {
  if(this.dead === false) this.deathParticles();
  this.vel = 0;
  this.dead = true;

  
};

// Trail update, both for collision coordinates
// and line coordinates for the rendering
Snake.prototype.updateTrail = function() {
  this.trail.push({cx: this.cx, cy:this.cy});

  this.rTrail.destX = this.cx;
  this.rTrail.destY = this.cy;
}

// The trail is rendered by keeping track of old lines that are pushed
// to an array each time a player makes a turn. The current line is
// tracked and updated as the player moves.
// Both old lines and the current one are rendered here
// shadowBlur is an extremely expensive operation and is therefore
// omitted for performance reasons. It's not a massive performance issue
// but it does slow the game down a bit when the trails have grown to a
// length that covers half the screen.
Snake.prototype.renderTrail = function(ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 5;
  //ctx.shadowBlur = 50;
  //ctx.shadowColor = "white";
  
  // Old lines rendered
  if(this.oldTrails.length > 0)
  for(var i = 0; i < this.oldTrails.length; i++){
    ctx.beginPath();
    ctx.moveTo(this.oldTrails[i].startX, this.oldTrails[i].startY);
    ctx.lineTo(this.oldTrails[i].destX, this.oldTrails[i].destY);
    ctx.stroke();       
  }
  // Current line rendered
  ctx.beginPath();
  ctx.moveTo(this.rTrail.startX, this.rTrail.startY);
  ctx.lineTo(this.rTrail.destX, this.rTrail.destY);
  ctx.stroke();
  
  //ctx.shadowBlur = 0;
}


// Four render funtions for each possible player
Snake.prototype.render1 = function(ctx) {
  ctx.fillStyle = this.color;

  this.renderTrail(ctx);

  ctx.shadowBlur = 10;
  ctx.shadowColor = this.color;
  // The player "head" is a sprite
  g_sprites[selectedplayers[0]].scale = 0.3;
  g_sprites[selectedplayers[0]].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  g_sprites[selectedplayers[0]].scale = 1;

  ctx.shadowBlur = 0;

  // Rendering for the particle death bomb
  if(this.dead === true){
    drawParticles(ctx, this.particles)
  }
};

Snake.prototype.render2 = function(ctx) {
  ctx.fillStyle = this.color;

  this.renderTrail(ctx);

  ctx.shadowBlur = 10;
  ctx.shadowColor = this.color;
  g_sprites[selectedplayers[1]].scale = 0.3;
  g_sprites[selectedplayers[1]].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  g_sprites[selectedplayers[1]].scale = 1;

  ctx.shadowBlur = 0;

  if(this.dead === true){
    drawParticles(ctx, this.particles)
  }
};

Snake.prototype.render3 = function(ctx) {
  ctx.fillStyle = this.color;

  this.renderTrail(ctx);

  ctx.shadowBlur = 10;
  ctx.shadowColor = this.color;
  g_sprites[selectedplayers[2]].scale = 0.3;
  g_sprites[selectedplayers[2]].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  g_sprites[selectedplayers[2]].scale = 1;

  ctx.shadowBlur = 0;

  if(this.dead === true){
    drawParticles(ctx, this.particles)
  }
};

Snake.prototype.render4 = function(ctx) {
  ctx.fillStyle = this.color;

  this.renderTrail(ctx);

  ctx.shadowBlur = 10;
  ctx.shadowColor = this.color;

  g_sprites[selectedplayers[3]].scale = 0.3;
  g_sprites[selectedplayers[3]].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  g_sprites[selectedplayers[3]].scale = 1;

  ctx.shadowBlur = 0;

  if(this.dead === true){
    drawParticles(ctx, this.particles)
  }
};

// Calculate if a player has collided with a powerup and
// determine which type of powerup it is
Snake.prototype.getPowerUp = function(powerup) {

  var d = Math.sqrt(((powerup.cx - this.cx) * (powerup.cx - this.cx)) +
    ((powerup.cy - this.cy) * (powerup.cy - this.cy)))

  if (d < 30 && powerup.active === true) {
    console.log("Powerup! " + "Number " + powerup.type);
    powerup.counter = 1000;
    powerup.active = false;

    // speedup powerup
    if (currentPowerUp.type === 0)
      this.vel = this.vel + 1;

    // Trail bomb powerup - all cases
    else if (currentPowerUp.type === 1) {
      if (this.number === 1){
        g_snakePlayer2.trail = []
        g_snakePlayer2.rTrail = []
        g_snakePlayer2.oldTrails = []
        g_snakePlayer2.rTrail.startX = g_snakePlayer2.cx;
        g_snakePlayer2.rTrail.startY = g_snakePlayer2.cy;

        g_snakePlayer3.trail = []
        g_snakePlayer3.rTrail = []
        g_snakePlayer3.oldTrails = []
        g_snakePlayer3.rTrail.startX = g_snakePlayer3.cx;
        g_snakePlayer3.rTrail.startY = g_snakePlayer3.cy;

        g_snakePlayer4.trail = []
        g_snakePlayer4.rTrail = []
        g_snakePlayer4.oldTrails = []
        g_snakePlayer4.rTrail.startX = g_snakePlayer4.cx;
        g_snakePlayer4.rTrail.startY = g_snakePlayer4.cy;
      }

      if (this.number === 2){
        g_snakePlayer1.trail = []
        g_snakePlayer1.rTrail = []
        g_snakePlayer1.oldTrails = []
        g_snakePlayer1.rTrail.startX = g_snakePlayer1.cx;
        g_snakePlayer1.rTrail.startY = g_snakePlayer1.cy;

        g_snakePlayer3.trail = []
        g_snakePlayer3.rTrail = []
        g_snakePlayer3.oldTrails = []
        g_snakePlayer3.rTrail.startX = g_snakePlayer3.cx;
        g_snakePlayer3.rTrail.startY = g_snakePlayer3.cy;

        g_snakePlayer4.trail = []
        g_snakePlayer4.rTrail = []
        g_snakePlayer4.oldTrails = []
        g_snakePlayer4.rTrail.startX = g_snakePlayer4.cx;
        g_snakePlayer4.rTrail.startY = g_snakePlayer4.cy;
      }

      if (this.number === 3){
        g_snakePlayer1.trail = []
        g_snakePlayer1.rTrail = []
        g_snakePlayer1.oldTrails = []
        g_snakePlayer1.rTrail.startX = g_snakePlayer1.cx;
        g_snakePlayer1.rTrail.startY = g_snakePlayer1.cy;

        g_snakePlayer2.trail = []
        g_snakePlayer2.rTrail = []
        g_snakePlayer2.oldTrails = []
        g_snakePlayer2.rTrail.startX = g_snakePlayer2.cx;
        g_snakePlayer2.rTrail.startY = g_snakePlayer2.cy;

        g_snakePlayer4.trail = []
        g_snakePlayer4.rTrail = []
        g_snakePlayer4.oldTrails = []
        g_snakePlayer4.rTrail.startX = g_snakePlayer4.cx;
        g_snakePlayer4.rTrail.startY = g_snakePlayer4.cy;
      }

      if (this.number === 4){
        g_snakePlayer1.trail = []
        g_snakePlayer1.rTrail = []
        g_snakePlayer1.oldTrails = []
        g_snakePlayer1.rTrail.startX = g_snakePlayer1.cx;
        g_snakePlayer1.rTrail.startY = g_snakePlayer1.cy;

        g_snakePlayer2.trail = []
        g_snakePlayer2.rTrail = []
        g_snakePlayer2.oldTrails = []
        g_snakePlayer2.rTrail.startX = g_snakePlayer2.cx;
        g_snakePlayer2.rTrail.startY = g_snakePlayer2.cy;

        g_snakePlayer3.trail = []
        g_snakePlayer3.rTrail = []
        g_snakePlayer3.oldTrails = []
        g_snakePlayer3.rTrail.startX = g_snakePlayer3.cx;
        g_snakePlayer3.rTrail.startY = g_snakePlayer3.cy;
      }
    } 


    // Opponent slowdown powerup - all cases
    else if (currentPowerUp.type === 2) {
      if (this.number === 1){
        g_snakePlayer2.vel = g_snakePlayer2.vel - 1;
        g_snakePlayer3.vel = g_snakePlayer3.vel - 1;
        g_snakePlayer4.vel = g_snakePlayer4.vel - 1;
      }

      if (this.number === 2){
        g_snakePlayer1.vel = g_snakePlayer1.vel - 1;
        g_snakePlayer3.vel = g_snakePlayer3.vel - 1;
        g_snakePlayer4.vel = g_snakePlayer4.vel - 1;
      }

      if (this.number === 3){
        g_snakePlayer1.vel = g_snakePlayer1.vel - 1;
        g_snakePlayer2.vel = g_snakePlayer2.vel - 1;
        g_snakePlayer4.vel = g_snakePlayer4.vel - 1;
      }

      if (this.number === 4){
        g_snakePlayer1.vel = g_snakePlayer1.vel - 1;
        g_snakePlayer2.vel = g_snakePlayer2.vel - 1;
        g_snakePlayer3.vel = g_snakePlayer3.vel - 1;
      }

      // Wraparound powerup
    } else if (currentPowerUp.type === 3)
      this.wrap = true;
  }


};



// Check for collision with the walls.
// Trail collision is monitored through trailCollision.js
Snake.prototype.collidesWith = function() {


  if (this.wrap === false) {
    if (this.cx < 0 || this.cx > 1190 || this.cy < 0 || this.cy > 990) {

      if (this.number === 1) {
        if(this.dead === false) endingSoundEffects[selectedplayers[0]].play();
        g_snakePlayer1.halt();
        console.log("Player 1 hit the wall!");
      }
      if (this.number === 2) {
        if(this.dead === false)  endingSoundEffects[selectedplayers[1]].play();
        g_snakePlayer2.halt();
        console.log("Player 2 hit the wall!");
      }
      if (this.number === 3) {
        if(this.dead === false) endingSoundEffects[selectedplayers[1]].play();
        g_snakePlayer3.halt();
        console.log("Player 3 hit the wall!");
      }
      if (this.number === 4) {
        if(this.dead === false) endingSoundEffects[selectedplayers[1]].play();
        g_snakePlayer4.halt();
        console.log("Player 4 hit the wall!");
      }

    }

  }

  // If the player has the wraparound powerup
  // he won't hit the walls
  if (this.wrap === true) {
    if (this.cx < 0){
      this.cx = this.cx + 1190;
      this.oldTrails.push(this.rTrail);
      this.rTrail = [];
      this.rTrail.startX = this.cx;
      this.rTrail.startY = this.cy;
    }
    if (this.cx > 1190){
      this.cx = 0;
      this.oldTrails.push(this.rTrail);
      this.rTrail = [];
      this.rTrail.startX = this.cx;
      this.rTrail.startY = this.cy;
    }
    if (this.cy < 0){
      this.cy = this.cy + 990;
      this.oldTrails.push(this.rTrail);
      this.rTrail = [];
      this.rTrail.startX = this.cx;
      this.rTrail.startY = this.cy;
    }
    if (this.cy > 990){
      this.cy = 0;
      this.oldTrails.push(this.rTrail);
      this.rTrail = [];
      this.rTrail.startX = this.cx;
      this.rTrail.startY = this.cy;
    }
  }

};
