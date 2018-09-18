var column = 7, row= 6; // make user determine 

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
document.body.appendChild(table);