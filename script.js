let Simon = {
  // sequence of colors
  // 1: green, 2: red, 3: yellow, 4: blue
  arrayGame : [],

  // Push a random number [1,5) to sequence
  gameMove : function() {
    this.arrayGame.push(Math.floor(Math.random() * (5 - 1) + 1))
  },

  // Player's move
  playerMove : function(color) {
    this.arrayPlayer.push(color)
  },
/*
  play : function() {
    this.sequence.map(function(color) {
      if (color == 1) {

      }
    })
  },
  */

  // "iluminates" simon piece by changing color during time and returning to original
  lightColor : function(color, time) {
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
    const timeout = window.setTimeout(setColor, time)
  }
}
