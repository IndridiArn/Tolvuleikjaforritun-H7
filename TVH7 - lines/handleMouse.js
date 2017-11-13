// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
var g_mouseX = 0,
  g_mouseY = 0;
var playerpick = 0;
var numbplayers = 0;
var pickedplayers = 0;
var selectedplayers = [];
var checker = true;

function handleMouse(evt) {

  g_mouseX = evt.clientX - g_canvas.offsetLeft;
  g_mouseY = evt.clientY - g_canvas.offsetTop;

  //console.log(g_mouseX + " hérna er músin staðsett");
  //// If no button is being pressed, then bail
  //if (!evt.which) return;
  // If no button is being pressed, then bail
  var button = evt.buttons === undefined ? evt.which : evt.buttons;
  if (!button) return;
  //entityManager.playSoundSelect(g_mouseX, g_mouseY);

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
            console.log(i);
            selectedplayers.push(playerpick);
          }
        }
        minniX += 140;
        meiriX += 140;
      }
    }
    pickedplayers = numbplayers;
  }

console.log(selectedplayers[0])
console.log(selectedplayers[1])

function handleNumPlayers(evt) {


  g_mouseX = evt.clientX - g_canvas.offsetLeft;
  g_mouseY = evt.clientY - g_canvas.offsetTop;

  //console.log(g_mouseX + " hérna er músin staðsett");
  //// If no button is being pressed, then bail
  //if (!evt.which) return;
  // If no button is being pressed, then bail
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


  var playersStartHnitY = 200;
  var playersStopHnitY = 300;


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
  }




// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
//window.addEventListener("mousemove", handleMouse);
window.addEventListener("mousedown", handleNumPlayers);
