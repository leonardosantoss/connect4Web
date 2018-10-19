generateBoard(row, column);

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



