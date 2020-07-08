let playerChoice = ''
let systemChoice = ''
const boxes = []
let shouldPlayerPlay = true
let gameOver = false

let playerWins = 0
let systemWins = 0
let draws = 0

const color = (choice) => {
  if (choice === 'O') {
    return '#79CADC'
  }
  return '#3A98D4'
}

const state = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0,
]

function choosePlayer(choice) {
  playerChoice = choice
  if (playerChoice === 'O') {
    systemChoice = 'X'
  } else {
    systemChoice = 'O'
  }
  const choiceElement = document.getElementById('choice')
  choiceElement.classList.add('hidden')
  const gameElement = document.getElementById('game')
  gameElement.classList.remove('hidden')
  const choiceValueElement = document.getElementById('choice-value')
  choiceValueElement.innerText = playerChoice
  choiceValueElement.style.color = color(playerChoice)
}

function changeTexts() {
  for(let i = 0; i < 9; i++) {
    if (state[i] === 1) {
      boxes[i].innerText = playerChoice
      boxes[i].style.color = color(playerChoice)
    } else if(state[i] === -1) {
      boxes[i].innerText = systemChoice
      boxes[i].style.color = color(systemChoice)
    } else {
      boxes[i].innerText = ''
    }
  }
}

function updateScore() {
  const oWinsElement = document.getElementById('o-wins')
  const xWinsElement = document.getElementById('x-wins')
  let playerWinsElement
  let systemWinsElement
  if (playerChoice === 'O') {
    playerWinsElement = oWinsElement
    systemWinsElement = xWinsElement
  } else {
    playerWinsElement = xWinsElement
    systemWinsElement = oWinsElement
  }
  const drawsElement = document.getElementById('draws')
  playerWinsElement.innerText = playerWins
  systemWinsElement.innerText = systemWins
  drawsElement.innerText = draws
}

function init() {
  for (let i = 0; i < 9; i++) {
    boxes.push(document.getElementById(`box-${i}`))
  }
  changeTexts()
  updateScore()
}

init()

function moveByPlayer(position) {
  state[position] = 1
}

const getARandomEmptyPosition = () => {
  const emptyPositions = []
  for(let i = 0; i < 9; i++) {
    if (state[i] === 0) {
      emptyPositions.push(i)
    }
  }

  if (emptyPositions.length === 0) {
    return -1
  }

  const randomIndex = Math.floor(Math.random() * emptyPositions.length)
  return emptyPositions[randomIndex]
}

function moveBySystem() {
  if (gameOver) {
    return
  }
  const randomPosition = getARandomEmptyPosition()
  if (randomPosition < 0) {
    gameOver = true
    return
  }

  state[randomPosition] = -1
}

function check(array) {
  const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]
  for (let i = 0; i < winningStates.length; i++) {
    const [a, b, c] = winningStates[i]
    if (array.includes(a) && array.includes(b) && array.includes(c)) {
      gameOver = true
      break
    }
  }
}

function updateIfGameOver() {
  if (gameOver) {
    return
  }
  const positionsWithStateZero = []
  const positionsWithStateOne = []
  const positionsWithStateMinusOne = []

  for (let i = 0; i < 9; i++) {
    if (state[i] === 1) {
      positionsWithStateOne.push(i)
    } else if (state[i] === -1) {
      positionsWithStateMinusOne.push(i)
    } else {
      positionsWithStateZero.push(i)
    }
  }

  if (!gameOver) {
    check(positionsWithStateOne)
    if (gameOver) {
      playerWins += 1
    }
  }

  if (!gameOver) {
    check(positionsWithStateMinusOne)
    if (gameOver) {
      systemWins += 1
    }
  }

  if (!gameOver) {
    if (positionsWithStateZero.length === 0) {
      draws += 1
      gameOver = true
    }
  }
}

function reset() {
  for (let i = 0; i < 9; i++) {
    state[i] = 0
  }
  changeTexts()
  gameOver = false
  updateScore()
}

function wait(ms)
{
  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while(d2-d < ms);
}

document.querySelectorAll('.box').forEach(item => {
  item.addEventListener('click', event => {
    if (!shouldPlayerPlay || gameOver) {
      return
    }

    shouldPlayerPlay = false
    const position = +item.id.split('-')[1]
    if (state[position] === 0) {
      moveByPlayer(position)
      changeTexts()
      updateIfGameOver()
      moveBySystem()
      changeTexts()
      updateIfGameOver()
    }
    shouldPlayerPlay = true
    if (gameOver) {
      reset()
    }
  })
})
