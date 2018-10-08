var column = 7, row= 6; // make user determine the height and width
var player = true; // choose player that starts
var win = false;
var gameMatrix = createMatrix(row,column);
var unit_vector = [[1,0], [0,1], [-1,-1], [-1,1]]; // horizontal, vertical, negative diagonal, positive diagonal

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

function pos_gameMatrix(i, j){
    return gameMatrix[i][j];
}

function update_gameMatrix(i, j, x){
    return gameMatrix[i][j] = x;
}

// Player true represented by X on the gameMatrix
// Player false represented by O on the gameMatrix
// Function determines the correct position for the move to be played
// in the correct column, based on where the player clicked
// returns -1 in case the column  is full

function findPosition(clickedCircle){
    currentCol = clickedCircle % column; //determine which column was clicked
    for(var i = row-1; i>=0; i--){
        if(pos_gameMatrix(i,currentCol) === "-"){
            if(player){
                update_gameMatrix(i,currentCol,"X");
                return ((i*column)+currentCol);
            }
            else{
                update_gameMatrix(i,currentCol,"O");
                return ((i*column)+currentCol);
            }
        }
        else if(i===0 && pos_gameMatrix(i,currentCol)){
            return -1;
        }
    }
    
}


function checkWin(lastPlayPosition, typeToCheck){
    var sum = 0;
    var x;
    
    for(var i = 0;i<4;i++){
        x = checkLine(lastPlayPosition, typeToCheck, unit_vector[i]);
        if(x > sum)
            sum = x;
    }
    
    //sum = Math.max(vertical(lastPlayPosition, typeToCheck), horizontal(lastPlayPosition, typeToCheck), diagonal_negative(lastPlayPosition,typeToCheck), diagonal_positive(lastPlayPosition,typeToCheck));

    if(sum >= 3){
        return true;
    }
     
}

function checkLine(lastPlayPosition, typeToCheck, vector){
    var currentCol = lastPlayPosition % column;
    var currentRow  = Math.floor(lastPlayPosition/column);
    var sum = 0;
    var cond0, cond1;
    
    console.log(currentCol, currentRow);

    for(i=1;i<4;i++){
        cond0 = currentRow+i*vector[0] > row-1    || currentRow+i*vector[0] < 0;
        cond1 = currentCol+i*vector[1] > column-1 || currentCol+i*vector[1] < 0;
        if(cond0 || cond1){
            break;
        }
        else if(pos_gameMatrix(currentRow+i*vector[0] , currentCol+i*vector[1]) !== typeToCheck){
            break;
        } 
        else{
            sum++;
        }
    }
    
    for(i=1;i<4;i++){
        cond0 = currentRow-i*vector[0] > row-1    || currentRow-i*vector[0] < 0;
        cond1 = currentCol-i*vector[1] > column-1 || currentCol-i*vector[1] < 0;
        if(cond0 || cond1){
            break;
        }
        else if(pos_gameMatrix(currentRow-i*vector[0],currentCol-i*vector[1]) !== typeToCheck){
            break;
        } 
        else{
            sum++;
        }
    }
    
    console.log(lastPlayPosition + " " + vector[0]+ "," + vector[1] + ": " + sum);
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



