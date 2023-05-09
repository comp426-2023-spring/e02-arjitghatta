// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

function unhideOpts() {
    let check = document.getElementById('opponent');
    let gameType = document.querySelector('input[name="game-type"]:checked').id;
    
    if (check.checked && gameType === 'rpsls') {
        $('.move').show();
        $('.rpsls').show();
        $('.rps').show();
      } else if (check.checked && gameType === 'rps') {
        $('.move').show();
        $('.rps').show();
        $('.rpsls').hide();
      } else {
        $('.move').hide();
      }
      console.log(gameType);
      console.log(check.checked);
}

function resetClear() {
    document.getElementById('userinput').reset();
    $('#results').hide();
    $('#userinput').show();
    $('#play').show();
    unhideOpts();
}

async function startGame() {
    $('#userinput').hide();
    $('#play').hide();

    let gameType = $('input[type=radio][name=game-type]:checked').val();
    let vsOpponent = document.querySelector('#opponent').checked;
    let shot = $('input[type=radio][name=move]:checked').val();

    let baseurl = window.location.href + 'app/'
    let url = baseurl + gameType + '/play'

    if (vsOpponent) {
        url += '/' + shot
    }

    let response = await fetch(url)
    let result = await response.json()

    if (vsOpponent) {
        $('#results').show();
        document.getElementById("results").innerText = 'You: ' + result.player +
            '\n\nYour opponent: ' + result.opponent +
            '\n\nResult: you ' + result.result.toUpperCase() +'\n';
    } else {
        $('#results').show();
        document.getElementById("results").innerText = 'Your random draw is: ' + result.opponent;
    }
    console.log(url)
    console.log(result)
    console.log(result.result)


}

function viewrules() {
    document.getElementById("rules").innerText =
    `Rules for Rock Paper Scissors:
    - Scissors CUTS Paper
    - Paper COVERS Rock
    - Rock CRUSHES Scissors
    
    Rules for the Lizard-Spock Expansion of Rock Paper Scissors:
    - Scissors CUTS Paper
    - Paper COVERS Rock
    - Rock SMOOSHES Lizard
    - Lizard POISONS Spock
    - Spock SMASHES Scissors
    - Scissors DECAPITATES Lizard
    - Lizard EATS Paper
    - Paper DISPROVES Spock
    - Spock VAPORIZES Rock
    - Rock CRUSHES Scissors`;
    document.getElementById("rules-btn").hidden = true;
    document.getElementById("rules").hidden = false;
    document.getElementById("hide-rules-btn").hidden = false;
}

function hiderules() {
    document.getElementById("rules").hidden = true;
    document.getElementById("hide-rules-btn").hidden = true;
    document.getElementById("rules-btn").hidden = false;
}