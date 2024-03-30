const squares = document.querySelectorAll('.square')
const timeLeft = document.getElementById('time-left')
const score = document.getElementById('score')
const container = document.getElementById('container')

let timerId = null
let countDownTimerId = null
let result = null
let hitPosition
let timerSetting = 30

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
      Toastify({
        text: "Haz hecho un hit!",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
        }).showToast();
      square.classList.remove('mole')
      square.classList.add('punch')
      result ++
      score.textContent = result
      hitPosition = null
    }
  })
})

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

function moveMole(){
  currentTime = timerSetting
  result = 0
  timeLeft.textContent = currentTime
  score.textContent = result
  timerId = setInterval( randomSquare, 800)
  countDownTimerId = setInterval(countDown, 1000)
}

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
    saveAndCheckBestTime(result)
  }
}

function saveAndCheckBestTime(currentScore) {
  const bestScore = localStorage.getItem('bestScore');
  if (bestScore === null || currentScore > Number(bestScore)) {
    Swal.fire({
      title: '¡Has establecido un nuevo récord!',
      html: `<input type="text" id="userNameInput" class="swal2-input" placeholder="Jugador">`,
      focusConfirm: false,
      preConfirm: () => {
        return document.getElementById('userNameInput').value;
      }
    }).then((result) => {
      if (result.value) {
        const userName = result.value || 'Jugador';
        localStorage.setItem('bestScore', currentScore.toString());
        localStorage.setItem('userName', userName);
        Swal.fire({
          title: `¡Felicidades ${userName}, has logrado un nuevo récord de ${currentScore} hits!`,
          confirmButtonText: 'Jugar de nuevo',
          showCancelButton: true,
          cancelButtonText: 'Salir'
        }).then((result) => {
          if (result.isConfirmed) {
            restartGame();
          } else {
            window.location.href = 'http://127.0.0.1:5500/index.html';
          }
        });
      }
    });
  } else {
    console.log('lalala')
    const userName = localStorage.getItem('userName') || "Anónimo";
    const bestScore = Number(localStorage.getItem('bestScore'));
    Swal.fire({
      title: `Se acabo el tiempo! tu puntaje final es ${currentScore} hits.`, 
      text:`El record es ${bestScore} hits, establecido por ${userName}.`, 
      confirmButtonText: 'Jugar de nuevo',
      showCancelButton: true,
      cancelButtonText: 'Salir'
    }).then((result) => {
      if (result.isConfirmed) {
        restartGame();
      } else {
        window.location.href = 'http://127.0.0.1:5500/index.html';
      }
    })
  }
}

function restartGame() {
  moveMole()
}

Swal.fire({
  title: "¿Estás listo para comenzar?",
  icon: "question",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, vamos!",
  cancelButtonText: "Cancelar"
}).then((result) => {
  if (result.isConfirmed) {
    return moveMole();
  }
  window.location.href = 'http://127.0.0.1:5500/index.html'
});