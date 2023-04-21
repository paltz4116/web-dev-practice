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
  if (event.target.tagName !== "LI") {
    return;
  }

  event.target.innerHTML = players[activePlayer].symbol;
  event.target.classList.add(`disabled`);
  switchPlayer();
}
