var column = 7, row= 6; // make user determine the height and width

function generateBoard(row, column){
    
    // Generate the board, using a table
    var table = document.createElement("table");
    for (var i=0; i<row;i++){
        var tr = document.createElement('tr');

        for(var j=0; j<column ;j++){
            var td = document.createElement('td');
            var div = document.createElement('div');
            var position = (i*row) + j + 1;   
            td.className = "square"; 
            div.className = "circle" + position;
            td.appendChild(div);
            tr.appendChild(td);

        }   
        table.appendChild(tr);
    }

    var outsideDiv = document.createElement('div');
    outsideDiv.className = "connect4div";
    outsideDiv.appendChild(table);
    document.body.appendChild(outsideDiv);  

}

generateBoard(row,column);




// button for the instructions option

var modal = document.getElementById('myModal'); //modal
var instructionsButton = document.getElementById('instructions'); //button
var span = document.getElementsByClassName("close")[0]; // element that closes the modal

// open the modal after user clicks on the button
instructionsButton.onclick = function () {
    modal.style.display = "block";
}

// closes the modal after clicking the x 
span.onclick = function () {
    modal.style.display = "none";
}



