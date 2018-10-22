var player; // choose player that starts
const unit_vector = [[1,0], [0,1], [-1,-1], [-1,1]]; // horizontal, vertical, negative diagonal, positive diagonal
var bestplayCol;
var vec_np;

function update_board_pos(currentRow, currentCol){
    const emptyPosition = (currentRow*column)+currentCol;
    const circle = document.getElementById("cir_"+ emptyPosition);
    if(player){
        play(currentRow,currentCol, "X");
        circle.style.background = playerColor;
        win = checkWin(currentRow, currentCol, "X");
    }
    else{
        play(currentRow,currentCol, "O");
        circle.style.background = "blue";
        win = checkWin(currentRow, currentCol, "O");
    }
    
    if(win){
        setTimeout(function() {
            alert("Win");
        }, 0);
        return true;
    }
    else if(np == column*row){
        setTimeout(function() {
            alert("Draw");
        }, 0);
    }
    return false;
}

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
            td.onmouseover = function (){
                const currentCol = this.id % column;
                for(let i=0;i<row;i++){
                    const square = document.getElementById(i*column+currentCol);
                    square.style.background = "lightgrey";
                }
            }
            td.onmouseleave = function (){
                const currentCol = this.id % column;
                for(let i=0;i<row;i++){
                    const square = document.getElementById(i*column+currentCol);
                    square.style.background = "gray";
                }
            }
            td.onclick = function (){ 
                let currentCol = this.id % column;
                let currentRow = findRow(currentCol);
                
                if(currentRow !== -1){
                    console.log("player: " + currentRow + " " + currentCol);
                    let win = update_board_pos(currentRow, currentCol);                    
                    player = !player;

                    currentCol = alfabeta(9);
                    currentRow = findRow(currentCol);

                    if(currentRow != -1 && !win){
                        console.log("bot: " + currentRow + " " + currentCol);
                        update_board_pos(currentRow, currentCol);                    
                        player = !player;
                    }
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

function findRow(currentCol){
    if(vec_np[currentCol]==row) return -1;
    return row-vec_np[currentCol]-1;
    
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
    return false;
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
    
    //console.log(currentCol + " " + vector[0]+ "," + vector[1] + ": " + sum);
    return sum;
}

function play(currentRow, currentCol, type){
    //console.log(currentRow,currentCol);
    np++;
    vec_np[currentCol]++;
    lastPlayCol = currentCol;
    lastPlayRow = currentRow;

   update_gameMatrix(currentRow,currentCol, type);
}

function rmplay(currentRow, currentCol, lastRow, lastCol){
    np--;
    vec_np[currentCol]--;
    lastPlayCol = lastCol;
    lastPlayRow = lastRow;
    update_gameMatrix(currentRow,currentCol, "-");
}

function eval_pos_aux(currentRow, currentCol, vector){
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    let cond0, cond1;
    let type1 = "";
    let type2 = "";

    for(let i=1;i<4;i++){
        cond0 = currentRow+i*vector[0] > row-1    || currentRow+i*vector[0] < 0;
        cond1 = currentCol+i*vector[1] > column-1 || currentCol+i*vector[1] < 0;
        if(cond0 || cond1){
            break;
        }
        else if(type1 == "" && pos_gameMatrix(currentRow+i*vector[0] , currentCol+i*vector[1]) !== "-"){
            type1 = pos_gameMatrix(currentRow+i*vector[0] , currentCol+i*vector[1]);
            sum1++;
        }
        else if(type1 != "" && pos_gameMatrix(currentRow+i*vector[0] , currentCol+i*vector[1]) !== type1){
            break;
        } 
        else if(type1 != ""){
            sum1++;
        }
    }
    
    for(let i=1;i<4;i++){
        cond0 = currentRow-i*vector[0] > row-1    || currentRow-i*vector[0] < 0;
        cond1 = currentCol-i*vector[1] > column-1 || currentCol-i*vector[1] < 0;
        if(cond0 || cond1){
            break;
        }
        else if(type2 == "" && pos_gameMatrix(currentRow-i*vector[0] , currentCol-i*vector[1]) !== "-"){
            type2 = pos_gameMatrix(currentRow-i*vector[0] , currentCol-i*vector[1]);
            sum2++;
        }
        else if(type2 != "" && pos_gameMatrix(currentRow-i*vector[0],currentCol-i*vector[1]) !== type2){
            break;
        } 
        else if(type2 != ""){
            sum2++;
        }
    }

    if(type1 == "O") 
        sum -= Math.pow(4, sum1);
    else if(type1 == "X") 
        sum += Math.pow(4, sum1);

    if(type2 == "O") 
        sum -= Math.pow(4, sum2);
    else if(type2 == "X") 
        sum += Math.pow(4, sum2);

    return sum;
}

function eval_pos(currentRow, currentCol){
    let sum = 0;
    let x;
    
    for(let i = 0;i<4;i++){
        x = eval_pos_aux(currentRow, currentCol, unit_vector[i]);
        if(x > sum)
            sum = x;
    }
    
    return sum;
}

function eval_board(){
    let sum = 0;

    for(let currentCol = 0; currentCol<column; currentCol++){
        const currentRow = findRow(currentCol);
        if(findRow!=-1){
            sum+=eval_pos(currentRow, currentCol);
        }
    }
    return sum;
}
