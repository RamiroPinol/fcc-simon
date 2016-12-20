let Simon = function() {
  this.index = 0
  // sequence of colors
  // 1: green, 2: red, 3: yellow, 4: blue
  this.arrayGame = []

  // Push a random number [1,5) to sequence
  this.gameMove = function() {
    this.arrayGame.push(Math.floor(Math.random() * (5 - 1) + 1))
  }

  // "iluminates" simon piece by changing color during time and returning to original
  this.lightColor = function(color, time) {
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

    if (this.arrayGame.length > 20) {
      ligTime = 500
      timTime = 750

    } else if  (this.arrayGame.length > 10) {
      ligTime = 700
      timTime = 1000
    }

    setTimeout( () => {
      this.lightColor(this.arrayGame[i], ligTime)
      if (++i < this.arrayGame.length) {          // If i > 0, keep going
        this.playSequence(i);       // Call the loop again, and pass it the current value of i
      }
    }, timTime);
  }


  // Game turn function. Add a movement to sequence and play it
  this.gameTurn = function() {
    this.gameMove()
    this.playSequence(0)
  }

  // Player's turn
  this.playerTurn = function(color) {
    if (color == this.arrayGame[this.index] &&
    this.index + 1 < this.arrayGame.length) {
      this.index++
      this.lightColor(color, 500)
      return ("coincidence, keep guessing")

    } else if (color == this.arrayGame[this.index] &&
      this.index + 1 == this.arrayGame.length) {
        this.index = 0
        this.lightColor(color, 500)
        console.log("Correct sequence, gameTurn() should be called")
        this.gameTurn()
        return

    } else {
      this.index = 0
      return console.log("no coincidence, game over. game should restart")
    }
  }



}

var simon = new Simon()
simon.gameTurn()

const options = document.querySelectorAll("#main div")

function play(e) {
  simon.playerTurn(e.target.attributes["data-color"].value)
}

options.forEach(option => option.addEventListener("click", play))

/*
TO DO:
* avoid play function or options.eventListener and playSequence() run simultaneously

*/
