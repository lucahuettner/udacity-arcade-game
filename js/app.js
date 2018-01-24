//Enemies our player must avoid
class Enemy {
  constructor(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    // set random speed for each enemy object
    this.speed = 100 + Math.floor(Math.random() * 200);
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update (dt) {
    this.x += this.speed * dt;

    // checks if enemy moves of screen
    // if true reset enemy to enter the screen again
    this.x > 505 ? this.x = -101 : '';

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // check for collision with player
    if (this.y - player.y == 9) {
      if (player.x < this.x + 75 && player.x + 75 > this.x) {
        // if both are true reset player to start position
        player.reset();
      }
    }
  }

  // Draw the enemy on the screen, required method for game
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
  }

  update (dt) {
    // check for win
    if (this.y == -32) {
      // if true reset player and add new enemy
      this.reset();
      addEnemy();
    }
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // reset method to reset player back to starting position
  reset () {
    this.y = 383;
    this.x = 202;
  }

  handleInput (input) {
    // move if the player presses the arrow keys
    switch (input) {
      case 'left':

        // prevent player from moving off screen
        (this.x >= 101) ? this.x -= 101 : '';
        break;
      case 'up':
        (this.y >= 51) ? this.y -= 83 : '';
        break;
      case 'right':
        (this.x <= 303) ? this.x += 101 : '';
        break;
      case 'down':
        (this.y <= 300) ? this.y += 83 : '';
        break;
      default:

    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let count = 0;

// add Enemy to the lanes
function addEnemy() {
  // check for which lane to place the enemy in
  let y = 0;
  if (count === 0) {
    y = 60;
    count++;
  } else if (count == 1) {
    y = 143;
    count++;
  } else {
    y = 226;
    count = 0;
  }

  const enemy = new Enemy(-101, y);
  allEnemies.push(enemy);
}

// initiate game
addEnemy();
addEnemy();
addEnemy();
let player = new Player(202, 383);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
      };

    player.handleInput(allowedKeys[e.keyCode]);
  });
