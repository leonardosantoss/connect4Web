generateBoard(row, column);

// button for the instructions option

var instructionsModal = document.getElementById('instructionsModal'); //modal
var profileModal = document.getElementById('profileModal'); //modal
var instructionsButton = document.getElementById('instructions'); //button
var profileButton = document.getElementById('profile'); // profile
var instructionsSpan = document.getElementById('instructionsSpan'); // element that closes the modal
var profileSpan = document.getElementById('profileSpan');; // element that closes the modal

// open the modal after user clicks on the button
instructionsButton.onclick = function () {
    instructionsModal.style.display = "block";
}

profileButton.onclick = function () {
    profileModal.style.display = "block";
}

// closes the modal after clicking the x 
instructionsSpan.onclick = function () {
    instructionsModal.style.display = "none";
}

// closes the modal after clicking the x 
profileSpan.onclick = function () {
    profileModal.style.display = "none";
}



