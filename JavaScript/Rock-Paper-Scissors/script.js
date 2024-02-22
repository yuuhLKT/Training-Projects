const computerDisplay = document.getElementById('computer');
const playerDisplay = document.getElementById('player');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');

function playerChoice() {
  possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    const playerSelection = e.target.id;
    playerDisplay.innerHTML = playerSelection;
    computerChoice();
    result()
  }));
}

function computerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  
  if(randomNumber === 1) {
    computerDisplay.innerHTML = 'Pedra';
  } else if(randomNumber === 2) {
    computerDisplay.innerHTML = 'Papel';
  } else {
    computerDisplay.innerHTML = 'Tesoura';
  }
}

function result() {
  if(computerDisplay.innerHTML === playerDisplay.innerHTML) {
    resultDisplay.innerHTML = 'Empate';
    resultDisplay.style.color = 'yellow';
  } else if(computerDisplay.innerHTML === 'Pedra' && playerDisplay.innerHTML === 'Tesoura') { 
    resultDisplay.innerHTML = 'Você perdeu';
    resultDisplay.style.color = 'red';
  } else if(computerDisplay.innerHTML === 'Pedra' && playerDisplay.innerHTML === 'Papel') {
    resultDisplay.innerHTML = 'Você venceu';
    resultDisplay.style.color = 'green';
  } else if(computerDisplay.innerHTML === 'Papel' && playerDisplay.innerHTML === 'Pedra') {
    resultDisplay.innerHTML = 'Você perdeu';
    resultDisplay.style.color = 'red';
  } else if(computerDisplay.innerHTML === 'Papel' && playerDisplay.innerHTML === 'Tesoura') {
    resultDisplay.innerHTML = 'Você venceu';
    resultDisplay.style.color = 'green';
  } else if(computerDisplay.innerHTML === 'Tesoura' && playerDisplay.innerHTML === 'Pedra') {
    resultDisplay.innerHTML = 'Você venceu';
    resultDisplay.style.color = 'green';
  } else if(computerDisplay.innerHTML === 'Tesoura' && playerDisplay.innerHTML === 'Papel') {
    resultDisplay.innerHTML = 'Você perdeu';
    resultDisplay.style.color = 'red';
  }
}

playerChoice();



