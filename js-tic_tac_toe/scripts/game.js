function startNewGame() {
  if (players[0].name === `` || players[1].name === ``) {
    alert(`Please set custom player name.`);
    return;
  }
  resetGame();

  activePlayerName.innerHTML = players[activePlayer].name;
  gameSection.style.display = `block`;
}

function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOver.firstElementChild.innerHTML = `You won <span id="winner-name">Player name</span>!`;
  gameOver.style.display = `none`;

  let gameFieldIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameFieldItem = gameField.children[gameFieldIndex];
      gameFieldItem.innerHTML = ``;
      gameFieldItem.classList.remove(`disabled`);
      gameFieldIndex++;
    }
  }
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  activePlayerName.innerHTML = players[activePlayer].name;
}

function selectGameField(event) {
  const seletedField = event.target;

  if (seletedField.tagName !== "LI" || gameIsOver === true) {
    return;
  }

  const selectedColumn = seletedField.dataset.col - 1;
  const selectedrow = seletedField.dataset.row - 1;

  if (gameData[selectedrow][selectedColumn] !== 0) {
    return;
  }

  seletedField.innerHTML = players[activePlayer].symbol;
  seletedField.classList.add(`disabled`);

  gameData[selectedrow][selectedColumn] = activePlayer + 1;

  const winnerId = checkGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  switchPlayer();
  currentRound++;
}

function checkGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      //check row
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }

    if (
      //check column
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    //check top left to the bottom right
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    //check bottom left to the top right
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOver.style.display = `block`;

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    const gameOverSpan = document.querySelector(`#winner-name`);

    gameOverSpan.innerHTML = winnerName;
  } else {
    gameOver.firstElementChild.innerHTML = `It's draw!`;
  }
}
