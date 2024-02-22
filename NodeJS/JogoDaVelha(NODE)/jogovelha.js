const readlineSync = require('readline-sync');

function inicializarTabuleiro() {
    return [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
}

function exibirTabuleiro(tabuleiro) {
    console.log('#####################################');
    console.log('Este é o nosso tabuleiro:');
    for (let i = 0; i < 3; i++) {
        console.log(tabuleiro[i].join(' | '));
        if (i < 2) console.log('------------');
    }
    console.log('#####################################');
}

function realizarJogada(tabuleiro, jogador, simbolo) {
    let linha, coluna;

    if (jogador === 1) {
        console.log(`\nVocê é o jogador ${jogador}. Por favor, escolha sua jogada:`);
        [linha, coluna] = obterJogadaDoUsuario();
    } else {
        console.log(`\nO computador é o jogador ${jogador}.`);
        [linha, coluna] = escolherJogadaComputador(tabuleiro);
    }

    if (validarJogada(tabuleiro, linha, coluna)) {
        console.log(`Você digitou: (${linha},${coluna}).`);
        tabuleiro[linha][coluna] = simbolo;
        console.log(`A posição (${linha},${coluna}) será preenchida com ${simbolo}.\n`);
        return true;
    } else {
        console.log('#################################');
        console.log('Você digitou uma opção inválida! Por favor, escolha uma linha e coluna de 0 a 2.');
        console.log('#################################');
        return false;
    }
}

function obterJogadaDoUsuario() {
    const linha = readlineSync.questionInt('Digite uma linha (0, 1 ou 2): ');
    const coluna = readlineSync.questionInt('Digite uma coluna (0, 1 ou 2): ');
    return [linha, coluna];
}

function validarJogada(tabuleiro, linha, coluna) {
    return linha >= 0 && linha < 3 && coluna >= 0 && coluna < 3 && tabuleiro[linha][coluna] === ' ';
}

function escolherJogadaComputador(tabuleiro) {
    let jogadaComputador;
    do {
        jogadaComputador = [
            Math.floor(Math.random() * 3),
            Math.floor(Math.random() * 3)
        ];
    } while (tabuleiro[jogadaComputador[0]][jogadaComputador[1]] !== ' ');

    return jogadaComputador;
}

function verificarVencedor(tabuleiro, simbolos) {
    for (let i = 0; i < 3; i++) {
        if (
            (tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2] && tabuleiro[i][0] !== ' ') ||
            (tabuleiro[0][i] === tabuleiro[1][i] && tabuleiro[1][i] === tabuleiro[2][i] && tabuleiro[0][i] !== ' ')
        ) {
            return simbolos[tabuleiro[i][0]];
        }
    }

    if (
        (tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2] && tabuleiro[0][0] !== ' ') ||
        (tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0] && tabuleiro[0][2] !== ' ')
    ) {
        return simbolos[tabuleiro[1][1]];
    }

    return tabuleiro.flat().every(cell => cell !== ' ') ? 0 : -1;
}

function jogarJogoDaVelha() {
    console.log('Bem-vindo ao Jogo da Velha!\n');
    console.log('Instruções: Escolha uma linha e coluna de 0 a 2 para fazer sua jogada.');

    let escolhaIndice = readlineSync.keyInSelect(['X', 'O'], 'Escolha ser "X" ou "O": ', { cancel: false });

    if (escolhaIndice === -1) {
        console.log('Escolha inválida. Tente Novamente.');
        return jogarJogoDaVelha();
    }

    let simbolos = {
        'X': escolhaIndice === 0 ? 1 : 2,
        'O': escolhaIndice === 0 ? 2 : 1
    };

    let simboloJogador = escolhaIndice === 0 ? 'X' : 'O';
    let simboloComputador = escolhaIndice === 0 ? 'O' : 'X';

    let tabuleiro = inicializarTabuleiro();
    let jogador = 1;
    let numeroJogadas = 0;
    let vencedor = -1;

    exibirTabuleiro(tabuleiro);

    while (vencedor === -1 && numeroJogadas < 9) {
        if (realizarJogada(tabuleiro, jogador, jogador === 1 ? simboloJogador : simboloComputador)) {
            exibirTabuleiro(tabuleiro);
            vencedor = verificarVencedor(tabuleiro, simbolos);
            jogador = jogador === 1 ? 2 : 1;
            numeroJogadas++;
        }
    }

    if (vencedor === simbolos[simboloJogador]) {
        console.log('\nVocê venceu! Parabéns!');
    } else if (vencedor === simbolos[simboloComputador]) {
        console.log('\nO computador venceu. Tente novamente!');
    } else {
        console.log('\nEmpate! Deu velha!');
    }

    jogarNovamente()
}

function jogarNovamente() {
    const replay = readlineSync.question('Quer jogar novamente? (S/N): ').toUpperCase();

    if (replay === 'S') {
        jogarJogoDaVelha();
    } else if (replay === 'N') {
        console.log('\nObrigado por jogar!');
    } else {
        console.log('\nPor favor, responda com S ou N.')
        jogarNovamente();
    }
}

jogarJogoDaVelha();
