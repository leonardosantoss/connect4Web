function alfabeta(depth){
    const symbol;
    if(player)
        symbol = "X";
    else   
        symbol = "O";
        
    for(let i=0;i<column;i++){
        currentRow = findRow(i);
        if(currentRow != -1){
            play(currentRow,i,symbol);
            const win = checkWin(currentRow,currentCol,symbol);
            rmplay(currentRow, currentCol);
            if(win) return i;
        }
	}
    
    let alfa = -100000;
    let beta =  100000;   

    if(player){
        //min_value(alfa, beta, depth);
    }
    else    
        //max_value(alfa, beta, depth);
}
