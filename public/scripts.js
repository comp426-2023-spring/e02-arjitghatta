// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver
window.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form")
    const gameTypeButtons = document.getElementsByName("selected_game")
    const playOpponentButton = document.getElementById("opponent")
    const playOptionsMenu = document.getElementById("play_options_menu")
    const results = document.getElementById("results")

    // Update drop down options
    for (const button of gameTypeButtons) {
        button.addEventListener("change", function(){
            const options = ["Rock", "Paper", "Scissors"]

            if (this.value == "rpsls") {
                options.push("Spock", "Lizard")
            }
            playOptionsMenu.innerHTML = ""
            for (const option of options) {
                var optionElement = document.createElement("option")
                optionElement.innerText = option
                playOptionsMenu.append(optionElement)
            }
        })
    }

    // Update visibility of drop down
    for (const button of document.querySelectorAll("[name='selected_game'], [name='game_mode']")) {
        button.addEventListener("change", function() {
            var visibility = "hidden"
            if (
                document.querySelectorAll("input[type='radio'][name='selected_game']:checked").length > 0
                && playOpponentButton.checked
            ) {
                visibility = "visible"
            }
            playOptionsMenu.style.visibility = visibility
            for (label of document.querySelectorAll("label[for='play_options_menu']")) {
                label.style.visibility = visibility
            }
        })
    }
    form.addEventListener("reset", function(e){
        e.preventDefault()
        for (button of document.querySelectorAll("input:checked")) {
            button.checked = false
        }
        results.style.visibility = "hidden"
        for (button of document.querySelectorAll("input[type='radio'][name='selected_game'], input[type='radio'][name='game_mode']")) {
            button.dispatchEvent(new Event("change"))
        }
    })

    // Enable/disable submit button
    for (const button of document.querySelectorAll("[name='selected_game'], [name='game_mode']")) {
        button.addEventListener("change", function() {
            disabled = true
            if (
                document.querySelectorAll("input[type='radio'][name='selected_game']:checked").length > 0
                && document.querySelectorAll("input[type='radio'][name='game_mode']:checked").length > 0
            ) {
                disabled = false
            }
            document.querySelector("button[type='submit']").disabled = disabled
        })
    }

    // Submit form
    resultDisplayText = {
        "win": "won",
        "lose": "lost",
        "tie": "tied",
    }
    form.addEventListener("submit", function(e){
        e.preventDefault()
        const formData = new FormData(form)
        if (formData.get("game_mode") == "draw") {
            fetch(`app/${formData.get("selected_game")}/play`)
                .then((response) => response.json())
                .then((data) => {
                    results.innerHTML = `Your random draw is ${data.player}.`
                    results.style.visibility = "visible"
                }
            )
        } else if (formData.get("game_mode") == "opponent") {
            fetch(`app/${formData.get("selected_game")}/play`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: `{"shot": "${formData.get("play")}"}`,
            })
                .then((response) => response.json())
                .then((data) => {
                    results.innerHTML = `Opponent played ${data.opponent}. You ${resultDisplayText[data.result]}!`
                    results.style.visibility = "visible"
                }
            )
        }
    })
})