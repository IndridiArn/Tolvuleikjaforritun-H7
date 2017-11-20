// Gets the player objuect through the ID number
function getPlayer(number){
    if(number === 1) return g_snakePlayer1;
    else if(number === 2) return g_snakePlayer2;
    else if(number === 3) return g_snakePlayer3;
    else if(number === 4) return g_snakePlayer4;
    else if(number === 5) return g_botPlayer1;

};


// Universal trail collision function
function checkCollision(n1, n2){
    p1 = getPlayer(n1);
    p2 = getPlayer(n2);
    if(n1 != n2)
    var d0 = Math.sqrt( ((p1.cx - p2.cx)*(p1.cx - p2.cx)) +
                        ((p1.cy - p2.cy)*(p1.cy - p2.cy)))

    var len = p1.trail.length;
    if(n1 === n2) len = len-10;
    for(var i = 0; i < len; i++){
      var pos = p1.trail[i];
      var d = Math.sqrt( ((pos.cx - p2.cx)*(pos.cx - p2.cx)) +
                         ((pos.cy - p2.cy)*(pos.cy - p2.cy)))

      if(d < 5 || d0 < 5 && p2.dead === false){

        if(p2.dead === false && p2.number < 5) endingSoundEffects[selectedplayers[n2-1]].play();
        if(p2.dead === false && p2.number === 5) endingSoundEffects[selectedplayers[0]].play();
        p2.halt();
        p2.dead = true;
        console.log("Player " + n2 +  " hit player " + n1 + "'s trail!");

        }

    }

};


// A function to check all collision cases
// through the checkCollision function
function checkAll(pickedplayers) {

  if(gameOver === false) {

  if (pickedplayers === 1){
    checkCollision(1,1);
    checkCollision(1,5);
    checkCollision(5,1);
    checkCollision(5,5);
  }

  if (pickedplayers === 2){
    checkCollision(1,1);
    checkCollision(1,2);
    checkCollision(2,1);
    checkCollision(2,2);
  }

  if (pickedplayers === 3){
    checkCollision(1,1);
    checkCollision(1,2);
    checkCollision(1,3);
    checkCollision(2,1);
    checkCollision(2,2);
    checkCollision(2,3);
    checkCollision(3,1);
    checkCollision(3,2);
    checkCollision(3,3);
  }

  if (pickedplayers === 4){
    checkCollision(1,1);
    checkCollision(1,2);
    checkCollision(1,3);
    checkCollision(1,4);
    checkCollision(2,1);
    checkCollision(2,2);
    checkCollision(2,3);
    checkCollision(2,4);
    checkCollision(3,1);
    checkCollision(3,2);
    checkCollision(3,3);
    checkCollision(3,4);
    checkCollision(4,1);
    checkCollision(4,2);
    checkCollision(4,3);
    checkCollision(4,4);
  }

  }

};
