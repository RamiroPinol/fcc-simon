let Simon = function() {

  let running = false
  let index = 0
  // sequence of colors
  // 1: green, 2: red, 3: yellow, 4: blue
  let arrayGame = []

  this.strict = false

  this.showCount = function() {
    return arrayGame.length;
  }

  // Push a random number [1,5) to sequence
  function gameMove() {
    arrayGame.push(Math.floor(Math.random() * (5 - 1) + 1))
  }


  // Turn on simon piece by playing sound and changing color during time
  function activateColor(color, time) {
    const colors = ["#29a529", "#a52929", "#a5a529", "#5656d8"]
    const item = document.querySelector(`div[data-color="${color}"]`)

    // Select audio for button
    const audio = document.querySelector(`#sound${color}`)
    audio.play();

    // Function to change color adding or removing the background-color property
    function setColor(color) {
      if (color) {
        return item.style.setProperty("background-color", colors[color - 1])
      } else {
        item.style.removeProperty("background-color")
      }
    }

    // Change color and return to original with a timeout
    setColor(color)
    const timeout = setTimeout(setColor, time)
  }


  // Plays the sequence using activateColor(). Recursive function with timeout
  function playSequence(i) {
    running = true
    let lightTime = 1000
    let timeoutTime = 1500

    if (arrayGame.length > 20) {
      lightTime = 500
      timeoutTime = 750

    } else if  (arrayGame.length > 10) {
      lightTime = 700
      timeoutTime = 1000
    }

    setTimeout( () => {
      activateColor(arrayGame[i], lightTime)
      // If i < sequence length call the loop again with current value of i
      ++i < arrayGame.length ? playSequence(i) : running = false
    }, timeoutTime);
  }


  // Game turn function. Add a movement to sequence and play it
  this.gameTurn = function() {
    gameMove()
    playSequence(0)
  }

  function restart() {
    arrayGame = []
    index = 0
    console.log("Missmatch! GAME OVER. Restarting game...");
  }

  // Player's turn
  this.playerTurn = function(color) {
    if (!running) {

      // Player makes a correct color answer
      if (color == arrayGame[index] && index + 1 < arrayGame.length) {
        index++
        activateColor(color, 500)
        console.log("coincidence, keep guessing")
        return

      // Player correctly answers last color and the whole sequence
      } else if (color == arrayGame[index] && index + 1 == arrayGame.length) {
        index = 0
        activateColor(color, 500)
        console.log("Correct sequence!")
        this.gameTurn()
        return

      } else {
        // If not match, restart game if in strict mode or play sequence again if not
        this.strict ? restart() : playSequence(0)
      }
    }
  }

}

var simon = new Simon()

const options = document.querySelectorAll("#main div")
const countDiv = document.querySelector("#count")
const startBtn = document.querySelector("button")
const strictMode = document.querySelector("input")

// Start a game. Checks for empty simon array (no game started) in order to run only once.
function start() {
  if (simon.showCount() == 0) {
    simon.gameTurn()
  }
}

function play(e) {
  simon.playerTurn(e.target.dataset.color)
}

// Activate or deactivate Strict Mode
function strict() {
  this.checked ? simon.strict = true : simon.strict = false
}


function showInfo(e) {
  //countDiv.innerHTML = "Count: " + simon.showCount()
  console.log(e);
}

options.forEach(option => option.addEventListener("click", play))
startBtn.addEventListener("click", start)
strictMode.addEventListener("click", strict)

/*
TO DO:
* when guess patern or win or lose, etc, show the info on count window
*/
