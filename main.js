
const cells = Array.from(document.querySelectorAll("[data-cell]"));
const playerDisplay = document.querySelector(".display-player");
const resetButton = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");

cells.forEach((cell, index) => {
  cell.addEventListener("click", userAction, { once: true });
});


let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = "X";
let isGameActive = "true"


const playerXWon = "playerXWon";
const playerOWon = "playerOWon";
const tie = "tie";


const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6]
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
if (roundWon) {
  announce(currentPlayer === 'X' ? playerXWon : playerOWon);
  isGameActive = false;
  return;
}
if (!board.includes(''))
announce(tie)
};


const announce = (type) => {
  switch (type) {
    case playerOWon:
      announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
      break;
    case playerXWon:
      announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
      break;
    case tie:
      announcer.innerText = 'Tie'
  }
  announcer.classList.remove('hide');

};

const isValidAction(cell) => {
  if (cell.innerText === 'X' || cell.innerText === 'O') {
    return false;
  }
  return true;
};

const updateBoard = (index) => {
  board[index] = currentPlayer;
}


const changePlayer = () => {
  playerDisplay.classList.remove('player${currentPlayer}');
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add('player${currentPlayer}');
}


const userAction = (cell, index) => {
  if(isValidAction(cell) && isGameActive)
    cell.innerText = currentPlayer;
    cell.classList.add('player${currentPlayer}');
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  
};

const resetBoard = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  announcer.classList.add('hide');
  if (currentPlayer === 'O') {
    changePlayer();
  }

  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('playerX');
    cell.classList.remove('playerO');
  });
}


// this will give each element an event listener



