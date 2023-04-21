let editedPlayer = 0;
let activePlayer = 0;
const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const playerConfigOverlay = document.querySelector("#config-overlay");
const backdrop = document.querySelector("#backdrop");
const editPlayer1Btn = document.querySelector("#edit-player1");
const editPlayer2Btn = document.querySelector("#edit-player2");
const cancelConfig = document.querySelector("#cancel-config");
const formElement = document.querySelector("form");
const errorsOutput = document.querySelector("#config-errors");
const startNewBtn = document.querySelector(`#start-btn`);
const gameSection = document.querySelector(`#active-game`);
// const gameField = document.querySelectorAll(`#game-board li`);
const gameField = document.querySelector(`#game-board`);
const activePlayerName = document.querySelector(`#active-player-name`);

editPlayer1Btn.addEventListener("click", openPlayerConfig);
editPlayer2Btn.addEventListener("click", openPlayerConfig);

cancelConfig.addEventListener("click", closePlayerConfig);
backdrop.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewBtn.addEventListener(`click`, startNewGame);

// for(const gameBoard of gameField){
//   gameBoard.addEventListener(`click`, selectGameField);
// }

gameField.addEventListener(`click`, selectGameField);
