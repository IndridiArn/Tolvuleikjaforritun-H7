// A generic constructor which accepts an arbitrary descriptor object
//
//
//
//
function botAI(descr) {
  for (var property in descr) {
    this[property] = descr[property];
  }
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
  this.reset_rotation = this.rotation;
  this.rTrail.startX = this.cx;
  this.rTrail.startY = this.cy;
  this.dir = Math.floor((Math.random() * 4) + 1);
  this.snakeplayer = g_snakePlayer1;
  this.distance = 1; // mögulega henda þessu í math.random fall.
  this.startingDir = this.dir;
  this.enemyPos = g_snakePlayer1.oldTrails;
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

botAI.prototype.halfWidth = 10;
botAI.prototype.halfHeight = 10;

botAI.prototype.update = function(du) {
  var botPos = this.rTrail;
  //var playerPos = this.
  var d = Math.sqrt(((botPos.cx - botPos.cx) * (botPos.cx - botPos.cx)) +
    ((botPos.cy - botPos.cy) * (botPos.cy - botPos.cy)))


  if (this.dead === false) {
    //console.log(this.dead);
    silfrid.play();
    if (this.dir === 1) {
      this.distance += 4;
      if (this.distance > 10) {

        if (this.cx < 20 && this.cy < 20) {
          this.dir = 4;
          console.log("þetta er dir 1 fall 2")
        } else if (this.cx > 1180 && this.cy < 20) {
          this.dir = 3;
          console.log("þetta er dir 1 fall 3")
        } else if (this.cx > 1180 && this.cy > 980) {
          this.dir = 3;
          console.log("þetta er dir 1 fall 5")
        } else if (this.cy < 15 && this.cx < 500) {
          this.dir = 4;
          console.log("þetta er dir 1 fall 1");
        } else if (this.cy < 15 && this.cx > 500) {
          this.dir = 3;
          console.log("þetta er dir 1 fall 6")
        }
        //======================================
        // reglur með collision á óvina trail dir = 1
        //======================================
        if (this.distance > 40) {
          //console.log(this.enemyPos.length);
          for (j = 0; j < this.enemyPos.length; j++) {
            if (j % 2 === 0 || j === 0) {
              if ((Math.abs(this.cx - this.enemyPos[j].startX) < 25) && (Math.abs(this.cy - this.enemyPos[j].startY) < 25)) {
                this.dir = Math.floor(Math.random() * 3) + 2;
                //console.log(this.dir);
                console.log("þetta er dir 2 AI klessir á player1 ")
                break;
              }
            }
          }
        }



        //======================================
        // reglur með collision á eigin trail
        //======================================

        if (this.distance > 40) {
          for (i = 0; i < this.oldTrails.length; i++) {
            if (i % 2 === 0 || i === 0) {
              if ((Math.abs(this.cy - this.oldTrails[i].startY)) < 20) {

                if (this.cx < canvas.width / 2) {
                  this.dir = 4;
                  console.log("þetta er dir 1 snákur klessir á snák fallið og fer dir = 4")
                } else if (this.cx > canvas.width / 2) {
                  this.dir = 3;
                  console.log("þetta er dir 1 snákur klessir á snák fallið og fer dir = 3")
                }
              }
            }
          }
        }
      }


      if (this.dir != 1) {
        console.log(this.distance);
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
        this.distance = 0;
      }
    };
    if (this.dir === 2) {
      this.distance += 4;
      if (this.cx <= 20 && this.cy >= 980) {
        this.dir = 4;
        console.log("þetta er dir 2 fall 3")
      } else if (this.cx > 1175 && this.cy >= 980) {
        this.dir = 3;
        console.log("þetta er dir 2 fall 2")
      } else if (this.cy > 970 && this.cx > 500) {
        this.dir = 3;
        console.log("þetta er dir 2 fall 1")
      } else if (this.cy > 970 && this.cx < 500) {
        this.dir = 4;
        console.log("þetta er dir 2 fall 4")
      }
      //======================================
      // reglur með collision á óvina trail dir = 2
      //======================================
      if (this.distance > 40) {
        //console.log(this.enemyPos.length);
        for (j = 0; j < this.enemyPos.length; j++) {
          if (j % 2 === 0 || j === 0) {
            if ((Math.abs(this.cx - this.enemyPos[j].startX) < 25) && (Math.abs(this.cy - this.enemyPos[j].startY) < 25)) {
              this.dir = Math.floor(Math.random() * 3) + 2;
              //console.log(this.dir);
              break;

            }
          }
        }
      }



      //======================================
      // reglur með collision á eigin trail
      //======================================

      if (this.distance > 40) {
        for (i = 0; i < this.oldTrails.length; i++) {
          if (i % 2 === 0 || i === 0) {
            if ((Math.abs(this.cy - this.oldTrails[i].startY)) < 20) {
              if (this.cx < canvas.width / 2) {
                this.dir = 4;
                console.log("þetta er dir 2 snákur klessir á snák fallið og fer dir = 4")
              }
              if (this.cx > canvas.width / 2) {
                this.dir = 3;
                console.log("þetta er dir 2 snákur klessir á snák fallið og fer dir = 3")
              }
            }
          }
        }
      }

      if (this.dir != 2) {
        console.log(this.distance);
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
        this.distance = 0;
      }
    };

    if (this.dir === 3) {
      this.distance += 4;

      if (this.cx < 20 && this.cy < 20) {
        this.dir = 2;
        console.log("þetta er dir 3 fall 2")
      } else if (this.cx < 20 && this.cy > 980) {
        this.dir = 1;
        console.log("þetta er dir 3 fall 3")
      } else if (this.cx < 70 && this.cy < 20) {
        this.dir = 2;
        console.log("þetta er dir 3 fall 5")
      } else if (this.cx < 50) {
        this.dir = Math.floor(Math.random() * 2) + 1
      }

      //else if (Math.abs((this.snakeplayer.cx - this.cx)) < 15) {
      //  this.dir = 1;
      //  console.log("þetta er dir 3 fall 4")
      //}
      //======================================
      // reglur með collision á óvina trail dir = 3
      //======================================
      if (this.distance > 40) {
        //console.log(this.enemyPos.length);
        for (j = 0; j < this.enemyPos.length; j++) {
          if (j % 2 != 0 && j != 0) {
            if ((Math.abs(this.cx - this.enemyPos[j].destX) < 25) && (Math.abs(this.cy - this.enemyPos[j].startY) < 25)) {
              this.dir = Math.floor(Math.random() * 2) + 1;
              console.log("þetta er dir 3 AI klessir á player1 ")
              //console.log(this.dir);
              break;
            }
          }
        }
      }




      //======================================
      // reglur með collision á eigin trail dir = 3
      //======================================
      if (this.distance > 40) {
        for (i = 0; i < this.oldTrails.length; i++) {
          if (i % 2 != 0 && i != 0) {
            if ((Math.abs(this.cx - this.oldTrails[i].startX)) < 20) {
              if (this.cy < canvas.height / 2) {
                if (this.startingDir === 1) this.dir = 2;
                if (this.startingDir === 2) this.dir = 2;
                if (this.startingDir === 3) this.dir = 1;
                if (this.startingDir === 4) this.dir = 1;
                console.log("þetta er dir 3 snákur klessir á snák fallið of er dir = 2")
                break;
              }
              if (this.cy > canvas.height / 2) {
                if (this.startingDir === 1) this.dir = 2;
                if (this.startingDir === 2) this.dir = 2;
                if (this.startingDir === 3) this.dir = 1;
                if (this.startingDir === 4) this.dir = 1;
                console.log("þetta er dir 3 snákur klessir á snák fallið of er dir = 1")
                break;
              }
            }
          }
        }
      }



      if (this.dir != 3) {
        console.log(this.distance);
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
        this.distance = 0;
      }
    };


    if (this.dir === 4) {
      this.distance += 4;
      if (this.cx > 1180 && this.cy < 20) {
        this.dir = 2;
        console.log("þetta er dir 4 fall 1")
      } else if (this.cx > 1180 && this.cy > 980) {
        this.dir = 1;
        console.log("þetta er dir 4 fall 2")
      } else if (this.cx < 20 && this.cy > 980) {
        this.dir = 1;
        console.log("þetta er dir 4 fall 3")
      } else if (this.cx < 20 && this.cy > 980) {
        this.dir = 2;
        console.log("þetta er dir 4 fall 4")
      } else if (this.cx > 1180) {
        this.dir = 2;
      }

      //======================================
      // reglur með collision á óvina trail dir = 4
      //======================================
      if (this.distance > 40) {
        //console.log(this.enemyPos.length);
        for (j = 0; j < this.enemyPos.length; j++) {
          if (j % 2 != 0 && j != 0) {
            if ((Math.abs(this.cx - this.enemyPos[j].startX) < 25) && ((Math.abs(this.cy - this.enemyPos[j].startY)) < 25)) {
              this.dir = Math.floor(Math.random() * 2) + 1;
              console.log("þetta er dir 4 AI klessir á player1 ")
              break;
              //console.log(this.dir);
            }
          }
        }
      }


      //  for (var i = 0; i < this.enemyPos.length; i++) {

      //if((Math.abs(this.cx - this.enemyPos.destX) < 20)&&(Math.abs(this.cy - this.enemyPos.destY)<20))
      //this.dir = (Math.floor(Math.random()*2)+1);
      //console.log("þetta er dir 4, AI klessir á leikmann og dir = 2 ")

      //
      //}


      //======================================
      // reglur með collision á eigin trail
      //======================================

      if (this.distance > 40) {
        for (i = 0; i < this.oldTrails.length; i++) {
          if (i % 2 != 0 && i != 0) {
            if ((Math.abs(this.cx - this.oldTrails[i].startX)) < 20) {
              if (this.cy < canvas.height / 2) {
                if (this.startingDir === 1) this.dir = 1;
                if (this.startingDir === 2) this.dir = 1;
                if (this.startingDir === 3) this.dir = 2;
                if (this.startingDir === 4) this.dir = 1;

                console.log("þetta er dir 4 snákur klessir á snák fallið of er dir = 2")
              }
              if (this.cy > canvas.height / 2) {
                if (this.startingDir === 1) this.dir = 1;
                if (this.startingDir === 2) this.dir = 1;
                if (this.startingDir === 3) this.dir = 2;
                if (this.startingDir === 4) this.dir = 2;

                //this.dir = 2;
                console.log("þetta er dir 4 snákur klessir á snák fallið of er dir = 1")
              }
            }
          }
        }
      }



      if (this.dir != 4) {

        console.log(this.distance);
        this.oldTrails.push(this.rTrail);
        this.rTrail = [];
        this.rTrail.startX = this.cx;
        this.rTrail.startY = this.cy;
        this.distance = 0;
      }
    }
    /*
        if(canvas.width - this.cx > 1190 && canvas.height - this.cy < 15)
        this.dir = 1;

        if(canvas.width - this.cx > 1190 && canvas.height - this.cy > 15 ) this.dir = 2;


        if(canvas.height - this.cy < 15 && canvas.width - this.cx < 15 ) this.dir = 1;
        if(canvas.height-  this.cy > 990 && canvas.width - this.cx < 15 ) this.dir = 4;

        if(canvas.height - this.cy < 15 && canvas.width - this.cx > 1190 ) this.dir = 4;
        if(canvas.height-  this.cy < 990 && canvas.width - this.cx > 1190 ) this.dir = 1;
    */
    //console.log(canvas.height);

    if (this.dir === 1)
      this.cy -= this.vel * du;
    else if (this.dir === 2)
      this.cy += this.vel * du;
    else if (this.dir === 3)
      this.cx -= this.vel * du;
    else if (this.dir === 4)
      this.cx += this.vel * du;

    //this.wrapPosition();

    this.updateTrail();

    this.collidesWith();

    this.getPowerUp(currentPowerUp);


  }

};

botAI.prototype.reset = function() {
  this.cx = this.reset_cx;
  this.cy = this.reset_cy;
  this.rotation = this.reset_rotation;

  this.halt();
};

botAI.prototype.halt = function() {
  this.vel = 0;
  this.dead = true;
  //console.log(this.dir + " : hérna dó fíflið");
  //console.log(this.cx + ": þetta eru X hnit dauða");
  //console.log(this.cy + ": þetta eru Y hnit dauða");
  //console.log(this.rTrail.startX + " "+ this.rTrail.startY);
  //console.log(this.oldTrails[1].destY);
  //console.log(this.oldTrails[1].destX);
  console.log(this.oldTrails);
  var str2 = [];
  for (var i = 0; i < this.oldTrails.length; i++) {
    str2 = JSON.stringify(this.oldTrails[i]);
    console.log(str2);
    //console.log(this.rTrail[i] + " þetta er forlykkja rTrail")
    //console.log(this.trail[i] + " þetta er forlykkja trail")
    //console.log(this.oldTrails[i] + " þetta er forlykkja oldTrails")

  }
  process.kill();
};

botAI.prototype.updateTrail = function() {
  this.trail.push({
    cx: this.cx,
    cy: this.cy
  });

  this.rTrail.destX = this.cx;
  this.rTrail.destY = this.cy;
}

botAI.prototype.renderTrail = function(ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 5;
  ctx.shadowBlur = 20;
  ctx.shadowColor = "white";

  // gömlu línurnar renderaðar
  if (this.oldTrails.length > 0)
    for (var i = 0; i < this.oldTrails.length; i++) {
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

botAI.prototype.wrapPosition = function() {

  /*
    if (this.cy + g_snakeSprite.img.height < 0) this.cy += myCanvas.height;
    if (this.cy - g_snakeSprite.img.width > myCanvas.width) this.cy -= myCanvas.width;
    if (this.cx + g_snakeSprite.img.height < 0) this.cx += myCanvas.height;
    if (this.cx - g_snakeSprite.img.width > myCanvas.width) this.cx -= myCanvas.width;
  */



};
botAI.prototype.render1 = function(ctx) {
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



botAI.prototype.getPowerUp = function(powerup) {

  var d = Math.sqrt(((powerup.cx - this.cx) * (powerup.cx - this.cx)) +
    ((powerup.cy - this.cy) * (powerup.cy - this.cy)))

  if (d < 20 && powerup.active === true) {
    console.log("Powerup! " + "Number " + powerup.type);
    powerup.counter = 1000;
    powerup.active = false;


    if (currentPowerUp.type === 0)
      this.vel = this.vel + 1;

    else if (currentPowerUp.type === 1) {
      if (this.number === 1) {
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

      if (this.number === 2) {
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

      if (this.number === 3) {
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

      if (this.number === 4) {
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
    } else if (currentPowerUp.type === 2) {
      if (this.number === 1) {
        g_snakePlayer2.vel = g_snakePlayer2.vel - 1;
        g_snakePlayer3.vel = g_snakePlayer3.vel - 1;
        g_snakePlayer4.vel = g_snakePlayer4.vel - 1;
      }

      if (this.number === 2) {
        g_snakePlayer1.vel = g_snakePlayer1.vel - 1;
        g_snakePlayer3.vel = g_snakePlayer3.vel - 1;
        g_snakePlayer4.vel = g_snakePlayer4.vel - 1;
      }

      if (this.number === 3) {
        g_snakePlayer1.vel = g_snakePlayer1.vel - 1;
        g_snakePlayer2.vel = g_snakePlayer2.vel - 1;
        g_snakePlayer4.vel = g_snakePlayer4.vel - 1;
      }

      if (this.number === 4) {
        g_snakePlayer1.vel = g_snakePlayer1.vel - 1;
        g_snakePlayer2.vel = g_snakePlayer2.vel - 1;
        g_snakePlayer3.vel = g_snakePlayer3.vel - 1;
      }


    } else if (currentPowerUp.type === 3)
      this.wrap = true;
  }


};




botAI.prototype.collidesWith = function() {

  if (this.wrap === false) {
    if (this.cx < 0 || this.cx > 1190 || this.cy < 0 || this.cy > 990) {
      //g_snakePlayer1.halt();
      //g_snakePlayer2.halt();
      //updateplaying = null;
      if (this.number === 1) {
        g_snakePlayer1.halt();
        //g_botPlayer1.halt();
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
        //endingSoundEffects[selectedplayers[1]].play();
        console.log("Player 4 hit the wall!");
      }
      if (this.number === 5) {
        g_botPlayer1.halt();
        //g_botPlayer1.halt();
        silfrid.pause();
        endingSoundEffects[selectedplayers[0]].play();
        console.log("Player 1 hit the wall!");
      }
    }
  }


  if (this.wrap === true) {
    if (this.cx < 0) {
      this.cx = this.cx + 1190;
      this.oldTrails.push(this.rTrail);
      this.rTrail = [];
      this.rTrail.startX = this.cx;
      this.rTrail.startY = this.cy;
    }
    if (this.cx > 1190) {
      this.cx = 0;
      this.oldTrails.push(this.rTrail);
      this.rTrail = [];
      this.rTrail.startX = this.cx;
      this.rTrail.startY = this.cy;
    }
    if (this.cy < 0) {
      this.cy = this.cy + 990;
      this.oldTrails.push(this.rTrail);
      this.rTrail = [];
      this.rTrail.startX = this.cx;
      this.rTrail.startY = this.cy;
    }
    if (this.cy > 990) {
      this.cy = 0;
      this.oldTrails.push(this.rTrail);
      this.rTrail = [];
      this.rTrail.startX = this.cx;
      this.rTrail.startY = this.cy;
    }
  }


  //silfrid.currentTime = 0;

};
