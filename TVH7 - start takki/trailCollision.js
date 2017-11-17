
function getPlayer(number){
    if(number === 1) return g_snakePlayer1;
    else if(number === 2) return g_snakePlayer2;
    else if(number === 3) return g_snakePlayer3;
    else if(number === 4) return g_snakePlayer4;

};



function checkCollision(n1, n2){
    p1 = getPlayer(n1);
    p2 = getPlayer(n2);

    for(var i = 0; i < p1.trail.length-10; i++){
      var pos = p1.trail[i];
      var d = Math.sqrt( ((pos.cx - p2.cx)*(pos.cx - p2.cx)) +
                         ((pos.cy - p2.cy)*(pos.cy - p2.cy)))

      if(d < 7){

        p2.halt();
        endingSoundEffects[selectedplayers[n2-1]].play();
        p2.dead = true;

        console.log("Player " + n2 +  " hit player " + n1 + "'s trail!");

        }
    
    }

};


function checkAll(pickedplayers) {

  if(gameOver === false) { 

  if (pickedplayers === 1){
    checkCollision(1,1);
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