var column = 7, row= 6; // make user determine the height and width
var player = true; // choose player that starts
var win = false;
var gameMatrix = createMatrix(row,column);

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
                var emptyPosition = findPosition(this.id);
                if(emptyPosition !== -1){
                    var circle = document.getElementById("cir_"+ emptyPosition);
                    if(player){
                        circle.style.background = "red";
                        win = checkWin(emptyPosition, "X");
                    }
                    else{
                        circle.style.background = "blue";
                        win = checkWin(emptyPosition, "O");
                    }
                    player = !player;
                    if(win){
                        setTimeout(function() {
                            alert("Win");
                        }, 0);
                    }
                       
                }
            }
            
            td.appendChild(div);
            tr.appendChild(td);
            

        }   
        table.appendChild(tr);
    }

    var outsideDiv = document.getElementsByClassName('connect4div')[0];
    outsideDiv.appendChild(table);

}


// returns a matrix with all positions with a "-" (means its empty)
function createMatrix(row, column){
  var matrix = [];
  for(var i=0;i<row;i++){
      matrix[i] = [];
      for(var j=0; j<column;j++){
          matrix[i][j] = "-";
      }
  }
    return matrix;
}

// Player true represented by X on the gameMatrix
// Player false represented by O on the gameMatrix
// Function determines the correct position for the move to be played
// in the correct column, based on where the player clicked
// returns -1 in case the column  is full

function findPosition(clickedCircle){
    col = clickedCircle % column; //determine which column was clicked
    for(var i = row-1; i>=0; i--){
        if(gameMatrix[i][col] === "-"){
            if(player){
                gameMatrix[i][col] = "X";
                return ((i*column)+col);
            }
            else{
                gameMatrix[i][col] = "O";
                return ((i*column)+col);
            }
        }
        else if(i===0 && gameMatrix[i][col]){
            return -1;
        }
    }
    
}

function checkWin(lastPlayPosition, typeToCheck){
    var sum = 0;
    sum += vertical(lastPlayPosition, typeToCheck);
    
    if(sum >= 3){
        return true;
    }
     
}


//Checks if the player who last played won vertically
function vertical(lastPlayPosition, typeToCheck){
    var col = lastPlayPosition % column;
    var currentRow  = Math.floor(lastPlayPosition/row);
    var sum = 0;
    
    //down
    for(i=1;i<4;i++){
        if(currentRow+i>row-1){
            break;
        }
        else if(gameMatrix[currentRow+i][col] !== typeToCheck){
            break;
        } 
        else{
            sum++;
        }
    }

    //up
    for(i=1;i<4;i++){
        if(currentRow-i<0){
            break;
        }
        else if(gameMatrix[currentRow-i][col] !== typeToCheck){
            break;
        } 
        else{
            sum++;
        }
    }
    
    return sum;
}


generateBoard(row, column);


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



