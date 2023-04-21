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
  const enteredPlayerName = formData.get("playername").trim();

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
