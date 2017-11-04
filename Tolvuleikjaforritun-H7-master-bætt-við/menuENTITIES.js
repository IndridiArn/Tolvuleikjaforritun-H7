var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var startingSoundEffects = [
 bjarniAud = new Audio('sounds/intro-bjarni-ben.wav'),
 guddiAud = new Audio('sounds/intro-gudlaugur.wav'),
 kataAud = new Audio('sounds/intro-katrin-jak.wav'),
 simmiAud = new Audio('sounds/intro-sigmundur-D.wav'),
 helgiAud = new Audio('sounds/intro-helgi-hrafn.wav'),
 logiAud = new Audio('sounds/intro-logi-einarsson.wav'),
 siggiAud = new Audio('sounds/intro-siggi-ingi.wav'),
 thorgerdurAud = new Audio('sounds/intro-þorgerður-kat.wav')
];

//var tap = new Audio('sounds/intro.mp3');
//var taplag = new Audio('sounds/intro.mp3');
//var taptal = new Audio('sounds/intro.mp3');
//g_canvas.fillStyle = "black";
var prevfillStyle = g_ctx.fillStyle;
g_ctx.fillStyle = "black";
g_ctx.font ="bold 24px consolas";
g_ctx.fillText("ÞingmannaTron", 500, 100);
g_ctx.fillStyle = prevfillStyle;

entityManager.createMenu();

function updateSimulation(du) {
    //   SKOÐA BETUR
    //get sett  aftur upp, breytur frá entities í verkefni7
    //processDiagnostics();
    //  SKOÐA BETUR


    //entityManager.update(du);

    // Prevent perpetual firing!
    //eatKey(Ship.prototype.KEY_FIRE);
}
function gatherInputs(){
  //ónotað gums frá pat
}
var g_images = {};

function renderSimulation(ctx) {

    entityManager.render(ctx);

}


function requestPreloads() {

    var requiredImages = {
	    bjarni : "myndir/betriUnits/unit_bjarni_ben.png",
	    gudlaugur:  "myndir/betriUnits/unit_gudlaugur_thor.png",
      katrin : "myndir/betriUnits/unit_katrin_jak.png",
      simmi : "myndir/betriUnits/unit_simmi_d.png",
      helgi : "myndir/betriUnits/unit-helgi-hrafn.png",
      logi : "myndir/betriUnits/unit-logi-einarsson.png",
      siggi : "myndir/betriUnits/unit-siggi-ingi.png",
      thorgerdur : "myndir/betriUnits/unit-thorgerdur-kat.png"

    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = [];
//var t_sprites = {};

function preloadDone() {

    g_sprites.push(new Sprite(g_images.bjarni));
    g_sprites.push(new Sprite(g_images.gudlaugur));
    g_sprites.push(new Sprite(g_images.katrin));
    g_sprites.push(new Sprite(g_images.simmi));
    g_sprites.push(new Sprite(g_images.helgi));
    g_sprites.push(new Sprite(g_images.logi));
    g_sprites.push(new Sprite(g_images.siggi));
    g_sprites.push(new Sprite(g_images.thorgerdur));
    /*
    t_sprites.bjarni = new Sprite(g_images.bjarni);
    t_sprites.gudlaugur = new Sprite(g_images.gudlaugur);
    t_sprites.katrin = new Sprite(g_images.katrin);
    t_sprites.simmi = new Sprite(g_images.simmi);
    t_sprites.helgi = new Sprite(g_images.helgi);
    t_sprites.logi = new Sprite(g_images.logi);
    t_sprites.siggi = new Sprite(g_images.siggi);
    t_sprites.thorgerdur = new Sprite(g_images.thorgerdur);
    */
    g_main.init();
}



// Kick it off
requestPreloads();
