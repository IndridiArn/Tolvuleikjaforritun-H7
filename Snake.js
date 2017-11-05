// A generic constructor which accepts an arbitrary descriptor object
function Snake(descr) {
  for (var property in descr) {
    this[property] = descr[property];


  }
  this.rotation = 0;
  this._scale = 1;
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
  this.reset_rotation = this.rotation;
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Snake.prototype.halfWidth = 15;
Snake.prototype.halfHeight = 15;

Snake.prototype.update = function(du) {
  if (g_keys[this.GO_UP]) {
    if (this.dir != 2)
      this.dir = 1;
      this.rotation = 0;
  }
  if (g_keys[this.GO_DOWN]) {
    if (this.dir != 1)
      this.dir = 2;
      this.rotation = 0;
  }
  if (g_keys[this.GO_LEFT]) {
    if (this.dir != 4)
      this.dir = 3;
      this.rotation = 0;
  }
  if (g_keys[this.GO_RIGHT]) {
    if (this.dir != 3)
      this.dir = 4;
      this.rotation = 0;
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

Snake.prototype.updateTrail = function() {
  this.trail.push({
    cx: this.cx,
    cy: this.cy
  });
}

Snake.prototype.renderTrail = function(ctx) {
  for (var i = 0; i < this.trail.length; i++) {

  		ctx.fillRect(this.trail[i].cx, this.trail[i].cy,this.halfWidth,this.halfHeight);
			ctx.stroke();


  }
}

Snake.prototype.wrapPosition = function() {

  /*
    if (this.cy + g_snakeSprite.img.height < 0) this.cy += myCanvas.height;
    if (this.cy - g_snakeSprite.img.width > myCanvas.width) this.cy -= myCanvas.width;

    if (this.cx + g_snakeSprite.img.height < 0) this.cx += myCanvas.height;
    if (this.cx - g_snakeSprite.img.width > myCanvas.width) this.cx -= myCanvas.width;

  */



};

Snake.prototype.render = function(ctx) {
  // (cx, cy) is the centre; must offset it for drawing
  ctx.fillStyle = this.color;
  ctx.fillRect(this.cx,
    this.cy,
    this.halfWidth,
    this.halfHeight);
  this.renderTrail(ctx);
  g_sprites[6].scale = 0.3;
  g_sprites[6].drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  g_sprites[6].scale = 1;
};

Snake.prototype.collidesWith = function() {

  for (var i = 0; i < this.trail.length - 1; i++) {
    var pos = this.trail[i];
    var d = Math.sqrt(((pos.cx - this.cx) * (pos.cx - this.cx)) +
      ((pos.cy - this.cy) * (pos.cy - this.cy)))

    if (d < 1) {
      this.halt();
      //this.trail = [];
    }
  }


};
