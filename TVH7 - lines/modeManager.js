"use strict";

var modeManager = {
  //PRIVATE DATA
  _selectPlayers : [],
  createmodeManager: function() {
    this._selectPlayers.push(new ModeSelect());
  },
  render: function(ctx){
    ctx.fillStyle = "red";
    ctx.fillRect(60,200,150,100);
    ctx.fillStyle = "white";
    ctx.font ="bold 16px consolas";
    ctx.fillText("1 Player",85,250);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillRect(360,200,150,100);
    ctx.fillStyle = "white";
    ctx.font ="bold 16px consolas";
    ctx.fillText("2 Player",385,250);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillRect(660,200,150,100);
    ctx.fillStyle = "white";
    ctx.font ="bold 16px consolas";
    ctx.fillText("3 Player",685,250);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillRect(960,200,150,100);
    ctx.fillStyle = "white";
    ctx.font ="bold 16px consolas";
    ctx.fillText("4 Player",985,250);
    ctx.stroke();
  }
}
