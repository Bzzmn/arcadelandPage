document.addEventListener('DOMContentLoaded', () => {
  //Card options
  const cardArray = [
    {
      name: 'carnivore',
      img: '../images/memory/carnivore.png' 
    }, 
    {
      name: 'carnivore',
      img: '../images/memory/carnivore.png' 
    }, 
    {
      name: 'corn',
      img: '../images/memory/corn.png' 
    }, 
    {
      name: 'corn',
      img: '../images/memory/corn.png' 
    }, 
    {
      name: 'lettuce',
      img: '../images/memory/lettuce.png' 
    }, 
    {
      name: 'lettuce',
      img: '../images/memory/lettuce.png' 
    }, 
    {
      name: 'peas',
      img: '../images/memory/peas.png' 
    }, 
    {
      name: 'peas',
      img: '../images/memory/peas.png' 
    }, 
    {
      name: 'sunflower',
      img: '../images/memory/sunflower.png' 
    }, 
    {
      name: 'sunflower',
      img: '../images/memory/sunflower.png' 
    }, 
    {
      name: 'zombie',
      img: '../images/memory/zombie.png' 
    }, 
    {
      name: 'zombie',
      img: '../images/memory/zombie.png' 
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  const timerDisplay = document.querySelector('#timer')

  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  let startTime
  let timerInterval
  let endGameTimeout

  function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
      const currentTime = new Date();
      const timeElapsed = new Date(currentTime - startTime);
      const minutes = timeElapsed.getUTCMinutes();
      const seconds = timeElapsed.getUTCSeconds();
      timerDisplay.textContent = `Tiempo: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }, 1000)
  
    endGameTimeout = setTimeout(() => {
      alert('Tiempo máximo alcanzado')
      window.location.href = 'http://127.0.0.1:5500/src/index.html'
    }, 120000); // 300000 ms = 5 minutos
  }

  function stopTimer() {
    clearInterval(timerInterval)
    clearTimeout(endGameTimeout)
  }
  
  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++){
      let card = document.createElement('img')
      card.setAttribute('src', '../images/memory/back.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
    startTimer()
  }

  //check for matches
  function checkForMatch() {
    let cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (cardsChosen[0] === cardsChosen[1]) {
      alert('Has hecho match')
      cards[optionOneId].setAttribute('src', '../images/memory/blank.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].setAttribute('src', '../images/memory/blank.png')
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      alert('Intentalo nuevamente')
      cards[optionOneId].setAttribute('src', '../images/memory/back.png')
      cards[optionOneId].addEventListener('click', flipCard)
      cards[optionTwoId].setAttribute('src', '../images/memory/back.png')
      cards[optionTwoId].addEventListener('click', flipCard)
    }

    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Felicitaciones! Las encontraste todas!'
      stopTimer()
    }
  } 

  // flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    this.removeEventListener('click', flipCard)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }
  createBoard()

})