function randomShot(rules) {
    let values = Object.keys(rules)
    return values[~~(Math.random() * values.length)]
}

const rpsRules = {
    "rock": ["paper"],
    "paper": ["scissors"],
    "scissors": ["rock"]
}
export function rps(playerShot) {

    if (playerShot === undefined) {
        return {"player": randomShot(rpsRules)}
    }

    if (!(playerShot.toLowerCase() in rpsRules)) {
        return (`Rules for Rock Paper Scissors:

  - Scissors CUTS Paper
  - Paper COVERS Rock
  - Rock CRUSHES Scissors`)
    }

    let opponentShot = randomShot(rpsRules)
    var result = rpsRules[playerShot.toLowerCase()].includes(opponentShot.toLowerCase()) ? "lose" : "win"
    if (playerShot.toLowerCase() == opponentShot.toLowerCase()) {
        result = "tie"
    }
    return {
        "player": playerShot,
        "opponent": opponentShot,
        "result": result,
    }
}

const rpslsRules = {
    "rock": ["paper", "spock"],
    "paper": ["scissors", "lizard"],
    "scissors": ["rock", "spock"],
    "spock": ["lizard", "paper"],
    "lizard": ["rock", "scissors"]
}
export function rpsls(playerShot) {
    if (playerShot === undefined) {
        return {"player": randomShot(rpslsRules)}
    }

    if (!(playerShot.toLowerCase() in rpslsRules)) {
        return (`Rules for the Lizard-Spock Expansion of Rock Paper Scissors: - Scissors CUTS Paper
  - Paper COVERS Rock
  - Rock SMOOSHES Lizard
  - Lizard POISONS Spock
  - Spock SMASHES Scissors
  - Scissors DECAPITATES Lizard
  - Lizard EATS Paper
  - Paper DISPROVES Spock
  - Spock VAPORIZES Rock
  - Rock CRUSHES Scissors`)
    }

    let opponentShot = randomShot(rpslsRules)
    var result = rpslsRules[playerShot.toLowerCase()].includes(opponentShot.toLowerCase()) ? "lose" : "win"
    if (playerShot.toLowerCase() == opponentShot.toLowerCase()) {
        result = "tie"
    }
    return {
        "player": playerShot,
        "opponent": opponentShot,
        "result": result
    }
}