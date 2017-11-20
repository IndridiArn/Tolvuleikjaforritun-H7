// ===================================
// A "HOW MANY PLAYERS" SELECTION MENU
// ===================================


function ModeSelect() {

    this.cx = 100;
    this.cy = 500;

  }

  ModeSelect.prototype.cx = 50;
  ModeSelect.prototype.cy = 100;

  ModeSelect.prototype.render = function(ctx) {
    var gamemode = 4;
    var i;
    var j;
}
    ModeSelect.prototype.setPos = function(cx, cy) {
      this.cx = cx;
      this.cy = cy;
    }
    ModeSelect.prototype.getPos = function() {
      return {
        posX: this.cx,
        posY: this.cy
      }
      console.log(getPos);
    }
