var player; // choose player that starts
const unit_vector = [[1, 0], [0, 1], [-1, -1], [-1, 1]]; // horizontal, vertical, negative diagonal, positive diagonal
var bestplayCol;
var vec_np;
var fwin;

function logmsg(currentCol, color, str) {
    const logDiv = document.getElementById('logDiv');
    const p = document.createElement('p');
    p.innerHTML = "Move " + np + ": " + str + " played on the column " + currentCol;
    p.style.color = color;
    logDiv.appendChild(p);

    logDiv.scrollTop = logDiv.scrollHeight; //always have the scroll down on the log of the plays
}

function logwin(player, win) {
    const logDiv = document.getElementById('logDiv');
    const p = document.createElement('h1');

    if (win) p.innerHTML = player + " Wins!";
    else p.innerHTML = "Draw!";

    p.style.color = "black";
    p.style.fontWeight = "strong";
    logDiv.appendChild(p);

    logDiv.scrollTop = logDiv.scrollHeight; //always have the scroll down on the log of the plays
}

function highlightpos(currentRow, currentCol) {
    //const square = document.getElementById(currentRow * column + currentCol);
    const circle = document.getElementById("cir_" + (currentRow * column + currentCol));
    circle.style.border = "2px solid lightgrey";
    circle.style.width = "56px";
    circle.style.height = "56px";
}

function highlightwin(currentRow, currentCol, typeToCheck) {
    if (currentRow == undefined || currentCol == undefined) return false;
    let sum;
    let cond0, cond1;
    let finalvec = [];

    for (let vector of unit_vector) {
        sum = 0;
        for (let i = 1; i < 4; i++) {
            cond0 = currentRow + i * vector[0] > row - 1 || currentRow + i * vector[0] < 0;
            cond1 = currentCol + i * vector[1] > column - 1 || currentCol + i * vector[1] < 0;
            if (cond0 || cond1) {
                break;
            }
            else if (pos_gameMatrix(currentRow + i * vector[0], currentCol + i * vector[1]) !== typeToCheck) {
                break;
            }
            else {
                sum++;
            }
        }

        for (let i = 1; i < 4; i++) {
            cond0 = currentRow - i * vector[0] > row - 1 || currentRow - i * vector[0] < 0;
            cond1 = currentCol - i * vector[1] > column - 1 || currentCol - i * vector[1] < 0;
            if (cond0 || cond1) {
                break;
            }
            else if (pos_gameMatrix(currentRow - i * vector[0], currentCol - i * vector[1]) !== typeToCheck) {
                break;
            }
            else {
                sum++;
            }
        }
        if (sum >= 3) {
            finalvec = vector;
            break;
        }
    }

    for (let i = 1; i < 4; i++) {
        cond0 = currentRow + i * finalvec[0] > row - 1 || currentRow + i * finalvec[0] < 0;
        cond1 = currentCol + i * finalvec[1] > column - 1 || currentCol + i * finalvec[1] < 0;
        if (cond0 || cond1) {
            break;
        }
        else if (pos_gameMatrix(currentRow + i * finalvec[0], currentCol + i * finalvec[1]) !== typeToCheck) {
            break;
        }
        else {
            highlightpos(currentRow + i * finalvec[0], currentCol + i * finalvec[1]);
        }
    }
    for (let i = 1; i < 4; i++) {
        cond0 = currentRow - i * finalvec[0] > row - 1 || currentRow - i * finalvec[0] < 0;
        cond1 = currentCol - i * finalvec[1] > column - 1 || currentCol - i * finalvec[1] < 0;
        if (cond0 || cond1) {
            break;
        }
        else if (pos_gameMatrix(currentRow - i * finalvec[0], currentCol - i * finalvec[1]) !== typeToCheck) {
            break;
        }
        else {
            highlightpos(currentRow - i * finalvec[0], currentCol - i * finalvec[1]);
        }
    }
    highlightpos(currentRow, currentCol);
}

function update_board_pos(currentRow, currentCol) {
    const emptyPosition = (currentRow * column) + currentCol;
    const circle = document.getElementById("cir_" + emptyPosition);
    let win = false;

    if (player) {
        play(currentRow, currentCol, "X");
        circle.style.background = playerColor;

        win = checkWin(currentRow, currentCol, "X");
        if (win) highlightwin(currentRow, currentCol, "x");

        if (againstBot) logmsg(currentCol, playerColor, "You");
        else logmsg(currentCol, playerColor, "Player1");
    }
    else {
        play(currentRow, currentCol, "O");
        circle.style.background = opponentColor;

        win = checkWin(currentRow, currentCol, "O");
        if (win) highlightwin(currentRow, currentCol, "O");

        if (againstBot) logmsg(currentCol, opponentColor, "Bot");
        else logmsg(currentCol, opponentColor, "Player2");
    }

    if (win) {                        //WIN
        if (againstBot) {
            if (player) {
                logwin("Player1", true);
                addWin("Player1");
                addLoss("Bot");
            }
            else {
                logwin("Bot", true);
                addWin("Bot");
                addLoss("Player1");
            }
        }
        else {
            if (player) {
                logwin("Player1", true);
                addWin("Player1");
                addLoss("Player2");
            }
            else {
                logwin("Player2", true);
                addWin("Player2");
                addLoss("Player1");
            }
        }

        return true;
    }
    else if (np == column * row) {      //DRAW

        if (againstBot) {
            logwin("", false);
            addTie("Player1");
            addTie("Bot");
        }
        else {
            logwin("", false);
            addTie("Player1");
            addTie("Player2");
        }
    }
    return false;
}

function playHuman(currentRow, currentCol) {
    if (fwin) return;

    const win = update_board_pos(currentRow, currentCol);
    player = !player;
    if (win) fwin = true;
}

function playBot() {
    if (fwin) return;

    const currentCol = alfabeta(difficulty);
    const currentRow = findRow(currentCol);

    const win = update_board_pos(currentRow, currentCol);
    player = !player;
    if (win) fwin = true;
}

function addTie(playerName) {
    let obj = score.find(obj => obj.name == playerName);
    obj.ties++;
}

function addWin(playerName) {
    let obj = score.find(obj => obj.name == playerName);
    obj.wins++;
}

function addLoss(playerName) {
    let obj = score.find(obj => obj.name == playerName);
    obj.losses++;
}

function generateBoard() {
    // Generate the board, using a table
    const table = document.createElement("table");
    table.className = "boardTable";
    table.id = "gameBoard";
    for (let i = 0; i < row; i++) {
        const tr = document.createElement('tr');
        tr.className = "boardTr";
        for (var j = 0; j < column; j++) {
            const td = document.createElement('td');
            const div = document.createElement('div');
            position = i * (column) + j;
            td.className = "square";
            td.id = position;
            div.className = "circle";
            div.id = "cir_" + position;

            td.onmouseover = function () {
                const currentCol = this.id % column;
                for (let i = 0; i < row; i++) {
                    const square = document.getElementById(i * column + currentCol);
                    square.style.background = "lightgrey";
                }
            }
            td.onmouseleave = function () {
                const currentCol = this.id % column;
                for (let i = 0; i < row; i++) {
                    const square = document.getElementById(i * column + currentCol);
                    square.style.background = "gray";
                }
            }
            td.onclick = function () {
                if ((!player && againstBot) || fwin) return;

                let currentCol = this.id % column;
                let currentRow = findRow(currentCol);

                if (currentRow !== -1) {
                    playHuman(currentRow, currentCol);
                    if (againstBot) playBot();
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
function createMatrix() {
    let matrix = [];
    for (let i = 0; i < row; i++) {
        matrix[i] = [];
        for (let j = 0; j < column; j++) {

            matrix[i][j] = "-";
        }
    }
    return matrix;
}

function pos_gameMatrix(i, j) {
    return gameMatrix[i][j];
}

function update_gameMatrix(i, j, x) {
    return gameMatrix[i][j] = x;
}

// Player true represented by X on the gameMatrix
// Player false represented by O on the gameMatrix
// Function determines the correct position for the move to be played
// in the correct column, based on where the player clicked
// returns -1 in case the column  is full

function findRow(currentCol) {
    if (vec_np[currentCol] == row) return -1;
    return row - vec_np[currentCol] - 1;

}


function checkWin(currentRow, currentCol, typeToCheck) {
    if (currentRow == undefined || currentCol == undefined) return false;
    let sum = 0;
    let x;

    for (let i = 0; i < 4; i++) {
        x = checkSum(currentRow, currentCol, typeToCheck, unit_vector[i]);
        if (x > sum)
            sum = x;
    }

    //sum = Math.max(vertical(lastPlayPosition, typeToCheck), horizontal(lastPlayPosition, typeToCheck), diagonal_negative(lastPlayPosition,typeToCheck), diagonal_positive(lastPlayPosition,typeToCheck));

    if (sum >= 3) {
        return true;
    }
    return false;
}

function checkSum(currentRow, currentCol, typeToCheck, vector) {
    let sum = 0;
    let cond0, cond1;

    for (let i = 1; i < 4; i++) {
        cond0 = currentRow + i * vector[0] > row - 1 || currentRow + i * vector[0] < 0;
        cond1 = currentCol + i * vector[1] > column - 1 || currentCol + i * vector[1] < 0;
        if (cond0 || cond1) {
            break;
        }
        else if (pos_gameMatrix(currentRow + i * vector[0], currentCol + i * vector[1]) !== typeToCheck) {
            break;
        }
        else {
            sum++;
        }
    }

    for (let i = 1; i < 4; i++) {
        cond0 = currentRow - i * vector[0] > row - 1 || currentRow - i * vector[0] < 0;
        cond1 = currentCol - i * vector[1] > column - 1 || currentCol - i * vector[1] < 0;
        if (cond0 || cond1) {
            break;
        }
        else if (pos_gameMatrix(currentRow - i * vector[0], currentCol - i * vector[1]) !== typeToCheck) {
            break;
        }
        else {
            sum++;
        }
    }

    //console.log(currentCol + " " + vector[0]+ "," + vector[1] + ": " + sum);
    return sum;
}

function play(currentRow, currentCol, type) {
    //console.log(currentRow,currentCol);
    np++;
    vec_np[currentCol]++;
    lastPlayCol = currentCol;
    lastPlayRow = currentRow;

    update_gameMatrix(currentRow, currentCol, type);
}

function rmplay(currentRow, currentCol, lastRow, lastCol) {
    np--;
    vec_np[currentCol]--;
    lastPlayCol = lastCol;
    lastPlayRow = lastRow;
    update_gameMatrix(currentRow, currentCol, "-");
}

function eval_pos_aux(currentRow, currentCol, vector) {
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    let cond0, cond1;
    let type1 = "";
    let type2 = "";

    for (let i = 1; i < 4; i++) {
        cond0 = currentRow + i * vector[0] > row - 1 || currentRow + i * vector[0] < 0;
        cond1 = currentCol + i * vector[1] > column - 1 || currentCol + i * vector[1] < 0;
        if (cond0 || cond1) {
            break;
        }
        else if (type1 == "" && pos_gameMatrix(currentRow + i * vector[0], currentCol + i * vector[1]) !== "-") {
            type1 = pos_gameMatrix(currentRow + i * vector[0], currentCol + i * vector[1]);
            sum1++;
        }
        else if (type1 != "" && pos_gameMatrix(currentRow + i * vector[0], currentCol + i * vector[1]) !== type1) {
            break;
        }
        else if (type1 != "") {
            sum1++;
        }
    }

    for (let i = 1; i < 4; i++) {
        cond0 = currentRow - i * vector[0] > row - 1 || currentRow - i * vector[0] < 0;
        cond1 = currentCol - i * vector[1] > column - 1 || currentCol - i * vector[1] < 0;
        if (cond0 || cond1) {
            break;
        }
        else if (type2 == "" && pos_gameMatrix(currentRow - i * vector[0], currentCol - i * vector[1]) !== "-") {
            type2 = pos_gameMatrix(currentRow - i * vector[0], currentCol - i * vector[1]);
            sum2++;
        }
        else if (type2 != "" && pos_gameMatrix(currentRow - i * vector[0], currentCol - i * vector[1]) !== type2) {
            break;
        }
        else if (type2 != "") {
            sum2++;
        }
    }

    if (type1 == "O")
        sum -= Math.pow(4, sum1);
    else if (type1 == "X")
        sum += Math.pow(4, sum1);

    if (type2 == "O")
        sum -= Math.pow(4, sum2);
    else if (type2 == "X")
        sum += Math.pow(4, sum2);

    return sum;
}

function eval_pos(currentRow, currentCol) {
    let sum = 0;
    let x;

    for (let i = 0; i < 4; i++) {
        x = eval_pos_aux(currentRow, currentCol, unit_vector[i]);
        if (x > sum)
            sum = x;
    }

    return sum;
}

function eval_board() {
    let sum = 0;

    for (let currentCol = 0; currentCol < column; currentCol++) {
        const currentRow = findRow(currentCol);
        if (findRow != -1) {
            sum += eval_pos(currentRow, currentCol);
        }
    }
    return sum;
}
