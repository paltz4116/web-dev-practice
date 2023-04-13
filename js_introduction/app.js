const inputElement = document.querySelector("#product-name");
const remainingCharsElement = document.querySelector("#remaining-chars");

function updateRemainingChars(event) {
  const enteredText = event.target.value;
  const textLength = enteredText.length;
  const remainingChars = inputElement.maxLength - textLength;
  remainingCharsElement.innerText = remainingChars;

  if(remainingChars <= 10){
    inputElement.classList.add("warning");
    remainingCharsElement.classList.add("warning");
  }
  else if(inputElement.classList.contains("warning") && remainingChars > 10){
    inputElement.classList.remove("warning");
    remainingCharsElement.classList.remove("warning");
  }
}

inputElement.addEventListener("input", updateRemainingChars);
