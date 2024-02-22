const prompt = require('prompt-sync')();

const Colunas = 3;
const Linhas = 3;

const simbolosContador = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const multiplicador = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

function deposito() {
  while (true) {
    const quantidadeDeposito = prompt("Digite a quantidade a depositar: ");
    const deposito = parseFloat(quantidadeDeposito);

    if (isNaN(deposito) || deposito <= 0) {
      console.log("Valor inválido, digite novamente!");
    } else {
      return deposito;
    }
  }
}

function apostarLinha() {
  while (true) {
    const numeroLinhas = prompt("Digite em quantas linhas quer apostar (1-3): ");
    const linhas = parseFloat(numeroLinhas);

    if (isNaN(linhas) || linhas <= 0 || linhas > 3) {
      console.log("Valor inválido, digite novamente!");
    } else {
      return linhas;
    }
  }
}

function aposta(carteira, linha) {
  while (true) {
    const aposta = prompt("Digite quanto você quer apostar por linhas (Saldo atual = " + carteira + "): ");
    const quantidadeApostada = parseFloat(aposta);

    if (isNaN(quantidadeApostada) || quantidadeApostada <= 0 || quantidadeApostada > carteira / linha) {
      console.log("Valor inválido, digite novamente!");
    } else {
      return quantidadeApostada;
    }
  }
}

function rodar() {
  const simbolos = [];
  for (const [simbolo, contador] of Object.entries(simbolosContador)) {
    for (let i = 0; i < contador; i++) {
      simbolos.push(simbolo);
    }
  }
  const resultado = [];
  for (let i = 0; i < Colunas; i++) {
    resultado.push([]);
    const colsSimbolos = [...simbolos];
    for (let j = 0; j < Linhas; j++) {
      const index = Math.floor(Math.random() * colsSimbolos.length);
      const selecionado = colsSimbolos[index];
      resultado[i].push(selecionado);
      colsSimbolos.splice(index, 1);
    }
  }
  return resultado;
}

function transformar(resultado) {
  const coluna = [];
  for (let i = 0; i < Colunas; i++) {
    coluna.push([]);
    for (let j = 0; j < Linhas; j++) {
      coluna[i].push(resultado[j][i]);
    }
  }
  return coluna;
}

function mostrarJackpot(resultado) {
  for (const col of resultado) {
    let colString = "";
    for (const [i, simbolo] of col.entries()) {
      colString += simbolo;
      if (i !== col.length - 1) {
        colString += " | ";
      }
    }
    console.log(colString);
  }
}

function ganhar(resultado, linha, deposito) {
  let ganho = 0;

  for (let col = 0; col < Linhas; col++) {
    const simbolos = resultado[col];
    let iguais = true;

    for (const simbolo of simbolos) {
      if (simbolo != simbolos[0]) {
        iguais = false;
        break;
      }
    }

    if (iguais) {
      ganho += multiplicador[simbolos[0]];
    }
  }

  return ganho;
}

function jogo() {
  let carteira = deposito();

  while (true) {
    const linha = apostarLinha();
    const apostarQuantidade = aposta(carteira, linha);
    carteira -= apostarQuantidade * linha;
    const resultado = rodar();
    const rows = transformar(resultado);
    mostrarJackpot(resultado);
    const win = ganhar(resultado, linha, deposito);
    carteira += win;
    console.log("Você ganhou: " + win.toString() + " reais!");

    if (carteira <= 0) {
      console.log("Você não tem dinheiro!");
      break;
    }

    const jogarNovamente = prompt("Você quer jogar novamente? (S/N): ");

    if (jogarNovamente.toUpperCase() !== "S") {
      console.log("Obrigado por jogar!");
      break;
    }
  }
}

jogo();


