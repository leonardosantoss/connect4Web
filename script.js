var column = 7, row= 6; // make user determine the height and width

var player = true; // choose player that starts


function generateBoard(row, column){
    
    // Generate the board, using a table
    var table = document.createElement("table");
    for (var i=0; i<row;i++){
        var tr = document.createElement('tr');

        for(var j=0; j<column ;j++){
            var td = document.createElement('td');
            var div = document.createElement('div');
            var position = (i*(row+1)) + j;   
            td.className = "square";
            td.id = position;
            div.className = "circle";
            div.id = "cir_" + position;
            td.onclick = function (){
                //verify position in the column
                //verify what color
                var circle = document.getElementById("cir_"+ this.id);
                if(player){
                   circle.style.background = "red"; 
    
                }
                else{
                    circle.style.background = "blue";
                }     
                player = !player;
                
            }
            td.appendChild(div);
            tr.appendChild(td);
            

        }   
        table.appendChild(tr);
    }

    var outsideDiv = document.getElementsByClassName('connect4div')[0];
    outsideDiv.appendChild(table);

}



function createMatrix(row, column){
  
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



