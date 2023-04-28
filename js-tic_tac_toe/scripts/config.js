function openPlayerConfig(event) {
  editedPlayer = Number(event.target.dataset.playerid);
  playerConfigOverlay.style.display = "block";
  backdrop.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlay.style.display = "none";
  backdrop.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutput.innerHTML = "";

  const inputData = document.querySelector("#playername");
  inputData.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim(); //스페이스바로 이름을 채우는것에 대한 예외처리

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error");
    errorsOutput.innerHTML = "Please enter a valid name.";
    return;
  }

  const updatedPlayerData = document.querySelector(
    `#player${editedPlayer}-data`
  );
  updatedPlayerData.children[1].innerHTML = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName;

  closePlayerConfig();
}
