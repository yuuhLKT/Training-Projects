const binaryInput = document.getElementById("binary");
const decimalInput = document.getElementById("decimal");
const result = document.getElementById("result")

// Aceitar apenas 0 ou 1
binaryInput.addEventListener("input", () => {
  const binaryValue = binaryInput.value;
  if (!/^[01]*$/.test(binaryValue)) {
    binaryInput.value = binaryValue.replace(/[^01]/g, "");
  }
});

// Aceitar apenas números positivos de 0 a 9 (DECIMAL)
decimalInput.addEventListener("input", () => {
  const decimalValue = decimalInput.value;
  if (!/^[0-9]*$/.test(decimalValue)) {
    decimalInput.value = decimalValue.replace(/[^0-9]/g, "");
  }
});

// Conversor de Decimal para Binário
decimalInput.addEventListener("input", () => {
  const decValue = parseInt(decimalInput.value);
  if (!isNaN(decValue)) {
    binaryInput.value = decValue.toString(2);
  } else {
    binaryInput.value = "";
  }
  displayResult();
});

// Conversor de Binário para Decimal
binaryInput.addEventListener("input", () => {
  const binValue = binaryInput.value;
  const decValue = parseInt(binValue, 2);
  if (!isNaN(decValue)) {
    decimalInput.value = decValue;
  } else {
    decimalInput.value = "";
  }
  displayResult();
});


function displayResult() {
  if (binaryInput.value === "" && decimalInput.value === "") {
    result.textContent = "";
  } else {
    result.textContent = "O resultado é " + binaryInput.value + " (em binário) e " + decimalInput.value + " (em decimal)";
  }
}
