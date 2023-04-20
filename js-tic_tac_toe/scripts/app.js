const playerConfigOverlay = document.querySelector("#config-overlay");
const backdrop = document.querySelector("#backdrop");
const editPlayer1Btn = document.querySelector("#edit-player1");
const editPlayer2Btn = document.querySelector("#edit-player2");
const cancelConfig = document.querySelector("#cancel-config");

editPlayer1Btn.addEventListener("click", openPlayerConfig);
editPlayer2Btn.addEventListener("click", openPlayerConfig);

cancelConfig.addEventListener("click", closePlayerConfig);
backdrop.addEventListener("click", closePlayerConfig);
