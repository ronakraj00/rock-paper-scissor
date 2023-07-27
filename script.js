// variables for counting
let countP = 0;
let countC = 0;
let round = 0;

const computerColor = "rgba(255, 0, 0, 0.342)";
const playerColor = "rgba(0, 128, 0, 0.333)";

const computerAudio = new Audio("assets/computer-choice-sound.wav");
const buttonClickAudio = new Audio("assets/rps-button-click.wav");
const winSound = new Audio("assets/Win.mp3");
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

const themeColor = document.querySelector('meta[name="theme-color"]');

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
    }, 4000);
    choicePlayerDiv.classList.remove("won-round");
    choiceComputerDiv.classList.remove("won-round");
    return;
  } else if (player === 1 && comp === 3) {
    setTimeout(() => {
      statPara.textContent = "Player has won this round";
      themeColor.content = playerColor;
    }, 4000);
    choicePlayerDiv.classList.add("won-round");
    choiceComputerDiv.classList.remove("won-round");
    return (countP += 1);
  } else if (player === 1 && comp === 2) {
    setTimeout(() => {
      statPara.textContent = "Computer has won this round";
      themeColor.content = computerColor;
    }, 4000);
    choicePlayerDiv.classList.remove("won-round");
    choiceComputerDiv.classList.add("won-round");
    return (countC += 1);
  } else if (player === 2 && comp === 3) {
    setTimeout(() => {
      statPara.textContent = "Computer has won this round";
      themeColor.content = computerColor;
    }, 4000);
    choicePlayerDiv.classList.remove("won-round");
    choiceComputerDiv.classList.add("won-round");
    return (countC += 1);
  } else if (player === 2 && comp === 1) {
    setTimeout(() => {
      statPara.textContent = "Player has won this round";
      themeColor.content = playerColor;
    }, 4000);
    choicePlayerDiv.classList.add("won-round");
    choiceComputerDiv.classList.remove("won-round");
    return (countP += 1);
  } else if (player === 3 && comp === 1) {
    setTimeout(() => {
      statPara.textContent = "Computer has won this round";
      themeColor.content = computerColor;
    }, 4000);
    choicePlayerDiv.classList.remove("won-round");
    choiceComputerDiv.classList.add("won-round");
    return (countC += 1);
  } else if (player === 3 && comp === 2) {
    setTimeout(() => {
      statPara.textContent = "Player has won this round";
      themeColor.content = playerColor;
    }, 4000);
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
    themeColor.content = "white";
    congratulation.innerHTML = `All 5 rounds completed <br><br> ${whoWon(
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
    if (countP > countC) {
      winSound.play();
    }
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

//time
let clickTime = 0;
let lastClickTime = 0;
//button click event
rock.addEventListener("click", () => {
  clickTime = new Date();
  if (round < 5 && clickTime - lastClickTime > 4000) {
    buttonClickAudio.play();
    choicePlayer.src = "assets/rock.png";
    lastClickTime = new Date();
    game(1);
  }
});
paper.addEventListener("click", () => {
  clickTime = new Date();
  if (round < 5 && clickTime - lastClickTime > 4000) {
    buttonClickAudio.play();
    choicePlayer.src = "assets/paper.png";
    lastClickTime = new Date();
    game(2);
  }
});
scissor.addEventListener("click", () => {
  clickTime = new Date();
  if (round < 5 && clickTime - lastClickTime > 4000) {
    buttonClickAudio.play();
    choicePlayer.src = "assets/scissor.png";
    lastClickTime = new Date();
    game(3);
  }
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

//this animate computer choice
function animateComputer(compChoice) {
  computerAudio.loop = true;
  computerAudio.volume = 0.1;

  setTimeout(() => {
    computerAudio.play();
  }, 300);

  let i = 0;
  i = 0;

  const intervalId = setInterval(() => {
    choiceComputer.src = choiceImage[i];
    if (i > 11) {
      choiceComputer.src = choiceImage[compChoice - 1];
      computerAudio.pause();
      clearInterval(intervalId);
    } else {
      i++;
    }
  }, 300);
}



//for install App


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Save the event for later use
  deferredPrompt = event;
  // Display your custom "Install App" button
  showInstallButton();
});

function showInstallButton() {
  // Display your custom "Install App" button here
  const installButton = document.querySelector('.install-button');
  installButton.style.display = 'block';
  installButton.addEventListener("click",installApp);
}



function installApp() {
  // Trigger the "Install App" prompt when your custom button is clicked
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferredPrompt so it can't be triggered again
      deferredPrompt = null;
    });
  }
}