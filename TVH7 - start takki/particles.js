function particle(descr) {
  for (var property in descr) {
    this[property] = descr[property];
  }
  particle.prototype.cx = 100
  particle.prototype.cy = 100
  this.velx = (Math.random() * 5) - 2.5
  this.vely = (Math.random() * 5) - 2.5
  particle.prototype.lifeSpan = 500;
  particle.prototype.curAlpha = 1;

}

particle.prototype.update = function() {
  if(this.lifeSpan > 0)
        this.lifeSpan -= 1;
  this.cx += this.velx
  this.cy += this.vely
  

};

particle.prototype.render = function(ctx) {
        if(this.lifeSpan > 0){
        ctx.globalAlpha = this.curAlpha;
        ctx.globalAlpha -= 0.02;
        this.curAlpha = ctx.globalAlpha;
      
        ctx.beginPath();
        ctx.fillRect(this.cx,this.cy,10,10)
        //ctx.arc(this.cx,this.cy,10,0,2*Math.PI);
        //ctx.fill();

        ctx.globalAlpha = 1;
      }
  
};

function drawParticles(ctx, particles) {
  
  for(var i = 0; i < particles.length; i++){
    particles[i].update()
    particles[i].render(ctx)
  }
  
  
}