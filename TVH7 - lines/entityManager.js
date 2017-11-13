

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
    ctx.fillStyle = "white";
    ctx.font ="bold 60px consolas";
    ctx.fillText("Veldu þinn þingmann í ÞingmannaTron", 25, 100);
    if (numbplayers > selectedplayers.length){
    ctx.fillText("Leikmaður ", 240, 250);
    ctx.fillText(selectedplayers.length+1, 560, 250);
    ctx.fillText(" á að velja", 590, 250);
    }

    // TODO: Implement this
    this._menu[0].render(ctx);

  }
}
