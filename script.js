var gameMatrix, row, column, playerColor;

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

// After clicking the submit button, handles all the selections made by the user
submitSelectors.onclick = function (){
    const against = document.getElementById('against');
    const optionAgainst = against.options[against.selectedIndex].text;

    const sizeCol = document.getElementById('sizeCol').value;

    const sizeRow = document.getElementById('sizeRow').value;

    const ia = document.getElementById('ia').value;

    const whoStarts = document.getElementById('whoStarts');
    const optionWhoStarts = whoStarts.options[whoStarts.selectedIndex].text;

    playerColor = document.getElementById('color').value;

    if(ia == ""){
        console.log("IA not selected!");
    } 
    else if(sizeCol == "" || sizeRow == ""){
        console.log("Sizes not properly selected!")
    }
    else {
        //success, board can be safely generated
        const table = document.getElementById('connect4div');    
        if(table.innerHTML != null){
            table.innerHTML = "";
        }
        np = 0;
        row = Number(sizeRow);
        column = Number(sizeCol);
        generateBoard(); //row and column were strings, make sure to change to number
        gameMatrix = createMatrix();
        player = true;
    }
}



