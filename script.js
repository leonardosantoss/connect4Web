var gameMatrix, row, column, playerColor;

// button for the instructions option

var instructionsModal = document.getElementById('instructionsModal'); //modal
var profileModal = document.getElementById('profileModal'); //modal
var scoreModal = document.getElementById('scoreModal'); //modal

var instructionsButton = document.getElementById('instructionsButton'); //button
var profileButton = document.getElementById('profileButton'); // profile
var scoreButton = document.getElementById('scoreButton'); //score

var instructionsSpan = document.getElementById('instructionsSpan'); // element that closes the modal
var profileSpan = document.getElementById('profileSpan'); // element that closes the modal
var scoreSpan = document.getElementById('scoreSpan'); // element that closes the modal

var submitSelectors = document.getElementById('submitSelectors');

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
    var against = document.getElementById('against');
    var optionAgainst = against.options[against.selectedIndex].text;

    var sizeCol = document.getElementById('sizeCol').value;

    var sizeRow = document.getElementById('sizeRow').value;

    var ia = document.getElementById('ia').value;

    var whoStarts = document.getElementById('whoStarts');
    var optionWhoStarts = whoStarts.options[whoStarts.selectedIndex].text;

    playerColor = document.getElementById('color').value;

    if(ia == ""){
        console.log("IA not selected!");
    } 
    else if(sizeCol == "" || sizeRow == ""){
        console.log("Sizes not properly selected!")
    }
    else {
        //success, board can be safely generated
        var table = document.getElementById('connect4div');    
        if(table.innerHTML != null){
            table.innerHTML = "";
        }
        row = sizeRow;
        column = sizeCol;
        generateBoard(Number(row), Number(column)); //row and column were strings, make sure to change to number
        gameMatrix = createMatrix(Number(row),Number(column));
    }





