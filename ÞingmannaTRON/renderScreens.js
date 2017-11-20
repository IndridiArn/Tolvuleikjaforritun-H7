// ===================================
// RENDERING FOR THE GAME RULES SCREEN
// ===================================

function showRules(ctx){
	//clear the canvas
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;;
    ctx.stroke();

    //background
    var background1 = new Image();
    background1.src = "resizeImageFolder/FPBG.jpg";
    ctx.drawImage(background1,0,0);

    //header
    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.font = "bold 90px Bungee Shade";
    ctx.fillText("Leikreglur!", 200, 200);
    ctx.stroke();

    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.font = "bold 50px Bungee Shade";
    ctx.fillText("POWER UPS:", 700, 320);
    ctx.stroke();

    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.font = "bold 50px Bungee Shade";
    ctx.fillText("LEIÐBEININGAR:", 30, 320);
    ctx.stroke();

    ctx.shadowColor = "white";
    ctx.fillStyle = "white";
    ctx.font = "bold 25px Black Ops One";
    ctx.fillText("Markmið ÞINGMANNATRON er að halda", 30,380);
    ctx.fillText("sínum þingmanni sem lengst á lífi. ",30, 410);
    ctx.fillText("Þingmennirnir skilja eftir sig slóð hvert",30, 440);
    ctx.fillText("sem þeir fara. Ef einhver klessir ",30,470);
    ctx.fillText("á, hvort sem það er á veggi borðsins",30,500);
    ctx.fillText("eða á sína eigin slóð eða annarra, þá",30,530);
    ctx.fillText("lætur sá þingmaður lífið samstundis. Sá",30,560);
    ctx.fillText("þingmaður sem fellur síðast sigrar leikinn ",30, 590);
    ctx.fillText("og er kjörinn konungur/drottning Íslands.",30, 620);
    ctx.stroke();

    //powerup images and text

    //BOOM
    var power1 = new Image();
    power1.src = "resizeImageFolder/PowUpClearReSize.png"
    ctx.drawImage(power1,650,350, 50, 50);
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 25px Black Ops One";
    ctx.fillText("Slóð andstæðinga hverfur", 720, 380);
    ctx.stroke();

    //Althingi
    var power2 = new Image();
    power2.src = "resizeImageFolder/resizeAlthingi.png"
    ctx.drawImage(power2,650,420, 50, 50);
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 25px Black Ops One";
    ctx.fillText("Hraði leikmanns eykst", 720, 450);
    ctx.stroke();

    //Cash
    var power3 = new Image();
    power3.src = "resizeImageFolder/resizeCashMáney.png"
    ctx.drawImage(power3,650,490, 50, 50);
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 25px Black Ops One";
    ctx.fillText("Hraði andstæðinga minnkar", 720, 520);
    ctx.stroke();

    //Guardian
    var power4 = new Image();
    power4.src = "resizeImageFolder/resizestundin.png"
    ctx.drawImage(power4,650,560, 50, 50);
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 25px Black Ops One";
    ctx.fillText("Leikmaður kemst í gegnum veggi", 720,590);
    ctx.stroke();




    //player 1 instructions
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.font = "bold 30px Bungee Shade";
    ctx.fillText("Leikmaður 1 ", 20, 700);
    ctx.fillText("W ", 130,750);
    ctx.fillText("A ", 80,800);
    ctx.fillText("S ", 130,800);
    ctx.fillText("D ", 180, 800);
    ctx.shadowBlur = 0;
    ctx.stroke();

    //player 2 instructions
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 30px Bungee Shade";
    ctx.fillText("Leikmaður 2 ", 320, 700);
    ctx.fillText("🡩 ", 430,750);
    ctx.fillText("🡨 ", 370,800);
    ctx.fillText("🡫 ", 430,800);
    ctx.fillText("🡪 ", 490, 800);
    ctx.shadowBlur = 0;
    ctx.stroke();

    //player 3 instructions
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 30px Bungee Shade";
    ctx.fillText("Leikmaður 3 ", 620, 700)
    ctx.fillText("I ", 730,750);
    ctx.fillText("J ", 670,800);
    ctx.fillText("K ", 730,800);
    ctx.fillText("L ", 790, 800);
    ctx.shadowBlur = 0;
    ctx.stroke();

    //player 4 instructions
    ctx.shadowBlur = 50;
    ctx.shadowColor = "72EAE7";
    ctx.font = "bold 30px Bungee Shade";
    ctx.fillText("Leikmaður 4 ", 920, 700)
    ctx.fillText("8 ", 1030,750);
    ctx.fillText("4 ", 970,800);
    ctx.fillText("5 ", 1030,800);
    ctx.fillText("6 ", 1090, 800);
    ctx.shadowBlur = 0;
    ctx.stroke();

    //Til baka
    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.fillRect(475,850,285,80);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(480,855,275,70);
    ctx.stroke();
    ctx.shadowBlur = 50;
    ctx.shadowColor = "white";
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Bungee Shade";
    ctx.fillText("Til baka ", 500, 900)
    ctx.shadowBlur = 0;
    ctx.stroke();
  }


 function renderGameOver(ctx){
 	ctx.shadowBlur = 50;
    ctx.shadowColor = "white";
    ctx.font = "bold 60px Bungee Shade";
    ctx.fillStyle = "white";
    ctx.fillText("Leik lokið!",340,300);
    ctx.fillStyle = winnerCol;
    ctx.fillText(winner, 140, 500);
    ctx.fillStyle = "white";
    ctx.fillText("vinnur!", 690, 500);
    ctx.fillText("Ýttu á R til að spila aftur", 35, 700);
    ctx.shadowBlur = 0;

 }
function startButtonRender(ctx){
 ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.fillStyle = "#72EAE7";
    ctx.fillRect(400,170,400,130);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(405,175,390,120);
    ctx.stroke();
    ctx.fillStyle = "#72EAE7";
    ctx.shadowBlur = 50;
    ctx.shadowColor = "#72EAE7";
    ctx.font = "bold 45px Bungee Shade";
    ctx.fillText("Hefja leik! ", 425, 250)
    ctx.shadowBlur = 0;
}
