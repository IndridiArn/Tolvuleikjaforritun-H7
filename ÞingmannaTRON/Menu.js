// =========================
// THE PLAYER SELECTION MENU
// =========================

function Menu() {
    var thingmenn = 8;
    this.cx = 100;
    this.cy = 500;
  }

  Menu.prototype.cx = 50;
  Menu.prototype.cy = 100;


  Menu.prototype.update = function(du) {
  };

  Menu.prototype.render = function(ctx) {
    var i;
    var j;
    for (i = 0, j = 0; i < g_sprites.length; i++, j += 140) {
      //
      g_sprites[i].drawWrappedCentredAt(ctx, this.cx + j, this.cy, 0);
    };

    Menu.prototype.setPos = function(cx, cy) {
      this.cx = cx;
      this.cy = cy;
    }

    Menu.prototype.getPos = function() {
      return {
        posX: this.cx,
        posY: this.cy
      }
      console.log(getPos);
    }
  }

