var gameMatrix, row, column, playerColor, opponentColor, difficulty;

// button for the instructions option

const instructionsModal = document.getElementById('instructionsModal'); //modal
const profileModal = document.getElementById('profileModal'); //modal
const scoreModal = document.getElementById('scoreModal'); //modal

const instructionsButton = document.getElementById('instructionsButton'); //button
const profileButton = document.getElementById('profileButton'); // profile
const scoreButton = document.getElementById('scoreButton'); //score

const instructionsSpan = document.getElementById('instructionsSpan'); // element that closes the modal
const profileSpan = document.getElementById('profileSpan'); // element that closes the modal
const scoreSpan = document.getElementById('scoreSpan'); // element that closes the modal

const submitSelectors = document.getElementById('submitSelectors');

submitconfig();

// open the modal after user clicks on the button
instructionsButton.onclick = function () {
    instructionsModal.style.display = "block";
}

profileButton.onclick = function () {
    profileModal.style.display = "block";
}

scoreButton.onclick = function () {
    scoreModal.style.display = "block";
}

// closes the modal after clicking the x 
instructionsSpan.onclick = function () {
    instructionsModal.style.display = "none";
}

// closes the modal after clicking the x 
profileSpan.onclick = function () {
    profileModal.style.display = "none";
}

// closes the modal after clicking the x 
scoreSpan.onclick = function () {
    scoreModal.style.display = "none";
}

function submitconfig(){
    const against = document.getElementById('against');
    const optionAgainst = against.options[against.selectedIndex].text;

    const sizeCol = document.getElementById('sizeCol').value;

    const sizeRow = document.getElementById('sizeRow').value;

    const whoStarts = document.getElementById('whoStarts');
    const optionWhoStarts = whoStarts.options[whoStarts.selectedIndex].text;

    playerColor = document.getElementById('colorme').value;
    opponentColor = document.getElementById('colorop').value;

    const table = document.getElementById('connect4div');    
    if(table.innerHTML != null){
        table.innerHTML = "";
    }

    const logDiv = document.getElementById('logDiv');
    if(logDiv.innerHTML != null){
        logDiv.innerHTML = "";
    }
    np = 0;
    row = Number(sizeRow);
    column = Number(sizeCol);

    vec_np = [];
    for(let i = 0; i<column; i++) vec_np.push(0);
    
    generateBoard(); //row and column were strings, make sure to change to number
    gameMatrix = createMatrix();
    player = true;
    
    const size = column;
    const dif = document.getElementById("ia").value;
    sizetodepth(size, dif);

    document.getElementById("thinking").style.display = "none";
}
// After clicking the submit button, handles all the selections made by the user
submitSelectors.onclick = function (){
    submitconfig();
}

//(4) 2 5 10 14
//(5) 2 5 10 12
//(6) 2 5 09 10
//(7) 2 5 08 09
//(8) 2 5 07 09
function sizetodepth(size, dif){
    if(dif == "easy"){
        if(size == 4)      difficulty = 2;
        else if(size == 5) difficulty = 2;
        else if(size == 6) difficulty = 2;
        else if(size == 7) difficulty = 2;
        else               difficulty = 2;
    }else if(dif == "medium"){
        if(size == 4)      difficulty = 5;
        else if(size == 5) difficulty = 5;
        else if(size == 6) difficulty = 5;
        else if(size == 7) difficulty = 5;
        else                difficulty = 5;
    }else if(dif == "hard"){
        if(size == 4)      difficulty = 10;
        else if(size == 5) difficulty = 10;
        else if(size == 6) difficulty = 9;
        else if(size == 7) difficulty = 8;
        else                difficulty = 7;
    }else if(dif == "hardcore (may be slow)"){
        if(size == 4)      difficulty = 14;
        else if(size == 5) difficulty = 12;
        else if(size == 6) difficulty = 10;
        else if(size == 7) difficulty = 9;
        else               difficulty = 9;
    }
}


