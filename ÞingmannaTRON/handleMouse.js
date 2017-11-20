// ==============
// MOUSE HANDLING 
// ==============

"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
var g_mouseX = 0,
    g_mouseY = 0;

var playerpick = 0; // which player is choosing now
var numbplayers = 0; // how many players should choose
var pickedplayers = 0; // how many players HAVE chosen already
var selectedplayers = []; // array of selected players
var checker = true;
var playing = false; // game ongoing
var info = false; // info button active/inactive
var tilBaka = false; // back button active/inactive


// Handler for the player selection
function handleMouse(evt) {

  if(start === false && picking === true && playing === false){

  g_mouseX = evt.clientX - g_canvas.offsetLeft;
  g_mouseY = evt.clientY - g_canvas.offsetTop;

  var button = evt.buttons === undefined ? evt.which : evt.buttons;
  if (!button) return;

  var minniY = 450;
  var meiriY = 550;
  var minniX = 0;
  var meiriX = 140;


    for (var k = 0; k < numbplayers;k++) {
      for (var i = 0; i < startingSoundEffects.length; i++) {
        if (g_mouseY > minniY && g_mouseY < meiriY) {
          if (g_mouseX > minniX && g_mouseX < meiriX) {
            startingSoundEffects[i].play();
            playerpick = i;
            //console.log(i);
            console.log(selectedplayers.length);
            selectedplayers.push(playerpick);
            g_sprites[i].glow = true;
            if(selectedplayers.length === 1)
              g_sprites[i].glowColor = '#00FFFF';
            if(selectedplayers.length === 2)
              g_sprites[i].glowColor = '#00FF00';
            if(selectedplayers.length === 3)
              g_sprites[i].glowColor = 'red';
            if(selectedplayers.length === 4)
              g_sprites[i].glowColor = 'purple';

          }
        }
        minniX += 140;
        meiriX += 140;
      }
    }
    pickedplayers = numbplayers;
    
    if(numbplayers === selectedplayers.length){
      lofsongur.pause();
      lofsongur.currentTime = 0;
  }
  }
  }

console.log(selectedplayers[0])
console.log(selectedplayers[1])

// Handler for the number of players selection
function handleNumPlayers(evt) {


  g_mouseX = evt.clientX - g_canvas.offsetLeft;
  g_mouseY = evt.clientY - g_canvas.offsetTop;

  var button = evt.buttons === undefined ? evt.which : evt.buttons;
  if (!button) return;

  var player1StartHnitX = 60;
  var player1StopHnitX = 210;

  var player2StartHnitX = 360;
  var player2StopHnitX = 510;

  var player3StartHnitX = 660;
  var player3StopHnitX = 810;

  var player4StartHnitX = 960;
  var player4StopHnitX = 1110;

  var playersStartHnitY = 400;
  var playersStopHnitY = 500;

  //leikreglur button coords
  var leikreglurXstart = 340
  var leikreglurXstop = 830
  var leikreglurYstart = 750
  var leikreglurYstop = 810

  //back button coords
  var tilbakaXstart = 500
  var tilbakarXstop = 735
  var tilbakaYstart = 870
  var tilbakaYstop = 905


    if (g_mouseY > playersStartHnitY && g_mouseY < playersStopHnitY) {
      if (g_mouseX > player1StartHnitX && g_mouseX < player1StopHnitX) {
        numbplayers = 1;
        checker = false;
        picking = true;
      }
    }
    if (g_mouseY > playersStartHnitY && g_mouseY < playersStopHnitY) {
      if (g_mouseX > player2StartHnitX && g_mouseX < player2StopHnitX) {
        numbplayers = 2;
        checker = false;
        picking = true;
      }
    }
    if (g_mouseY > playersStartHnitY && g_mouseY < playersStopHnitY) {
      if (g_mouseX > player3StartHnitX && g_mouseX < player3StopHnitX) {
        numbplayers = 3;
        checker = false;
        picking = true;
      }
    }
    if (g_mouseY > playersStartHnitY && g_mouseY < playersStopHnitY) {
      if (g_mouseX > player4StartHnitX && g_mouseX < player4StopHnitX) {
        numbplayers = 4;
        checker = false;
        picking = true;
      }
    }

    //handlemouse for game rules
    if (g_mouseY > leikreglurYstart && g_mouseY < leikreglurYstop) {
      if (g_mouseX > leikreglurXstart && g_mouseX < leikreglurXstop) {

        checker = false;
        info = true
        picking = false;
      }
    }

    //handlemouse for the "back" button
    if (g_mouseY > tilbakaYstart && g_mouseY < tilbakaYstop) {
      if (g_mouseX > tilbakaXstart && g_mouseX < tilbakarXstop) {

        checker = false;
        tilBaka = true;
        picking = false;
        info = false;
      }
    }
  }

  //Handler for the start button
  function handleStartgame(evt) {

    g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;

    var button = evt.buttons === undefined ? evt.which : evt.buttons;
    if (!button) return;


    var gameXstart = 400;
    var gameXstop = 800;
    var gameYstart = 170;
    var gameYstop = 300;


      if (g_mouseY > gameYstart && g_mouseY < gameYstop) {
        if (g_mouseX > gameXstart && g_mouseX < gameXstop) {
          checker = false;
          playing = true;
          start = true
          silfrid.play();
        }
      }
    }


// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
//window.addEventListener("mousemove", handleMouse);
window.addEventListener("mousedown", handleNumPlayers);

window.addEventListener("mousedown", handleStartgame);