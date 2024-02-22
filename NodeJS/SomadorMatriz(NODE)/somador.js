const readlineSync = require('readline-sync');

function preencherMatriz(nomeMatriz) {
  let matriz = [];

  console.log(`Digite os valores da ${nomeMatriz}1`);

  for (let i = 0; i < 2; i++) {
      matriz[i] = [];
      for (let j = 0; j < 2; j++) {
          let valor = NaN; 
          while (isNaN(valor)) {
              valor = parseFloat(readlineSync.question(`Digite o valor para na posicao (${i}),(${j}): `));

              if (isNaN(valor)) {
                  console.log("Por favor, digite um número válido.");
              }
          }

          matriz[i][j] = valor;
      }
  }

  return matriz;
}

function exibirMatriz(matriz) {
    console.log(`Matriz:`);
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            process.stdout.write(`[${matriz[i][j]}] `);
        }
        console.log('');
    }
}

function somarMatrizes(matriz1, matriz2) {
    let soma = [];

    for (let i = 0; i < 2; i++) {
        soma[i] = [];
        for (let j = 0; j < 2; j++) {
            soma[i][j] = parseInt(matriz1[i][j]) + parseInt(matriz2[i][j]);
        }
    }

    return soma;
}

function main() {
    const matriz1 = preencherMatriz('Primeira matriz:');
    exibirMatriz(matriz1);

    const matriz2 = preencherMatriz('Segunda matriz:');
    exibirMatriz(matriz2);

    const matrizSoma = somarMatrizes(matriz1, matriz2);

    console.log('Resultado da soma entre as duas matrizes:');
    exibirMatriz(matrizSoma);
}

main();
