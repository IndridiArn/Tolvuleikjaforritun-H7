//
//function resizeImage{}

/* @pj preload ="unit-siggi-ingi.png";*/
//var image = "unit-siggi-ingi.png"
//image.style.width = '50%'
//image.style.height ='auto'

function ModeSelect() {

    this.cx = 100;
    this.cy = 500;
    //this.wrapPosition();
  }

  ModeSelect.prototype.cx = 50;
  ModeSelect.prototype.cy = 100;

  //_thingmenn: [],

  //_bShowThing: true,

  ModeSelect.prototype.update = function(du) {
    // I DID THIS BIT FOR YOU. NICE, AREN'T I? truly so
    //jú gríðarlega flott.
  };
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


    /*
  ModeSelect.prototype.nrOfPlayers = 8;
  ModeSelect.prototype.wPadding = 0;
  ModeSelect.prototype.hPadding = 0;
  //ModeSelect.prototype.thingmenn =


  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var canvas_width = canvas.width;
  var canvas_height = canvas.height;

  function ModeSelect() {
    this.wPadding = canvas.width / 5;
    this.hPadding = canvas.height / 3;
  }


  ModeSelect.prototype.render = function(ctx) {
    var i;
    var j;
    for (i = 0, j = this.wPadding; i < g_sprites.length; i += 2, j += this.wPadding) {

      ctx.fillRect(j - 90, this.hPadding - 125, 180, 250, "Red");
      ctx.stroke();
      g_sprites[i].drawWrappedCentredAt(ctx, j, this.hPadding, 0);
      ctx.fillRect(j - 90, (this.hPadding * 2) - 125, 180, 250, "Blue");
      ctx.stroke();
      g_sprites[i + 1].drawWrappedCentredAt(ctx, j, this.hPadding * 2, 0);
    };
  };
  */
