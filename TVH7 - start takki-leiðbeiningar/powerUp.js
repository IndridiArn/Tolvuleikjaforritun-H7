function powerUp(descr) {
  for (var property in descr) {
    this[property] = descr[property];
  }

}

powerUp.prototype.update = function(du) {
	if(this.active === false)
	  this.counter = this.counter-5;

  if(this.counter < 1 && this.active === false){
    this.type = Math.round(Math.random()*3);
  	this.active = true;
    this.counter = 0;
    this.cx = Math.random() * 1200;
		this.cy = Math.random() * 1000;
  }

};

powerUp.prototype.render = function(ctx) {
	if(this.active === true){
  if(this.type === 0){
      p_sprites[1].scale = 0.25;
      p_sprites[1].drawWrappedCentredAt(ctx,this.cx,this.cy,0);
    }
    //ctx.fillStyle="blue";
  else if(this.type === 1){
    p_sprites[0].scale = 0.25;
    p_sprites[0].drawWrappedCentredAt(ctx,this.cx,this.cy,0);
  }
    //ctx.fillStyle="red";
  else if(this.type === 2){
    p_sprites[2].scale = 0.25;
    p_sprites[2].drawWrappedCentredAt(ctx,this.cx,this.cy,0);
  }
    //ctx.fillStyle="yellow";
  else if(this.type === 3){
    p_sprites[3].scale = 0.25;
    p_sprites[3].drawWrappedCentredAt(ctx,this.cx,this.cy,0);
  }

	//ctx.fillRect(this.cx,this.cy,10,10);
	//ctx.stroke();
  }
};
