// Object to recreate a Simon game.
// The param div is the DIV where the object will display info strings
// Param div should be string selector like "#info", ".class", etc
let Simon = function(div) {

  let running = false
  let index = 0
  // sequence of colors
  // 1: green, 2: red, 3: yellow, 4: blue
  let arrayGame = []

  this.level = function() {
    return arrayGame.length
  }

  this.strict = false

  // Push a random number [1,5) to sequence
  function gameMove() {
    arrayGame.push(Math.floor(Math.random() * (5 - 1) + 1))
  }


  // Play sound for respective color (1: green, 2: red, 3: yellow, 4: blue)
  function playSound(color) {
    const audio = document.querySelector(`#sound${color}`)
    audio.play();
  }


  // Function to change color adding or removing the "active" CSS class
  function changeColor(color) {

    // Select corresponding color button depending on color number
    const button = document.querySelector(`div[data-color="${color}"]`)

    // If button has active class, remove it, otherwise add it.
    button.classList.contains(`active${color}`) ?
      button.classList.remove(`active${color}`) :
      button.classList.add(`active${color}`)
  }


  // Turn on simon piece by playing sound and changing color during time
  function activateColor(color, time) {

    playSound(color)

    // Change color and return to original with a timeout
    changeColor(color)
    const timeout = setTimeout(() => changeColor(color), time)
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

  // Public method to start a new game.
  this.start = function() {
    // Start first or after-win game
    if (arrayGame.length == 0) {
      gameTurn()
      showInfo("#count")

    // reset current game and start new one
    } else {
      restart()
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
    const LIGHT_TIME = 500
    const DISPLAY_TIME = 2500
    if (!running) {

      // Player makes a correct color answer
      if (color == arrayGame[index] && index + 1 < arrayGame.length) {
        index++
        activateColor(color, LIGHT_TIME)
        return

      // When player makes final correct answer at level 20 (index 19), wins game.
      } else if (color == arrayGame[index] && index == 19) {
        activateColor(color, LIGHT_TIME)
        showInfo("#count", "YOU WIN!")
        setTimeout(() => this.start(), DISPLAY_TIME)
        return

      // Player correctly answers last color and the whole sequence
      } else if (color == arrayGame[index] && index + 1 == arrayGame.length) {
        index = 0
        activateColor(color, LIGHT_TIME)
        showInfo("#count", "CORRECT!")
        gameTurn()
        return

      } else {
        // If not match, restart game if in strict mode or play sequence again if not
        showInfo("#count", "WRONG")
        index = 0
        this.strict ? setTimeout(() => this.start(), DISPLAY_TIME) : playSequence(0)
      }
    }
  }

  // Method to display info strings on div. It displays default after 2.5s.
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
const strictMode = document.querySelector("#strict")

// Changes button "Start" text to "Reset" when game running
function changeButton() {
  simon.level() > 0 ? startBtn.innerHTML = "RESET" : startBtn.innerHTML = "START"
}

function start() {
  simon.start()
  changeButton()
}

function play(e) {
  simon.playerTurn(e.target.dataset.color)
}

// Add btnLighted class to simulate an active button
function lightButton(button) {
  button.classList.contains("btnLighted") ?
    button.classList.remove("btnLighted") : button.classList.add("btnLighted")
}

// Activate or deactivate Strict Mode
function strict() {
  simon.strict ? simon.strict = false : simon.strict = true
  lightButton(this)
}

options.forEach(option => option.addEventListener("click", play))
startBtn.addEventListener("click", start)
strictMode.addEventListener("click", strict)
