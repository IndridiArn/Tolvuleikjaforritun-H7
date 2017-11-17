"use strict";

var modeManager = {
  //PRIVATE DATA
  _selectPlayers : [],
  createmodeManager: function() {
    this._selectPlayers.push(new ModeSelect());
  },
    render: function(ctx) {

    function drawBorder(xPos, yPos, width, height, thickness = 2) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
    }
    drawBorder(60, 400, 150, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(60, 400, 150, 100);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px consolas";
    ctx.fillText("1 Player", 85, 450);
    ctx.stroke();
    drawBorder(360, 400, 150, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(360, 400, 150, 100);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px consolas";
    ctx.fillText("2 Player", 385, 450);
    ctx.stroke();
    drawBorder(660, 400, 150, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(660, 400, 150, 100);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px consolas";
    ctx.fillText("3 Player", 685, 450);
    ctx.stroke();
    drawBorder(960, 400, 150, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(960, 400, 150, 100);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px consolas";
    ctx.fillText("4 Player", 985, 450);
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.font = "bold 50px consolas";
    ctx.fillText("ÞingmannaTron!", 400, 200);
    ctx.stroke();

  }
 /* render: function(ctx){
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
  }*/
}
