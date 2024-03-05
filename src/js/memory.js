document.addEventListener('DOMContentLoaded', () => {

  const cardArray = [
    { name: 'carnivore', img: '../images/memory/carnivore.png' },
    { name: 'carnivore', img: '../images/memory/carnivore.png' },
    { name: 'corn', img: '../images/memory/corn.png' },
    { name: 'corn', img: '../images/memory/corn.png' },
    { name: 'lettuce', img: '../images/memory/lettuce.png' },
    { name: 'lettuce', img: '../images/memory/lettuce.png' },
    { name: 'peas', img: '../images/memory/peas.png' },
    { name: 'peas', img: '../images/memory/peas.png' },
    { name: 'sunflower', img: '../images/memory/sunflower.png' },
    { name: 'sunflower', img: '../images/memory/sunflower.png' },
    { name: 'zombie', img: '../images/memory/zombie.png' },
    { name: 'zombie', img: '../images/memory/zombie.png' }
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  resultDisplay.textContent = `Parejas encontradas: 0`;
  const timerDisplay = document.querySelector('#timer');
  timerDisplay.textContent = `Tiempo: 0:00`;

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  let startTime;
  let timerInterval;

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
      return startTimer();
    }
    window.location.href = 'http://127.0.0.1:5500/index.html'
  });

  function startTimer() {
    startTime = new Date().getTime();
    let timeLeft = 120; // 2 minutos en segundos
    timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = timeLeft - Math.floor((now - startTime) / 1000);
      const minutes = Math.floor(distance / 60);
      const seconds = distance % 60;
      timerDisplay.textContent = `Tiempo: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      if (distance < 0) {
        timerDisplay.textContent = `Tiempo: 0:00`;
        clearInterval(timerInterval)
        Swal.fire({
          position: "center",
          icon: "error",
          title: 'Tiempo máximo alcanzado',
          showConfirmButton: false,
          timer: 2000
          }).then(() => {
            window.location.href = 'http://127.0.0.1:5500/index.html';
        })
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    const endTime = new Date().getTime();
    const totalTime = endTime - startTime;
    const totalTimeSeconds = Math.floor(totalTime / 1000);
    const minutes = Math.floor(totalTimeSeconds / 60);
    const seconds = totalTimeSeconds % 60;
    const formattedTime = `${minutes} minutos y ${seconds} segundos`;
    saveAndCheckBestTime(totalTime, formattedTime);
  }

  function saveAndCheckBestTime(currentTime, formattedTime) {
    const bestTime = localStorage.getItem('bestTime');
    if (bestTime === null || currentTime < Number(bestTime)) {
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
          localStorage.setItem('bestTime', currentTime.toString());
          localStorage.setItem('userName', userName);
          Swal.fire({
            title: `¡Felicidades ${userName}! Has logrado un nuevo récord.`,
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
      const userName = localStorage.getItem('userName') || "Anónimo";
      const bestTimeSeconds = Number(bestTime) / 1000;
      const bestMinutes = Math.floor(bestTimeSeconds / 60);
      const bestSeconds = bestTimeSeconds % 60;
      Swal.fire({
        title: `Felicitaciones, has encontrado todas las parejas en ${formattedTime}.`, 
        text:`El mejor tiempo es ${bestMinutes} minutos y ${bestSeconds} segundos, establecido por ${userName}.`, 
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

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement('img');
      card.setAttribute('src', '../images/memory/back.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  function restartGame() {
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    resultDisplay.textContent = `Parejas encontradas: 0`;
    timerDisplay.textContent = `Tiempo: 0:00`;
    cardArray.sort(() => 0.5 - Math.random()); // Reordenar las cartas
    createBoard();
    startTimer();
  }

  function checkForMatch() {
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      Toastify({
        text: "Haz hecho un match!",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
        }).showToast();
      cards[optionOneId].setAttribute('src', '../images/memory/blank.png');
      cards[optionTwoId].setAttribute('src', '../images/memory/blank.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', '../images/memory/back.png');
      cards[optionTwoId].setAttribute('src', '../images/memory/back.png');
      cards[optionOneId].addEventListener('click', flipCard)
      cards[optionTwoId].addEventListener('click', flipCard)
      Toastify({
        text: "Intentalo nuevamente",
        duration: 3000
        }).showToast();
    }
    
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = `Parejas encontradas: ${cardsWon.length}`;
    if (cardsWon.length === cardArray.length / 2) {
      stopTimer();
    }
  }

  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    this.removeEventListener('click', flipCard)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 200);
    }
  }
  createBoard();
});
