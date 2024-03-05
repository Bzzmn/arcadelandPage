const grid = document.querySelector('.breakout-grid')
const blockWidth = 100
const blockHeight = 20
// create block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.topLeft = [xAxis, yAxis + blockHeight] 
  }
}

// all my blocks
const blocks = [
  new Block(10, 270)
]

// draw my block
function addBlock() {
const block = document.createElement('div')
block.classList.add('breakout-block')
block.style.left = '100px'
block.style.bottom = '50px'
grid.appendChild(block)
}

addBlock()

