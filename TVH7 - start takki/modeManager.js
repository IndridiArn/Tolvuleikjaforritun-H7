"use strict";

var modeManager = {
  //PRIVATE DATA
  _selectPlayers : [],


  createmodeManager: function() {
    this._selectPlayers.push(new ModeSelect());
  },
    render: function(ctx) {
    var background = new Image();
    background.src = "resizeImageFolder/FPBG.jpg";

    ctx.drawImage(background,0,0);

    function drawBorder(xPos, yPos, width, height, thickness = 2) {
      ctx.fillStyle = "#72EAE7";
      ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
    }

    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    drawBorder(60, 400, 150, 100);
    ctx.fillStyle = "black";
    ctx.fillRect(65, 405, 140, 90);
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Bungee Shade";
    ctx.fillText("1", 117, 460);
    ctx.stroke();
    drawBorder(360, 400, 150, 100);
    ctx.fillStyle = "black";
    ctx.fillRect(365, 405, 140, 90);
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Bungee Shade";
    ctx.fillText("2", 417, 460);
    ctx.stroke();
    drawBorder(660, 400, 150, 100);
    ctx.fillStyle = "black";
    ctx.fillRect(665, 405, 140, 90);
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Bungee Shade";
    ctx.fillText("3", 717, 460);
    ctx.stroke();
    drawBorder(960, 400, 150, 100);
    ctx.fillStyle = "black";
    ctx.fillRect(965, 405, 140, 90);
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Bungee Shade";
    ctx.fillText("4", 1017, 460);
    ctx.stroke();
    ctx.fillStyle = "#72EAE7";
    ctx.font = "bold 90px Bungee Shade";
    ctx.fillText("ÞingmannaTron!", 90, 250);
    ctx.stroke();
    ctx.font = "bold 60px Bungee Shade";
    ctx.fillText("Veldu fjölda þingmanna", 85, 650);
    ctx.stroke();

    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.fillRect(325,735,525,100);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(330,740,515,90);
    ctx.stroke();
    ctx.shadowBlur = 50;
    ctx.shadowColor = "white";
    ctx.fillStyle = "white";
    ctx.font = "bold 60px Bungee Shade";
    ctx.fillText("Leikreglur", 350, 800);

    ctx.shadowBlur = 0;

    //<link href="https://fonts.googleapis.com/css?family=Black+Ops+One|Bungee+Inline|Bungee+Shade|Monoton|Press+Start+2P|Russo+One" rel="stylesheet">

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