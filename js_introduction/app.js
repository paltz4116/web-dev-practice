const inputElement = document.querySelector("#product-name");
const remainingCharsElement = document.querySelector("#remaining-chars");

function updateRemainingChars(event) {
  const enteredText = event.target.value;
  const textLength = enteredText.length;
  const remainingChars = inputElement.maxLength - textLength;
  remainingCharsElement.innerText = remainingChars;

  if(remainingChars === 0){
    inputElement.classList.add("error");
    remainingCharsElement.classList.add("error");
  }
  else if(remainingChars <= 10){
    inputElement.classList.add("warning");
    remainingCharsElement.classList.add("warning");
    inputElement.classList.remove("error");
    remainingCharsElement.classList.remove("error");
  }
  else{
    inputElement.classList.remove("warning");
    remainingCharsElement.classList.remove("warning");
  }
}

inputElement.addEventListener("input", updateRemainingChars);
