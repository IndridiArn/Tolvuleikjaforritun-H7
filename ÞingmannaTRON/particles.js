// ========================
// FANCY PARTICLE EXPLOSION
// ========================

// Each particle has it's own random velocity
function particle(descr) {
  for (var property in descr) {
    this[property] = descr[property];
  }
  particle.prototype.cx = 100
  particle.prototype.cy = 100
  this.velx = (Math.random() * 2.5) - 1.25
  this.vely = (Math.random() * 2.5) - 1.25
  particle.prototype.lifeSpan = 500;
  particle.prototype.curAlpha = 1;

}

// Allow it to fan out while it's still alive
particle.prototype.update = function() {
  if(this.lifeSpan > 0)
        this.lifeSpan -= 1;
  this.cx += this.velx
  this.cy += this.vely
  

};

// Make the particles dissipate as they travel
// further from the source.
particle.prototype.render = function(ctx) {
        if(this.lifeSpan > 0){
        ctx.globalAlpha = this.curAlpha;
        ctx.globalAlpha -= 0.01;
        this.curAlpha = ctx.globalAlpha;
      
        ctx.beginPath();
        ctx.fillRect(this.cx,this.cy,10,10)
        //ctx.arc(this.cx,this.cy,10,0,2*Math.PI);
        //ctx.fill();

        ctx.globalAlpha = 1;
      }
  
};

// Simple draw function. Called when a player
// dies.
function drawParticles(ctx, particles) {
  
  for(var i = 0; i < particles.length; i++){
    particles[i].update()
    particles[i].render(ctx)
  }
  
  
}