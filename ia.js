var depth, bestplayCol;
var lastPlayCol, lastPlayRow;
var np = 0;

function alfabeta(depth_max){
    let symbol;
    if(player)
        symbol = "X";
    else   
        symbol = "O";
       
    const lastCol = lastPlayCol;
    const lastRow = lastPlayRow;

    for(let currentCol=0;currentCol<column;currentCol++){
        currentRow = findRow(currentCol);
        if(currentRow != -1){

            play(currentRow,currentCol,symbol);
            const win = checkWin(currentRow,currentCol,symbol);
            rmplay(currentRow, currentCol, lastRow, lastCol);

            if(win) return currentCol;
        }
	}
    
    let alfa = -100000;
    let beta =  100000;  
    bestplayCol = 0;

    depth = 0;
    
    if(player){
        min_value(alfa, beta, depth_max);
    }
    else    
        max_value(alfa, beta, depth_max);

    return bestplayCol;
}

function max_value(alfa, beta, depth_max){
    let opt = 0;
    if(depth==0)opt=1;
	if(depth==1)opt=2;

    const win = checkWin(lastPlayRow, lastPlayCol, "X");

/*
    if(lastPlayCol == 2){
        console.log("max "+win+" "+lastPlayRow+" "+lastPlayCol);
        for(let i = 0;i<row;i++){
            let s = "";
            for(let j = 0; j<column; j++) s+=pos_gameMatrix(i,j);
            console.log(s+"\n");
        }
    }
*/

    if(win){
        return -512;
    }
    if(np == column*row){
        return 0;
    }
    if(depth>=depth_max){
        return eval_board();
    }

    let podar = false;
    let val = -10000;
    const lastCol = lastPlayCol;
    const lastRow = lastPlayRow;

    for(let currentCol = 0; currentCol<column && !podar; currentCol++){
        const currentRow = findRow(currentCol);
        if(currentRow != -1){
            depth++;
            play(currentRow, currentCol, "O");

            const valx = min_value(alfa, beta, depth_max);
            
            //for printing value of childs of first 2 levels
			if(opt==1){
				console.log("\t(0) " + lastPlayCol + " = "+ valx);
			}
			if(opt==2){
				console.log("\t\t(1) " + lastPlayCol + " = "+ valx);
			}

            const val_max = max(val,valx);
            if(val_max != val){
                if(depth == 1)
                    bestplayCol = currentCol;
                val = val_max;
            }
            if(val>=beta){
                podar = true;
            }

            alfa = max(alfa,val);
            depth--;
            rmplay(currentRow,currentCol,lastRow, lastCol);
        }
    }

    return val;
}

function min_value(alfa, beta, depth_max){
    let opt = 0;
    if(depth==0)opt=1;
	if(depth==1)opt=2;

    const win = checkWin(lastPlayRow, lastPlayCol, "O");

/*
    if(lastPlayCol == 2){
        console.log("min "+win+" "+lastPlayRow+" "+lastPlayCol);
        for(let i = 0;i<row;i++){
            let s = "";
            for(let j = 0; j<column; j++) s+=pos_gameMatrix(i,j);
            console.log(s+"\n");
        }
    }
*/ 

    if(win){
        return -512;
    }
    if(np == column*row){
        return 0;
    }
    if(depth>=depth_max){
        return eval_board();
    }

    let podar = false;
    let val = 10000;
    const lastCol = lastPlayCol;
    const lastRow = lastPlayRow;

    for(let currentCol = 0; currentCol<column && !podar; currentCol++){
        const currentRow = findRow(currentCol);
        if(currentRow != -1){
            depth++;
            play(currentRow, currentCol, "X");

            const valx = max_value(alfa, beta, depth_max);
            
            //for printing value of childs of first 2 levels
			if(opt==1){
				console.log("\t(0) " + lastPlayCol + " = "+ valx);
			}
			if(opt==2){
				console.log("\t\t(1) " + lastPlayCol + " = "+ valx);
			}


            const val_min = min(val,valx);
            if(val_min != val){
                if(depth == 1)
                    bestplayCol = currentCol;
                val = val_min;
            }
            if(val<=alfa){
                podar = true;
            }

            beta = min(beta,val);

            depth--;
            rmplay(currentRow,currentCol,lastRow, lastCol);
        }
    }

    return val;
}