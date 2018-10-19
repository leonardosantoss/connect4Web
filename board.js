var player = true; // choose player that starts
var win = false;
const unit_vector = [[1,0], [0,1], [-1,-1], [-1,1]]; // horizontal, vertical, negative diagonal, positive diagonal


function generateBoard(){
    // Generate the board, using a table
    const table = document.createElement("table");
    table.className= "boardTable";
    table.id="gameBoard";
    for (let i=0; i<row;i++){
        const tr = document.createElement('tr');
        tr.className = "boardTr";
        for(var j=0; j<column ;j++){
            const td = document.createElement('td');
            const div = document.createElement('div');
            position = i*(column) + j;
            td.className = "square";
            td.id = position;
            div.className = "circle";
            div.id = "cir_" + position;
            td.onclick = function (){ 
                const currentRow = findRow(this.id);
                const currentCol = this.id % column;
                const emptyPosition = (currentRow*column)+currentCol;
                
                if(emptyPosition !== -1){
                    play(currentRow,currentCol);

                    const circle = document.getElementById("cir_"+ emptyPosition);
                    if(player){
                        circle.style.background = playerColor;
                        win = checkWin(currentRow, currentCol, "X");
                    }
                    else{
                        circle.style.background = "blue";
                        win = checkWin(currentRow, currentCol, "O");
                    }
                    
                    if(win){
                        setTimeout(function() {
                            alert("Win");
                        }, 0);
                    }
                    player = !player;
                }
            }
            
            td.appendChild(div);
            tr.appendChild(td);
            

        }   
        table.appendChild(tr);
    }

    const outsideDiv = document.getElementById('connect4div');
    outsideDiv.appendChild(table);

}


// returns a matrix with all positions with a "-" (means its empty)
function createMatrix(){
  let matrix = [];
  for(let i=0;i<row;i++){
      matrix[i] = [];
      for(let j=0; j<column;j++){
          
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

function findRow(clickedCircle){

    let currentCol = clickedCircle % column; //determine which column was clicked
    for(let i = row-1; i>=0; i--){
        if(pos_gameMatrix(i,currentCol) === "-"){
            return i;
            /*
            if(player){
                update_gameMatrix(i,currentCol,"X");
                return ((i*column)+currentCol);
            }
            else{
                update_gameMatrix(i,currentCol,"O");
                return ((i*column)+currentCol);
            }
            */
        }
        else if(i===0 && pos_gameMatrix(i,currentCol)){
            return -1;
        }
    }
    
}


function checkWin(currentRow, currentCol, typeToCheck){
    let sum = 0;
    let x;
    
    for(let i = 0;i<4;i++){
        x = checkSum(currentRow, currentCol, typeToCheck, unit_vector[i]);
        if(x > sum)
            sum = x;
    }
    
    //sum = Math.max(vertical(lastPlayPosition, typeToCheck), horizontal(lastPlayPosition, typeToCheck), diagonal_negative(lastPlayPosition,typeToCheck), diagonal_positive(lastPlayPosition,typeToCheck));

    if(sum >= 3){
        return true;
    }
     
}

function checkSum(currentRow, currentCol, typeToCheck, vector){
    let sum = 0;
    let cond0, cond1;
    
    for(let i=1;i<4;i++){
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
    
    for(let i=1;i<4;i++){
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

function legalmoves() {
    let moves = []
    for(let i = 0;i<column;i++){
        if(pos_gameMatrix(0,i)=="-") moves.push(i);
    }
    return moves;
}

function play(currentRow, currentCol){
    console.log(currentRow,currentCol);
    if(player)
        update_gameMatrix(currentRow,currentCol, "X");
    else
        update_gameMatrix(currentRow,currentCol, "O");
}

function rmplay(currentRow, currentCol){
    update_gameMatrix(currentRow,currentCol, "-");
}

function eval(){
    let sum = 0;

    return sum;
}
