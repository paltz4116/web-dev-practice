const calSumBtnElement = document.querySelector("#calculator button");

function calculateSum() {
  const userNum = document.querySelector("#user-number");
  let enteredNum = Number(userNum.value);

  let sum = 0;

  while (enteredNum > 0) {
    sum = sum + enteredNum;
    enteredNum--;
  }

  //  for(let i = 1; i <= enteredNum; i++){
  //     sum = sum + i;
  //  }

  const outputResult = document.querySelector("#calculated-sum");
  outputResult.innerHTML = sum;
  outputResult.style.display = "block";
}

calSumBtnElement.addEventListener("click", calculateSum);

const highlightLinksBtn = document.querySelector("#highlight-links button");

function highlightlinks() {
  const anchorElements = document.querySelectorAll("#highlight-links a");

  for (const anchorElement of anchorElements) {
    anchorElement.classList.add("highlight");
  }
}

highlightLinksBtn.addEventListener("click", highlightlinks);

const dummyUserData = {
  firstName: "YongHa",
  lastName: "Kim",
  age: 47,
};

const displayUserDataBtn = document.querySelector("#user-data button");

function displayUserData() {
  const outputDataElement = document.querySelector("#output-user-data");

  outputDataElement.innerHTML = ""; // clear all elements in ul.

  for (const key in dummyUserData) {
    const newUserData = document.createElement("li");
    newUserData.innerHTML = key.toUpperCase() + ": " + dummyUserData[key];
    outputDataElement.append(newUserData);
  }
}

displayUserDataBtn.addEventListener("click", displayUserData);

const rollDiceBtn = document.querySelector("#statistics button");

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function deriveNum() {
  const targetNum = document.querySelector("#user-target-number");
  const enteredNum = targetNum.value;
  const diceRollsList = document.querySelector("#dice-rolls");

  diceRollsList.innerHTML = "";

  let rolledTargetNum = false;
  let numberOfRolls = 0;

  while (!rolledTargetNum) {
    const rolledNum = rollDice();
    const newRollList = document.createElement("li");

    newRollList.innerHTML = "Roll" + numberOfRolls + ": " + rolledNum;
    diceRollsList.append(newRollList);
    rolledTargetNum = enteredNum == rolledNum;
    numberOfRolls++;
  }

  const outputTotalRolls = document.querySelector("#output-total-rolls");
  const outputTargetNum = document.querySelector("#output-target-number");

  outputTargetNum.innerHTML = enteredNum;
  outputTotalRolls.innerHTML = numberOfRolls;
}

rollDiceBtn.addEventListener("click", deriveNum);
