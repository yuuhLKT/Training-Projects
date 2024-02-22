var readlineSync = require('readline-sync');

function welcome() {
    const playerName = readlineSync.question('\nCom qual personagem voce quer jogar? \n');
    const opponentName = readlineSync.question(`\nQual personagem o ${playerName} vai enfrentar? \n`);

    return [playerName, opponentName];
}

function generateStatus() {
    let playerStatus = Math.floor(Math.random() * 100);
    let opponentStatus = Math.floor(Math.random() * 100);

    return [playerStatus, opponentStatus];
}

function compareAndShowStatus(playerName, opponentName) {
    let playerStatus = generateStatus()[0];
    let opponentStatus = generateStatus()[1];

    const showStatus = `O ${playerName} tem ${playerStatus} de status e o ${opponentName} tem ${opponentStatus} de status.`;

    if (playerStatus > opponentStatus) {
        console.log(`\n${showStatus}`);
        console.log(`Logo, o ${playerName} venceu! \n`);
    } else if (playerStatus < opponentStatus) {
        console.log(`\n${showStatus}`);
        console.log(`Logo, o ${opponentName} venceu! \n`);
    } else {
        console.log(`\n${showStatus}`);
        console.log(`Logo a batalha terminou em empate! \n`);
    }
}

function playAgain() {
    let answer = readlineSync.keyInYNStrict('Quer jogar novamente?');

    if (answer === true) {
        game();
    } else {
        console.log('\nObrigado por jogar!\n');
    }
}

function game() {
    let [playerName, opponentName] = welcome(); 
    compareAndShowStatus(playerName, opponentName);
    playAgain();
}

game();
