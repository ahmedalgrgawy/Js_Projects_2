function createDice(n) {
    const dotPositionMatrix = {
        1: [
            [50, 50]
        ],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ],
        4: [
            [20, 20],
            [20, 80],
            [80, 20],
            [80, 80]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 20],
            [80, 80]
        ],
        6: [
            [20, 20],
            [20, 80],
            [50, 20],
            [50, 80],
            [80, 20],
            [80, 80]
        ]
    };

    const dice = document.createElement("div");

    dice.classList.add("dice");

    for (const dotP of dotPositionMatrix[n]) {

        const dot = document.createElement("div");

        dot.classList.add("dice-dot");

        dot.style.setProperty('--top', dotP[0] + '%');

        dot.style.setProperty('--left', dotP[1] + '%');

        dice.appendChild(dot);

    }

    return dice;

}

function randomDice(diceContainer, numberOfDice) {

    diceContainer.innerHTML = '';

    for (let i = 0; i < numberOfDice; i++) {

        const randomNumber = Math.floor(Math.random() * 6) + 1;

        const dice = createDice(randomNumber);

        diceContainer.appendChild(dice);

    }

}

const dicesNumber = 5;
const diceContainer = document.querySelector(".dice-container");
const rollDiceBtn = document.querySelector(".btn-roll-dice");

randomDice(diceContainer, dicesNumber);

rollDiceBtn.addEventListener('click', () => {

    const interval = setInterval(() => {

        randomDice(diceContainer, dicesNumber);

    }, 50);

    setTimeout(() => clearInterval(interval), 1000);

});

