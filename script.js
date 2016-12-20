let Simon = function() {

  // sequence of colors
  // 1: green, 2: red, 3: yellow, 4: blue
  this.arrayGame = []

  // Push a random number [1,5) to sequence
  this.gameMove = function() {
    this.arrayGame.push(Math.floor(Math.random() * (5 - 1) + 1))
  }

  // Player's move
  this.playerMove = function(color) {
    this.arrayPlayer.push(color)
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

  this.playSequence = function(i) {
    setTimeout( () => {
      this.lightColor(this.arrayGame[i], 1000)
      if (++i < this.arrayGame.length) {          // If i > 0, keep going
        this.playSequence(i);       // Call the loop again, and pass it the current value of i
      }
    }, 1500);
  }

  this.gameTurn = function() {
    this.gameMove()
    this.playSequence(0)
  }
}
/*
var simon = new Simon()
simon.gameMove()
simon.gameMove()
simon.gameMove()
*/
const options = document.querySelectorAll("#main div")

function test(e) {
  console.log(e.target.attributes["data-color"].value)
}

options.forEach(option => option.addEventListener("click", test))
