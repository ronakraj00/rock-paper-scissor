// variables for counting
let countP = 0;
let countC = 0;
let round = 0;

// DOM manipulation
const container = document.querySelector(".container");
const statDiv = document.createElement("div");
statDiv.setAttribute("id", "round-status");
const statPara = document.createElement("p");
statDiv.append(statPara);
const playerPoints = document.querySelector("#player-points span");
const computerPoints = document.querySelector("#computer-points span");
const roundNo = document.querySelector("#round-no span");

const choicePlayerDiv = document.querySelector("#player-choice");
const choiceComputerDiv = document.querySelector("#computer-choice");
const choicePlayer = document.querySelector("#player-choice img");
const choiceComputer = document.querySelector("#computer-choice img");

const congratulation = document.querySelector("#congratulation");

//function make status all zero
function everyZero() {
  countC = 0;
  countP = 0;
  round = 0;
  statPara.textContent = "New round has started\n select your choice";
  playerPoints.textContent = "0";
  computerPoints.textContent = "0";
  roundNo.textContent = "0";
  choiceComputer.src = "";
  choicePlayer.src = "";
}

//gets the choice from computer
function getComputerChoice() {
  compChoice = Math.floor(Math.random() * 3 + 1);
  animateComputer(compChoice);
  setTimeout(() => {
    if (compChoice == 1) {
      choiceComputer.src = "assets/rock.png";
    }
    if (compChoice == 2) {
      choiceComputer.src = "assets/paper.png";
    }
    if (compChoice == 3) {
      choiceComputer.src = "assets/scissor.png";
    }
  }, 1000);
  return compChoice;
}

//function for each round
function playRound(player, comp) {
  if (player === comp) {
    setTimeout(() => {
      statPara.textContent = "TIE";
    },4000);
    choicePlayerDiv.classList.remove("won-round");
    choiceComputerDiv.classList.remove("won-round");
    return;
  } else if (player === 1 && comp === 3) {
    setTimeout(() => {
      statPara.textContent = "Player has won this round";
    },4000);
    choicePlayerDiv.classList.add("won-round");
    choiceComputerDiv.classList.remove("won-round");
    return (countP += 1);
  } else if (player === 1 && comp === 2) {
    setTimeout(() => {
      statPara.textContent = "Computer has won this round";
    },4000);
    choicePlayerDiv.classList.remove("won-round");
    choiceComputerDiv.classList.add("won-round");
    return (countC += 1);
  } else if (player === 2 && comp === 3) {
    setTimeout(() => {
      statPara.textContent = "Computer has won this round";
    },4000);
    choicePlayerDiv.classList.remove("won-round");
    choiceComputerDiv.classList.add("won-round");
    return (countC += 1);
  } else if (player === 2 && comp === 1) {
    setTimeout(() => {
      statPara.textContent = "Player has won this round";
    },4000);
    choicePlayerDiv.classList.add("won-round");
    choiceComputerDiv.classList.remove("won-round");
    return (countP += 1);
  } else if (player === 3 && comp === 1) {
    setTimeout(() => {
      statPara.textContent = "Computer has won this round";
    },4000);
    choicePlayerDiv.classList.remove("won-round");
    choiceComputerDiv.classList.add("won-round");
    return (countC += 1);
  } else if (player === 3 && comp === 2) {
    setTimeout(() => {
      statPara.textContent = "Player has won this round";
    },4000);
    choicePlayerDiv.classList.add("won-round");
    choiceComputerDiv.classList.remove("won-round");
    return (countP += 1);
  }
}

//game function
function game(playerChoice) {
  if (round < 5) {
    playRound(playerChoice, getComputerChoice());
    setTimeout(() => {
      playerPoints.textContent = countP;
      computerPoints.textContent = countC;
    }, 4000);
    roundNo.textContent = round + 1;
    round += 1;

    //color the point of winner (only round wise)
    if (countP > countC) {
      playerPoints.classList.add("winning");
      computerPoints.classList.remove("winning");
    }
    if (countC > countP) {
      computerPoints.classList.add("winning");
      playerPoints.classList.remove("winning");
    }
  }
  if (round == 5) {
    congratulation.innerHTML = `All 5 rounds completed <br> ${whoWon(
      countC,
      countP
    )}`;
    reset();
    round += 1;
  }
}

const InsideEndScreen = document.querySelector("#inside-end-screen");
const endScreen = document.querySelector("#end-screen");

//reset function
function reset() {
  setTimeout(() => {
    endScreen.classList.remove("invisible");
  }, 5000);

  const resetB = document.createElement("button");
  resetB.textContent = "Reset";
  InsideEndScreen.appendChild(resetB);
  resetB.addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
      everyZero();
      InsideEndScreen.removeChild(resetB);
      endScreen.classList.add("invisible");
    },
    { once: true }
  );
}

//function to decide who won after all rounds
function whoWon(countC, countP) {
  if (countC === countP) {
    return "It's A DRAW!";
  } else if (countC > countP) {
    return `<span class="computer-won">Computer won by <h3 class="point-computer">${countC}</h3> points.</span>`;
  } else if (countP > countC) {
    return `<span class="player-won">You have won!! by <h3 class="point-player">${countP}</h3> points.</span>`;
  }
}

//DOM manipulation
container.appendChild(statDiv);

const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");

//button click event
rock.addEventListener("click", () => {
  if (round < 5) {
    choicePlayer.src = "assets/rock.png";
  }
  game(1);
});
paper.addEventListener("click", () => {
  if (round < 5) {
    choicePlayer.src = "assets/paper.png";
  }
  game(2);
});
scissor.addEventListener("click", () => {
  if (round < 5) {
    choicePlayer.src = "assets/scissor.png";
  }
  game(3);
});

//animating computer choice
const choiceImage = [
  "assets/rock.png",
  "assets/paper.png",
  "assets/scissor.png",
  "assets/rock.png",
  "assets/paper.png",
  "assets/scissor.png",
  "assets/rock.png",
  "assets/paper.png",
  "assets/scissor.png",
  "assets/rock.png",
  "assets/paper.png",
  "assets/scissor.png",
];
function animateComputer(compChoice) {
  let i = 0;
  console.log(compChoice);
  const intervalId = setInterval(() => {
    choiceComputer.src = choiceImage[i];
    if (i > 11) {
      choiceComputer.src = choiceImage[compChoice - 1];
      clearInterval(intervalId);
    } else {
      i++;
    }
  }, 300);
}
