

"use strict";
var entityManager = {

  // "PRIVATE" DATA
  _menu: [],
  _thingmenn : [],
  // "PRIVATE" METHODS
  createMenu: function() {
    this._menu.push(new Menu());
  },
  render: function(ctx) {

    var background = new Image();
    background.src = "resizeImageFolder/FPBG.jpg";
    ctx.drawImage(background,0,0); 

    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";

    ctx.fillStyle = "#72EAE7";
    ctx.font = "bold 60px Bungee Shade";
    ctx.fillText("Veldu þinn þingmann", 150, 130);
    if (numbplayers > selectedplayers.length){
    ctx.fillText("Leikmaður ", 100, 280);
    ctx.fillText(selectedplayers.length+1, 570, 280);
    ctx.fillText(" á að velja", 620, 280);
    ctx.shadowBlur = 0;
    }
    if (start === true) {
      ctx.fillText("Hefja leik! ", 400, 250)
    }

    // TODO: Implement this
    this._menu[0].render(ctx);


  }
}
