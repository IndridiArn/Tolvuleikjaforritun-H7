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
var selectedplayers = [];

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

  for (var i = 0; i < startingSoundEffects.length; i++) {
    if (g_mouseY > minniY && g_mouseY < meiriY) {
      if (g_mouseX > minniX && g_mouseX < meiriX) {
        startingSoundEffects[i].play();
        numbplayers++;
        playerpick = i;
        selectedplayers.push(playerpick);
        console.log(i);
      }
    }

    minniX += 140;
    meiriX += 140;
  }
}
console.log(selectedplayers[0])
console.log(selectedplayers[1])

function handleHover(evt) {

}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
window.addEventListener("mouseover", handleHover);
