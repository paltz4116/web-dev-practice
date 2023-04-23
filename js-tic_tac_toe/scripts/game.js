function startNewGame() {
  if (players[0].name === `` || players[1].name === ``) {
    alert(`Please set custom player name.`);
    return;
  }

  activePlayerName.innerHTML = players[activePlayer].name;
  gameSection.style.display = `block`;
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

  if (seletedField.tagName !== "LI") {
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

  switchPlayer();
}
