// variables for counting

let countP=0;
let countC=0;
let round =0;



// DOM manipulation
const container=document.querySelector('.container');
const statDiv=document.createElement('div');
const statPara=document.createElement('p');


//function make status all zero
function everyZero(){
    countC=0;
    countP=0;
    round=0;
    statPara.textContent="New round has started\n select your choice"
}


//console game start
console.log("Game Start");

//gets the choice from computer
function getComputerChoice() {
    return Math.floor((Math.random() * 3) + 1);
}


//function for each round
function playRound(player, comp) {
    console.log(`${player}:${comp}`)
    if (player === comp) {
        statPara.textContent="TIE";
        return;
    }
    else if (player === 1 && comp === 3) {
        statPara.textContent="Player has won this round";

        return countP+=1;
    }
    else if (player === 1 && comp === 2) {
        statPara.textContent="Computer has won this round";

        return countC+=1;
    }
    else if (player === 2 && comp === 3) {
        statPara.textContent="Computer has won this round";
        return countC+=1;
    }
    else if (player === 2 && comp === 1) {
        statPara.textContent="Player has won this round";
        return countP+=1;
    }
    else if (player === 3 && comp === 1) {
        statPara.textContent="Computer has won this round";
        return countC+=1;
    }
    else if (player === 3 && comp === 2) {
        statPara.textContent="Player has won this round";
        return countP+=1;
    }
}

//game function 
function game(playerChoice){
    playRound(playerChoice,getComputerChoice());
    round+=1;
    if(round==5){
        statPara.innerHTML=`All 5 rounds completed <br> ${whoWon(countC,countP)}`
        reset();
    }
    
}


//reset function 
function reset(){
    const resetB=document.createElement('button');
    resetB.textContent="Reset";
    
    container.appendChild(resetB);
    resetB.addEventListener('click',(e)=>{
        e.stopPropagation();
        everyZero();
        container.removeChild(resetB);

    })
}



//function to decide who won after all rounds
function whoWon(countC,countP){
    if(countC===countP){
        return "tie";
    }
    else if( countC>countP){
        return "Computer won by point --> "+countC;
    }
    else if(countP>countC){
        return "You have won!! by points --> "+countP;
    }
}


//DOM manipulation
container.appendChild(statDiv);
container.appendChild(statPara);







const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissor = document.querySelector('#scissor');


if(round<5){
    rock.addEventListener('click',runfn1);
    paper.addEventListener('click',runfn2);
    scissor.addEventListener('click',runfn3 );
}   


function runfn1(e){
    game(1);

    e.stopPropagation();
}
function runfn2(e){
    game(2);

    e.stopPropagation();
}
function runfn3(e){
    game(3);

    e.stopPropagation();
}

        

 













