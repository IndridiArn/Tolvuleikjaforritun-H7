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
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Snake.prototype.halfWidth = 10;
Snake.prototype.halfHeight = 10;

Snake.prototype.update = function (du) {
  if(this.dead === false){
  
    if (g_keys[this.GO_UP]) {
      if(this.dir != 2){
        console.log("Key pressed")
        this.dir = 1;
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
      }
  }
  if (g_keys[this.GO_DOWN]) {
      if(this.dir != 1){
        console.log("Key pressed")
        this.dir = 2;
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
      
      }
  }
  if (g_keys[this.GO_LEFT]) {
      if(this.dir != 4){
        console.log("Key pressed")
        this.dir = 3;
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
      
      }
  }
  if (g_keys[this.GO_RIGHT]) {
      if(this.dir != 3){
        console.log("Key pressed")
        this.dir = 4;
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
      
      }
  }

  if(this.dir === 1)
  	this.cy -= this.vel*du;
  else if(this.dir === 2)
  	this.cy += this.vel*du;
  else if(this.dir === 3)
  	this.cx -= this.vel*du;
  else if(this.dir === 4)
  	this.cx += this.vel*du;

    this.updateTrail();

    this.collidesWith();

    this.getPowerUp(currentPowerUp);

    this.counter = this.counter+1;

  }

};

Snake.prototype.reset = function() {
  this.cx = this.reset_cx;
  this.cy = this.reset_cy;
  this.rotation = this.reset_rotation;

  this.halt();
};

Snake.prototype.halt = function() {
  this.vel = 0;
  this.dead = true;
};

Snake.prototype.updateTrail = function (){
  //if(this.counter%10 === 0)
	this.trail.push({cx: this.cx, cy:this.cy});

  this.rTrail.destX = this.cx;
  this.rTrail.destY = this.cy;
}

Snake.prototype.renderTrail = function (ctx){
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 5;
  ctx.shadowBlur = 20;
  ctx.shadowColor = "white";
  
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
  
  ctx.shadowBlur = 0;
}  


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
};


Snake.prototype.getPowerUp = function (powerup){

      var d = Math.sqrt( ((powerup.cx - this.cx)*(powerup.cx - this.cx)) +
                         ((powerup.cy - this.cy)*(powerup.cy - this.cy)))

      if(d < 30 && powerup.active === true){
        console.log("Powerup! " + "Number " + powerup.type);
        powerup.counter = 1000;
        powerup.active = false;


        if(currentPowerUp.type === 0)
        this.vel = this.vel+1;

        else if(currentPowerUp.type === 1){
        if(this.number === 1)
        g_snakePlayer2.trail = [];
        if(this.number === 2)
        g_snakePlayer1.trail = [];
    }

        else if(currentPowerUp.type === 2){
          if(this.number === 1)
          g_snakePlayer2.vel = g_snakePlayer2.vel-1;
          if(this.number === 2)
          g_snakePlayer1.vel = g_snakePlayer1.vel-1;
      }

        else if(currentPowerUp.type === 3)
          this.wrap = true;
      }


};



Snake.prototype.collidesWith = function (){

  for(var i = 0; i < g_snakePlayer1.trail.length-10; i++){
      var pos = g_snakePlayer1.trail[i];
      var d = Math.sqrt( ((pos.cx - g_snakePlayer1.cx)*(pos.cx - g_snakePlayer1.cx)) +
                         ((pos.cy - g_snakePlayer1.cy)*(pos.cy - g_snakePlayer1.cy)))

      if(d < 1){

        g_snakePlayer1.halt();
        endingSoundEffects[selectedplayers[0]].play();
        g_snakePlayer2.halt();
        alert("Player 1 hit his own trail, player 2 wins!");
      
      }
  }

  for(var i = 0; i < g_snakePlayer2.trail.length-10; i++){
      var pos = g_snakePlayer2.trail[i];
      var d = Math.sqrt( ((pos.cx - g_snakePlayer2.cx)*(pos.cx - g_snakePlayer2.cx)) +
                         ((pos.cy - g_snakePlayer2.cy)*(pos.cy - g_snakePlayer2.cy)))

      if(d < 1){

        g_snakePlayer1.halt();
        endingSoundEffects[selectedplayers[1]].play();
        g_snakePlayer2.halt();

        alert("Player 2 hit his own trail, player 1 wins!");
      }
    }
  

  for(var i = 0; i < g_snakePlayer2.trail.length-1; i++){
      var pos = g_snakePlayer2.trail[i];
      var d = Math.sqrt( ((pos.cx - g_snakePlayer1.cx)*(pos.cx - g_snakePlayer1.cx)) +
                         ((pos.cy - g_snakePlayer1.cy)*(pos.cy - g_snakePlayer1.cy)))

      if(d < 5){

        g_snakePlayer1.halt();
        endingSoundEffects[selectedplayers[0]].play();
        g_snakePlayer2.halt();

        alert("Player 1 hit player 2's trail, player 2 wins!");
      }
    
  }

  for(var i = 0; i < g_snakePlayer1.trail.length-1; i++){
      var pos = g_snakePlayer1.trail[i];
      var d = Math.sqrt( ((pos.cx - g_snakePlayer2.cx)*(pos.cx - g_snakePlayer2.cx)) +
                         ((pos.cy - g_snakePlayer2.cy)*(pos.cy - g_snakePlayer2.cy)))

      if(d < 5){


        g_snakePlayer1.halt();
        endingSoundEffects[selectedplayers[1]].play();
        g_snakePlayer2.halt();

        alert("Player 2 hit player 1's trail, player 1 wins!");
      }
    
  }


  if(this.wrap === false){
  if(this.cx < 0 || this.cx > 1190 || this.cy < 0 || this.cy > 990){

        g_snakePlayer1.halt();
        g_snakePlayer2.halt();
        if(this.number === 1){
          endingSoundEffects[selectedplayers[0]].play();
          alert("Player 1 hit the wall, player 2 wins!");
        }
        if(this.number === 2){
          endingSoundEffects[selectedplayers[1]].play();
          alert("Player 2 hit the wall, player 1 wins!");
        }

  }

}


  if(this.wrap === true){
    if(this.cx < 0)
      this.cx = this.cx + 1190;
    if(this.cx > 1190)
      this.cx = 0;
    if(this.cy < 0)
      this.cy = this.cy+990;
    if(this.cy > 990)
      this.cy = 0;
  }


};
