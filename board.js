var player = true; // choose player that starts
var win = false;
var unit_vector = [[1,0], [0,1], [-1,-1], [-1,1]]; // horizontal, vertical, negative diagonal, positive diagonal


function generateBoard(row, column){
    // Generate the board, using a table
    var table = document.createElement("table");
    table.className= "boardTable";
    table.id="gameBoard";
    for (var i=0; i<row;i++){
        var tr = document.createElement('tr');
        tr.className = "boardTr";
        for(var j=0; j<column ;j++){
            var td = document.createElement('td');
            var div = document.createElement('div');
            position = i*(column) + j;
            td.className = "square";
            td.id = position;
            div.className = "circle";
            div.id = "cir_" + position;
            td.onclick = function (){ 
                var emptyPosition = findPosition(this.id);

                if(emptyPosition !== -1){
                    var circle = document.getElementById("cir_"+ emptyPosition);
                    if(player){
                        circle.style.background = playerColor;
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

    var outsideDiv = document.getElementById('connect4div');
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
        x = checkSum(lastPlayPosition, typeToCheck, unit_vector[i]);
        if(x > sum)
            sum = x;
    }
    
    //sum = Math.max(vertical(lastPlayPosition, typeToCheck), horizontal(lastPlayPosition, typeToCheck), diagonal_negative(lastPlayPosition,typeToCheck), diagonal_positive(lastPlayPosition,typeToCheck));

    if(sum >= 3){
        return true;
    }
     
}

function checkSum(lastPlayPosition, typeToCheck, vector){
    var currentCol = lastPlayPosition % column;
    var currentRow  = Math.floor(lastPlayPosition/column);
    var sum = 0;
    var cond0, cond1;
    
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
    
    //console.log(lastPlayPosition + " " + vector[0]+ "," + vector[1] + ": " + sum);
    return sum;
}