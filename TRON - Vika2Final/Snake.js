// A generic constructor which accepts an arbitrary descriptor object
function Snake(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Snake.prototype.halfWidth = 10;
Snake.prototype.halfHeight = 10;

Snake.prototype.update = function (du) {
  if(this.dead === false){
  if (g_keys[this.GO_UP]) {
  		if(this.dir != 2)
  		this.dir = 1;
  }
  if (g_keys[this.GO_DOWN]) {
  		if(this.dir != 1)
  		this.dir = 2;
  }
  if (g_keys[this.GO_LEFT]) {
  		if(this.dir != 4)
  		this.dir = 3;
  }
  if (g_keys[this.GO_RIGHT]) {
  		if(this.dir != 3)
  		this.dir = 4;
  }

  if(this.dir === 1)
  	this.cy -= this.vel*du;
  else if(this.dir === 2)
  	this.cy += this.vel*du;
  else if(this.dir === 3)
  	this.cx -= this.vel*du;
  else if(this.dir === 4)
  	this.cx += this.vel*du;

    this.wrapPosition();

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
  if(this.counter%2 === 0)
	this.trail.push({cx: this.cx, cy:this.cy});
}

Snake.prototype.renderTrail = function (ctx){
  ctx.shadowBlur = 0;
	for(var i = 0; i < this.trail.length; i++){
      //ctx.shadowBlur = 10;
      //ctx.shadowColor = this.color;
  		ctx.fillRect(this.trail[i].cx, this.trail[i].cy,this.halfWidth,this.halfHeight);
			ctx.stroke();
  }
  
 /*
  var i = this.trail.length+1;
  ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fillRect(this.trail[i].cx, this.trail[i].cy,this.halfWidth,this.halfHeight);
      ctx.stroke();
      */
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
  ctx.fillRect(this.cx,
    this.cy,
    this.halfWidth,
    this.halfHeight);
  this.renderTrail(ctx);

  ctx.shadowBlur = 10;
  ctx.shadowColor = this.color;
  g_sprites[selectedplayers[0]].scale = 0.3;
  g_sprites[selectedplayers[0]].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  g_sprites[selectedplayers[0]].scale = 1;

  ctx.font = "30px Arial";
  ctx.fillText(this.hp, 10, 50);

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
  ctx.fillRect(this.cx,
    this.cy,
    this.halfWidth,
    this.halfHeight);
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
  ctx.font = "30px Arial";
  ctx.fillText(this.hp, 1170, 50);

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

      if(d < 5){
        g_snakePlayer1.hp = g_snakePlayer1.hp-1; 
        if(g_snakePlayer1.hp > 0){
        g_snakePlayer1.trail = [];
      }
      else{
        g_snakePlayer1.halt();
        endingSoundEffects[selectedplayers[0]].play();
        g_snakePlayer2.halt();
        g_snakePlayer1.hp = 0;
        alert("Player 1 hit his own trail, player 2 wins!");
      }
      }
  }

  for(var i = 0; i < g_snakePlayer2.trail.length-10; i++){
      var pos = g_snakePlayer2.trail[i];
      var d = Math.sqrt( ((pos.cx - g_snakePlayer2.cx)*(pos.cx - g_snakePlayer2.cx)) +
                         ((pos.cy - g_snakePlayer2.cy)*(pos.cy - g_snakePlayer2.cy)))

      if(d < 5){
        g_snakePlayer2.hp = g_snakePlayer2.hp-1; 

        if(g_snakePlayer2.hp > 0){
        g_snakePlayer2.trail = [];
      }
      else{
        g_snakePlayer1.halt();
        endingSoundEffects[selectedplayers[1]].play();
        g_snakePlayer2.halt();
        g_snakePlayer2.hp = 0;
        alert("Player 2 hit his own trail, player 1 wins!");
      }
    }
  }

  for(var i = 0; i < g_snakePlayer2.trail.length-1; i++){
      var pos = g_snakePlayer2.trail[i];
      var d = Math.sqrt( ((pos.cx - g_snakePlayer1.cx)*(pos.cx - g_snakePlayer1.cx)) +
                         ((pos.cy - g_snakePlayer1.cy)*(pos.cy - g_snakePlayer1.cy)))

      if(d < 5){
        g_snakePlayer1.hp = g_snakePlayer1.hp-1; 

        if(g_snakePlayer1.hp > 0){
        g_snakePlayer2.trail = [];
      }

      else{

        g_snakePlayer1.halt();
        endingSoundEffects[selectedplayers[0]].play();
        g_snakePlayer2.halt();
        g_snakePlayer1.hp = 0;
        alert("Player 1 hit player 2's trail, player 2 wins!");
      }
    }
  }

  for(var i = 0; i < g_snakePlayer1.trail.length-1; i++){
      var pos = g_snakePlayer1.trail[i];
      var d = Math.sqrt( ((pos.cx - g_snakePlayer2.cx)*(pos.cx - g_snakePlayer2.cx)) +
                         ((pos.cy - g_snakePlayer2.cy)*(pos.cy - g_snakePlayer2.cy)))

      if(d < 5){
        g_snakePlayer2.hp = g_snakePlayer2.hp-1; 

        if(g_snakePlayer2.hp > 0){
        g_snakePlayer1.trail = [];
      }
      else{
        g_snakePlayer1.halt();
        endingSoundEffects[selectedplayers[1]].play();
        g_snakePlayer2.halt();
        g_snakePlayer2.hp = 0;
        alert("Player 2 hit player 1's trail, player 1 wins!");
      }
    }
  }


  if(this.wrap === false){
  if(this.cx < 0 || this.cx > 1190 || this.cy < 0 || this.cy > 990){
    this.hp = this.hp-1;
    console.log(this.hp);
    if(this.hp === 0){
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
  else{
    if(this.cx < 0)
      this.cx = this.cx + 1190;
    if(this.cx > 1190)
      this.cx = 0;
    if(this.cy < 0)
      this.cy = this.cy+990;
    if(this.cy > 990)
      this.cy = 0;
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
