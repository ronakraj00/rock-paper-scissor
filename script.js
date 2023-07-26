// variables for counting
let countP = 0;
let countC = 0;
let round = 0;

// DOM manipulation
const container = document.querySelector(".container");
const statDiv = document.createElement("div");
const statPara = document.createElement("p");
const playerPoints = document.querySelector("#player-points span");
const computerPoints = document.querySelector("#computer-points span");
const roundNo = document.querySelector("#round-no span");

//function make status all zero
function everyZero() {
  countC = 0;
  countP = 0;
  round = 0;
  statPara.textContent = "New round has started\n select your choice";
  playerPoints.textContent = "0";
  computerPoints.textContent = "0";
  roundNo.textContent = "0";
}

//gets the choice from computer
function getComputerChoice() {
  return Math.floor(Math.random() * 3 + 1);
}

//function for each round
function playRound(player, comp) {
  if (player === comp) {
    statPara.textContent = "TIE";
    return;
  } else if (player === 1 && comp === 3) {
    statPara.textContent = "Player has won this round";

    return (countP += 1);
  } else if (player === 1 && comp === 2) {
    statPara.textContent = "Computer has won this round";

    return (countC += 1);
  } else if (player === 2 && comp === 3) {
    statPara.textContent = "Computer has won this round";
    return (countC += 1);
  } else if (player === 2 && comp === 1) {
    statPara.textContent = "Player has won this round";
    return (countP += 1);
  } else if (player === 3 && comp === 1) {
    statPara.textContent = "Computer has won this round";
    return (countC += 1);
  } else if (player === 3 && comp === 2) {
    statPara.textContent = "Player has won this round";
    return (countP += 1);
  }
}

//game function
function game(playerChoice) {
  if (round < 5) {
    playRound(playerChoice, getComputerChoice());
    playerPoints.textContent = countP;
    computerPoints.textContent = countC;
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
    statPara.innerHTML = `All 5 rounds completed <br> ${whoWon(
      countC,
      countP
    )}`;
    reset();
    round += 1;
  }
}

//reset function
function reset() {
  const resetB = document.createElement("button");
  resetB.textContent = "Reset";
  container.appendChild(resetB);
  resetB.addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
      everyZero();
      container.removeChild(resetB);
    },
    { once: true }
  );
}

//function to decide who won after all rounds
function whoWon(countC, countP) {
  if (countC === countP) {
    return "tie";
  } else if (countC > countP) {
    return "Computer won by point --> " + countC;
  } else if (countP > countC) {
    return "You have won!! by points --> " + countP;
  }
}

//DOM manipulation
container.appendChild(statDiv);
container.appendChild(statPara);

const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");

//button click event
rock.addEventListener("click",()=>{
    game(1);
});
paper.addEventListener("click",()=>{
    game(2);
});
scissor.addEventListener("click",()=>{
    game(3);
});

