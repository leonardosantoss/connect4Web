var column = 7, row= 6; // make user determine the height and width


// Generate the board, using a table
var table = document.createElement("table");
for (var i=0; i<row;i++){
    var tr = document.createElement('tr');
    
    for(var j=0; j<column ;j++){
        var td = document.createElement('td');
        var div = document.createElement('div');
        td.className = "square";
        div.className = "circle";
        td.appendChild(div);
        tr.appendChild(td);
        
    }
    table.appendChild(tr);
}

var outsideDiv = document.createElement('div');
outsideDiv.className = "connect4div";
outsideDiv.appendChild(table);
document.body.appendChild(outsideDiv);
