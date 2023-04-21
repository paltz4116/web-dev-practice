let editedPlayer = 0;
const players = [
  {
    name: "Player 1",
    symbol: "X",
  },
  {
    name: "Player 2",
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

editPlayer1Btn.addEventListener("click", openPlayerConfig);
editPlayer2Btn.addEventListener("click", openPlayerConfig);

cancelConfig.addEventListener("click", closePlayerConfig);
backdrop.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);
