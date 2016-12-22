let Simon = function() {

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

  // "iluminates" simon piece by changing color during time and returning to original
  function lightColor(color, time) {
    const colors = ["#29a529", "#a52929", "#a5a529", "#5656d8"]
    const item = document.querySelector(`div[data-color="${color}"]`)

    function setColor(color) {
      if (color) {
        return item.style.setProperty("background-color", colors[color - 1])
      } else {
        item.style.removeProperty("background-color")
      }
    }

    setColor(color)
    const timeout = setTimeout(setColor, time)
  }

  // Plays the sequence using lightColor(). Recursive function with timeout
  this.playSequence = function(i) {
    let ligTime = 1000
    let timTime = 1500

    if (arrayGame.length > 20) {
      ligTime = 500
      timTime = 750

    } else if  (arrayGame.length > 10) {
      ligTime = 700
      timTime = 1000
    }

    setTimeout( () => {
      lightColor(arrayGame[i], ligTime)
      this.playSound(arrayGame[i])

      if (++i < arrayGame.length) {          // If i > 0, keep going
        this.playSequence(i);       // Call the loop again, and pass it the current value of i
      }
    }, timTime);
  }


  // Game turn function. Add a movement to sequence and play it
  this.gameTurn = function() {
    gameMove()
    this.playSequence(0)
  }

  function restart() {
    arrayGame = []
    index = 0
    console.log("Missmatch! GAME OVER. Restarting game...");
  }

  // Player's turn
  this.playerTurn = function(color) {
    if (color == arrayGame[index] &&
    index + 1 < arrayGame.length) {
      index++
      lightColor(color, 500)
      console.log("coincidence, keep guessing")
      return

    } else if (color == arrayGame[index] &&
      index + 1 == arrayGame.length) {
        index = 0
        lightColor(color, 500)
        console.log("Correct sequence!")
        this.gameTurn()
        return

    } else {
      // If not match, restart game if in strict mode or play sequence again if not
      this.strict ? restart() : this.playSequence(0)
    }
  }

  this.playSound = function(e) {
    let id;
    typeof e == "number" ? id = e : id = e.target.attributes["data-color"].value
    const audio = document.querySelector(`#sound${id}`)
    audio.play();
  }

}

var simon = new Simon()

const options = document.querySelectorAll("#main div")
const countDiv = document.querySelector("#count")
const startBtn = document.querySelector("button")
const strictMode = document.querySelector("input")

function start() {
  simon.gameTurn()
}

function play(e) {
  simon.playerTurn(e.target.attributes["data-color"].value)
  simon.playSound(e)
}

function strict() {
  this.checked ? simon.strict = true : simon.strict = false
}

options.forEach(option => option.addEventListener("click", play))
startBtn.addEventListener("click", start)
strictMode.addEventListener("click", strict)

/*
TO DO:
* avoid play function or options.eventListener and playSequence() run simultaneously

*/
