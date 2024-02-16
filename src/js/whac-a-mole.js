const squares = document.querySelectorAll('.square')
const timeLeft = document.getElementById('time-left')
const score = document.getElementById('score')
const container = document.getElementById('container')

let timerId = null
let result = 0
let hitPosition
let currentTime = 30

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('punch')
    square.classList.remove('mole')
    square.classList.add('hole')
  })

  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.remove('hole')
  randomSquare.classList.add('mole')

  hitPosition = randomSquare.id
}

container.addEventListener('mousedown', () => {
  container.classList.remove('cursor-hammer-up')
  container.classList.add('cursor-hammer-down')
  setTimeout(() => {
    container.classList.remove('cursor-hammer-down')
    container.classList.add('cursor-hammer-up')
  }, 200);
})

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition){
      square.classList.remove('mole')
      square.classList.add('punch')
      result ++
      score.textContent = result
      hitPosition = null
    }
  })
})

function moveMole(){
  timerId = setInterval( randomSquare, 800)
}

moveMole()

function countDown() {
  currentTime--
  timeLeft.textContent = currentTime

  if (currentTime == 10) {
    clearInterval(timerId)
    timerId = setInterval( randomSquare, 500)
  } else  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    squares.forEach(square => {
      square.classList.remove('mole')
      square.classList.remove('punch')
      square.classList.add('hole')
    })
    alert(`SE ACABO EL TIEMPO! Tu puntaje final es: ${result}`)
  }
 
}

let countDownTimerId = setInterval(countDown, 1000)