
var gameContainer = document.getElementById('game-container');

var choices = document.getElementById('choice').children
var scores;
if (localStorage.getItem('score') == null) {
    localStorage.setItem('score', JSON.stringify([0, 0]));
    scores = [0,0]
} else {
    scores = JSON.parse(localStorage.getItem('score'));
    document.getElementById('scoreboard').innerHTML = `You <b>${scores[0]}</b> - <b>${scores[1]}</b> Bot</p>`
}


const possibleChoices = ['rock', 'paper', 'scissors'];
function evaluate(choice) {
    let bot_choice = Math.floor(Math.random() * 3);
    let result;
    if (choice == bot_choice) { 
        result = 0;
    }
    else if ((choice - bot_choice)%3 == 1) {
        result = 1;
    }
    else {
        result = -1;
    }

    console.log(choice, bot_choice, result)
    let out;
    switch (result) {
        case 0:
            out = `<p>You choose <i>${possibleChoices[choice]}</i> and I chose <i>${possibleChoices[bot_choice]}</i>. It's a <b>tie!</b></p>`
            scores[0] += 0;
            scores[1] += 0;
            break;
        case 1:
            out = `<p>You choose <i>${possibleChoices[choice]}</i> and I chose <i>${possibleChoices[bot_choice]}</i>. You <b>win!</b></p>`
            scores[0] += 1;
            scores[1] += 0;
            break;
        case -1:
            out = `<p>You choose <i>${possibleChoices[choice]}</i> and I chose <i>${possibleChoices[bot_choice]}</i>. You <b>lose!</b></p>`
            scores[0] += 0;
            scores[1] += 1;
            break;
        default:
            break;
    }

    document.getElementById('result').innerHTML = out + '<div id="reset-container"><button onclick="reset()">Play Again</button></div>';
    document.getElementById('main-game').style.display = 'none';
    document.getElementById('scoreboard').innerHTML = `You <b>${scores[0]}</b> - <b>${scores[1]}</b> Bot</p>`
    localStorage.setItem('score', JSON.stringify(scores));
}

function reset() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('main-game').style.display = 'flex';
}

Array.from(choices).forEach(element => {
    element.addEventListener('click', function () {

        evaluate(element.getAttribute('data-choice'))
    })
});