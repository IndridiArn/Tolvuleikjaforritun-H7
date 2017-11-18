// A generic constructor which accepts an arbitrary descriptor object
function Snake(descr) {
  for (var property in descr) {
    this[property] = descr[property];
  }
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
  this.reset_rotation = this.rotation;
  this.rTrail.startX = this.cx;
  this.rTrail.startY = this.cy;
  this.particles = []
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Snake.prototype.halfWidth = 10;
Snake.prototype.halfHeight = 10;

Snake.prototype.update = function(du) {
  if (this.dead === false) {
    silfrid.play();

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

    this.wrapPosition();

    this.updateTrail();

    this.collidesWith();

    this.getPowerUp(currentPowerUp);


  }

};

Snake.prototype.reset = function() {
  this.cx = this.reset_cx;
  this.cy = this.reset_cy;
  this.rotation = this.reset_rotation;

  this.halt();
};

Snake.prototype.deathParticles = function() {

  for(var i = 0; i < 25; i++){
    var p = new particle({
        cx: this.cx,
        cy: this.cy
    })
  
  this.particles.push(p)
  }

};

Snake.prototype.halt = function() {
  this.vel = 0;
  this.dead = true;

  this.deathParticles();
  
};

Snake.prototype.updateTrail = function() {
  this.trail.push({cx: this.cx, cy:this.cy});

  this.rTrail.destX = this.cx;
  this.rTrail.destY = this.cy;
}

Snake.prototype.renderTrail = function(ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 5;
  //ctx.shadowBlur = 50;
  //ctx.shadowColor = "white";
  
  // gömlu línurnar renderaðar
  if(this.oldTrails.length > 0)
  for(var i = 0; i < this.oldTrails.length; i++){
    ctx.beginPath();
    ctx.moveTo(this.oldTrails[i].startX, this.oldTrails[i].startY);
    ctx.lineTo(this.oldTrails[i].destX, this.oldTrails[i].destY);
    ctx.stroke();       
  }
  // Núverandi lína renderuð
  ctx.beginPath();
  ctx.moveTo(this.rTrail.startX, this.rTrail.startY);
  ctx.lineTo(this.rTrail.destX, this.rTrail.destY);
  ctx.stroke();
  
  //ctx.shadowBlur = 0;
}

Snake.prototype.wrapPosition = function() {

  /*
    if (this.cy + g_snakeSprite.img.height < 0) this.cy += myCanvas.height;
    if (this.cy - g_snakeSprite.img.width > myCanvas.width) this.cy -= myCanvas.width;
    if (this.cx + g_snakeSprite.img.height < 0) this.cx += myCanvas.height;
    if (this.cx - g_snakeSprite.img.width > myCanvas.width) this.cx -= myCanvas.width;
  */

};

Snake.prototype.render1 = function(ctx) {
  // (cx, cy) is the centre; must offset it for drawing
  ctx.fillStyle = this.color;

  this.renderTrail(ctx);

  ctx.shadowBlur = 10;
  ctx.shadowColor = this.color;
  g_sprites[selectedplayers[0]].scale = 0.3;
  g_sprites[selectedplayers[0]].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  g_sprites[selectedplayers[0]].scale = 1;

  /*
    g_sprites[playerpick].scale = 0.3;
    g_sprites[playerpick].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
    g_sprites[playerpick].scale = 1;
  */
  ctx.shadowBlur = 0;

  if(this.dead === true){
    drawParticles(ctx, this.particles)
  }
};

Snake.prototype.render2 = function(ctx) {
  // (cx, cy) is the centre; must offset it for drawing
  ctx.fillStyle = this.color;

  this.renderTrail(ctx);

  ctx.shadowBlur = 10;
  ctx.shadowColor = this.color;
  g_sprites[selectedplayers[1]].scale = 0.3;
  g_sprites[selectedplayers[1]].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  g_sprites[selectedplayers[1]].scale = 1;
  /*
    g_sprites[playerpick].scale = 0.3;
    g_sprites[playerpick].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
    g_sprites[playerpick].scale = 1;
  */

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
  /*
    g_sprites[playerpick].scale = 0.3;
    g_sprites[playerpick].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
    g_sprites[playerpick].scale = 1;
  */
  ctx.shadowBlur = 0;

  if(this.dead === true){
    drawParticles(ctx, this.particles)
  }
};
Snake.prototype.render4 = function(ctx) {
  // (cx, cy) is the centre; must offset it for drawing
  ctx.fillStyle = this.color;

  this.renderTrail(ctx);

  ctx.shadowBlur = 10;
  ctx.shadowColor = this.color;

  g_sprites[selectedplayers[3]].scale = 0.3;
  g_sprites[selectedplayers[3]].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  g_sprites[selectedplayers[3]].scale = 1;
  /*
    g_sprites[playerpick].scale = 0.3;
    g_sprites[playerpick].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
    g_sprites[playerpick].scale = 1;
  */
  ctx.shadowBlur = 0;

  if(this.dead === true){
    drawParticles(ctx, this.particles)
  }
};


Snake.prototype.getPowerUp = function(powerup) {

  var d = Math.sqrt(((powerup.cx - this.cx) * (powerup.cx - this.cx)) +
    ((powerup.cy - this.cy) * (powerup.cy - this.cy)))

  if (d < 20 && powerup.active === true) {
    console.log("Powerup! " + "Number " + powerup.type);
    powerup.counter = 1000;
    powerup.active = false;


    if (currentPowerUp.type === 0)
      this.vel = this.vel + 1;

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


    } else if (currentPowerUp.type === 3)
      this.wrap = true;
  }


};




Snake.prototype.collidesWith = function() {

  if (this.wrap === false) {
    if (this.cx < 0 || this.cx > 1190 || this.cy < 0 || this.cy > 990) {
      //g_snakePlayer1.halt();
      //g_snakePlayer2.halt();
      //updateplaying = null;
      if (this.number === 1) {
        g_snakePlayer1.halt();
        silfrid.pause();
        endingSoundEffects[selectedplayers[0]].play();
        console.log("Player 1 hit the wall!");
      }
      if (this.number === 2) {
        g_snakePlayer2.halt();
        silfrid.pause();
        endingSoundEffects[selectedplayers[1]].play();
        console.log("Player 2 hit the wall!");
      }
      if (this.number === 3) {
        g_snakePlayer3.halt();
        silfrid.pause();
        endingSoundEffects[selectedplayers[1]].play();
        console.log("Player 3 hit the wall!");
      }
      if (this.number === 4) {
        g_snakePlayer4.halt();
        silfrid.pause();
        endingSoundEffects[selectedplayers[1]].play();
        console.log("Player 4 hit the wall!");
      }

    }

  }

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


  //silfrid.currentTime = 0;

};
