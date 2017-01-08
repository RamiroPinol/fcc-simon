// Objct to recreate a Simon game.
// The param div is the DIV where the object will display info strings
// Param div should be string selector like "#info", ".class", etc
let Simon = function(div) {

  let running = false
  let index = 0
  // sequence of colors
  // 1: green, 2: red, 3: yellow, 4: blue
  let arrayGame = []

  this.strict = false

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

    if (arrayGame.length > 14) {
      lightTime = 500
      timeoutTime = 750

    } else if  (arrayGame.length > 7) {
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
  gameTurn = function() {
    gameMove()
    playSequence(0)
  }

  // Public method to start game.
  this.start = function() {
    if (arrayGame.length == 0) {
      gameTurn()
      showInfo("#count")
    }
  }

  function restart() {
    arrayGame = []
    index = 0
  }

  // Player's turn
  this.playerTurn = function(color) {
    if (!running) {

      // Player makes a correct color answer
      if (color == arrayGame[index] && index + 1 < arrayGame.length) {
        index++
        activateColor(color, 500)
        return

      // !!! Acá debería cortar cuando ganas el juego. No corta.
      } else if (color == arrayGame[index] && index == 5) {
        activateColor(color, 500)
        showInfo("#count", "YOU WIN!")
        restart()
        return

      // Player correctly answers last color and the whole sequence
      } else if (color == arrayGame[index] && index + 1 == arrayGame.length) {
        index = 0
        activateColor(color, 500)
        showInfo("#count", "CORRECT!")
        gameTurn()
        return

      } else {
        // If not match, restart game if in strict mode or play sequence again if not
        showInfo("#count", "WRONG")
        this.strict ? restart() : playSequence(0)
      }
    }
  }

  // Method to display info strings on div. It displays default after 3s.
  function showInfo(div, info = "LEVEL: " + arrayGame.length, repeat = true) {
    const infoDiv = document.querySelector(div)
    infoDiv.innerHTML = info

    // Recursive callback only if info string was provided
    if (arguments.length > 1) {
      const timeout = setTimeout( () => showInfo(div), 2500);
    }
  }

}

var simon = new Simon()

const options = document.querySelectorAll("#main div")
const startBtn = document.querySelector("button")
const strictMode = document.querySelector("input")

// Start a game. Checks for empty simon array (no game started) in order to run only once.
function start() {
  simon.start()
}

function play(e) {
  simon.playerTurn(e.target.dataset.color)
}

// Activate or deactivate Strict Mode
function strict() {
  this.checked ? simon.strict = true : simon.strict = false
}

options.forEach(option => option.addEventListener("click", play))
startBtn.addEventListener("click", start)
strictMode.addEventListener("click", strict)

/*
TO DO:
* display win if guess 20 steps
* change start button to reset when playing
* BUG cuando erras no funciona bien despues de mostrar de vuelta.
*/
