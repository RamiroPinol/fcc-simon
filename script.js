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
    setTimeout( () => {
      this.lightColor(this.arrayGame[i], 1000)
      if (++i < this.arrayGame.length) {          // If i > 0, keep going
        this.playSequence(i);       // Call the loop again, and pass it the current value of i
      }
    }, 1500);
  }

  // Game turn function. Add a movement to sequence and play it
  this.gameTurn = function() {
    this.gameMove()
    this.playSequence(0)
  }

  // Player's move
  this.playerMove = function(color) {
    if (color == this.arrayGame[this.index] &&
    this.index + 1 < this.arrayGame.length) {
      this.index++
      this.lightColor(color, 1000)
      return ("coincidence, keep guessing")

    } else if (color == this.arrayGame[this.index] &&
      this.index + 1 == this.arrayGame.length) {
        this.index = 0
        this.lightColor(color, 1000)
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

function test(e) {
  simon.playerMove(e.target.attributes["data-color"].value)
}

options.forEach(option => option.addEventListener("click", test))

/*
const arr = [1, 3, 4, 2, 2]
let i = 0
function test(color) {
  if (color == arr[i] && i + 1 < arr.length) {
    i++
    return console.log("coincidence", arr.length - i, "items left")
  } else if (color == arr[i] && i + 1 == arr.length) {
    i = 0
    return console.log("coincidence last item")
  } else {
    i = 0
    return console.log("no coincidence")
  }
}
*/
