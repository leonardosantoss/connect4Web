var gameMatrix, row, column, playerColor, opponentColor, difficulty, againstBot;
var score = [];
var player1name, player2name;

// button for the instructions option
window.onload = function (){
    const instructionsModal = document.getElementById('instructionsModal'); //modal
    const profileModal = document.getElementById('profileModal'); //modal
    const scoreModal = document.getElementById('scoreModal'); //modal
    const aboutModal = document.getElementById('aboutModal');

    const instructionsButton = document.getElementById('instructionsButton'); //button
    const profileButton = document.getElementById('profileButton'); // profile
    const scoreButton = document.getElementById('scoreButton'); //score
    const aboutButton = document.getElementById('about'); 
    const giveUpButton = document.getElementById('giveup');

    const instructionsSpan = document.getElementById('instructionsSpan'); // element that closes the modal
    const profileSpan = document.getElementById('profileSpan'); // element that closes the modal
    const scoreSpan = document.getElementById('scoreSpan'); // element that closes the modal
    const aboutSpan = this.document.getElementById('aboutSpan');
    

    const submitSelectors = document.getElementById('submitSelectors');
    const submitLogin = document.getElementById('submitLoginId');
    const loginDiv = document.getElementById('loginDivId');
    const nav = document.getElementById('nav');
    const logout = document.getElementById('logout');
    const allButHeaderDiv = document.getElementById('allButHeaderDivId');
    

    // open the modal after user clicks on the button
    instructionsButton.onclick = function () {
        instructionsModal.style.display = "block";
    }

    profileButton.onclick = function () {
        profileModal.style.display = "block";
    }

    scoreButton.onclick = function () {
        displayScoreBoard();
        scoreModal.style.display = "block";
    }

    aboutButton.onclick = function () {
        aboutModal.style.display = "block";
    }

    giveUpButton.onclick = function () { 
        if(fwin) return;
        fwin = true;
        if(againstBot){
            if(!player){
                logwin(player1name, true);
                addWin(player1name);
                addLoss("Bot");
            } 
            else{
                logwin("Bot", true);
                addWin("Bot");
                addLoss(player1name);
            }
        }
        else{
            if(!player){
                logwin(player1name, true);
                addWin(player1name);
                addLoss(player2name);
            }
            else{
                logwin(player2name, true);
                addWin(player2name);
                addLoss(player1name);
            }
        }
    }

    // closes the modal after clicking the x 
    instructionsSpan.onclick = function () {
        instructionsModal.style.display = "none";
    }

    // closes the modal after clicking the x 
    profileSpan.onclick = function () {
        profileModal.style.display = "none";
    }

    // closes the modal after clicking the x 
    scoreSpan.onclick = function () {
        scoreModal.style.display = "none";
    }

    aboutSpan.onclick = function () {
        aboutModal.style.display = "none";
    }

    // After clicking the submit button, handles all the selections made by the user
    submitSelectors.onclick = function (){
        submitconfig();
    }

    submitLogin.onclick = function (){
        const username = document.getElementById('usernameLogin').value;
        const password = document.getElementById('passwordLogin').value;
        while(username === "" || password === ""){
            // proper validation will be made when server gets implemented
            // for now we will not accept only when fields are left empty 
            alert("Username or password not valid. Fields can't be empty!");
            username = document.getElementById('usernameLogin').value;
            password = document.getElementById('passwordLogin').value;
        }


        document.getElementById('usernameLogin').value = "";
        document.getElementById('passwordLogin').value = "";
        allButHeaderDiv.style.display = "block"
        loginDiv.style.display = "none";
        nav.style.display = "block";
        
        player1name = username;
        initScoreboard();
        submitconfig();
    }

    logout.onclick = function() {
        nav.style.display = "none";
        loginDiv.style.display = "block";
        allButHeaderDiv.style.display = "none";
        console.log("User just logged out");
    }    

    document.getElementById('against').onchange = function() {
        const against = document.getElementById('against');
        const optionAgainst = against.options[against.selectedIndex].text;

        if(optionAgainst == "Bot"){
            document.getElementById("ia").disabled = false;
            document.getElementById("nameop").disabled = true;
        }
        else{
            document.getElementById("ia").disabled = true;
            document.getElementById("nameop").disabled = false;
        }
        
    }

    document.getElementById("nameop").onfocus = function() {
        this.style.backgroundColor = "white";
        nameop.placeholder = "";
    }

    submitconfig();
}

function submitconfig(){
    const against = document.getElementById('against');
    const optionAgainst = against.options[against.selectedIndex].text;

    const sizeCol = document.getElementById('sizeCol').value;

    const sizeRow = document.getElementById('sizeRow').value;

    const whoStarts = document.getElementById('whoStarts');
    const optionWhoStarts = whoStarts.options[whoStarts.selectedIndex].text;

    const nameop = document.getElementById("nameop");
    player2name = nameop.value;
    console.log(nameop.value);
    console.log(player2name);

    if(player2name == "" && optionAgainst != "Bot"){
        nameop.placeholder = "Invalid Name!";
        nameop.style.backgroundColor = "lightcoral";
        return;
    }

    playerColor = document.getElementById('colorme').value;
    opponentColor = document.getElementById('colorop').value;

    const table = document.getElementById('connect4div');    
    if(table.innerHTML != null){
        table.innerHTML = "";
    }

    const logDiv = document.getElementById('logDiv');
    if(logDiv.innerHTML != null){
        logDiv.innerHTML = "";
    }
    np = 0;
    row = Number(sizeRow);
    column = Number(sizeCol);

    vec_np = [];
    for(let i = 0; i<column; i++) vec_np.push(0);
    
    generateBoard(); //row and column were strings, make sure to change to number
    gameMatrix = createMatrix();
    
    fwin = false;

    const size = column;
    const dif = document.getElementById("ia").value;
    sizetodepth(size, dif);

    if(optionAgainst == "Bot")
        againstBot = true;
    else againstBot = false;

    if(optionWhoStarts == "Me"){
        player = true;
    }
    else {
        player = false;
        if(againstBot) playBot();
    }
}

function checkscorename(playerName){
    const obj = score.find(obj => obj.name == playerName);
    if(obj) return;
    else score.push(new Score(playerName)); 
}

function initScoreboard(){
    checkscorename("Bot");
    checkscorename(player1name);
}

function Score(name) {
    this.name = name;
    this.wins = 0;
    this.ties = 0;
    this.losses = 0;
}

function addScoreboardTitles(title, tableRow) {
    var td = document.createElement('td');
    var p = document.createElement('p');
    p.innerHTML = title;
    p.className = "pScore";
    td.appendChild(p);
    tableRow.appendChild(td)
}

function displayScoreBoard() {
    const scoreTable = document.getElementById('scoreTable');
    if(scoreTable != null){
        scoreTable.innerHTML = "";
    }
    var tr = document.createElement('tr');
    addScoreboardTitles("Name", tr);
    addScoreboardTitles("Wins", tr);
    addScoreboardTitles("Ties", tr);
    addScoreboardTitles("Losses", tr);
    scoreTable.appendChild(tr);

    for(var k in score){
        tr = document.createElement('tr');
        tr.className = "trScore";

        var td = document.createElement('td');
        td.className = "tdScore";
        var p = document.createElement('p');
        p.innerHTML = score[k].name;
        td.appendChild(p);
        tr.appendChild(td);
        

        td = document.createElement('td');
        td.className = "tdScore";
        p = document.createElement('p');
        p.innerHTML = score[k].wins;
        td.appendChild(p);
        tr.appendChild(td);
        

        td = document.createElement('td');
        td.className = "tdScore";
        p = document.createElement('p');
        p.innerHTML = score[k].ties;
        td.appendChild(p);
        tr.appendChild(td);


        td = document.createElement('td');
        td.className = "tdScore";
        p = document.createElement('p');
        p.innerHTML = score[k].losses;
        td.appendChild(p);
        tr.appendChild(td);

        scoreTable.appendChild(tr);
        
    }
}
//(4) 2 5 10 14
//(5) 2 5 10 12
//(6) 2 5 09 10
//(7) 2 5 08 09
//(8) 2 5 07 09
function sizetodepth(size, dif){
    if(dif == "Easy"){
        if(size == 4)      difficulty = 2;
        else if(size == 5) difficulty = 2;
        else if(size == 6) difficulty = 2;
        else if(size == 7) difficulty = 2;
        else               difficulty = 2;
    }else if(dif == "Medium"){
        if(size == 4)      difficulty = 5;
        else if(size == 5) difficulty = 5;
        else if(size == 6) difficulty = 5;
        else if(size == 7) difficulty = 5;
        else               difficulty = 5;
    }else if(dif == "Hard"){
        if(size == 4)      difficulty = 10;
        else if(size == 5) difficulty = 10;
        else if(size == 6) difficulty = 9;
        else if(size == 7) difficulty = 8;
        else               difficulty = 7;
    }else if(dif == "Hardcore (may be slow)"){
        if(size == 4)      difficulty = 14;
        else if(size == 5) difficulty = 12;
        else if(size == 6) difficulty = 10;
        else if(size == 7) difficulty = 9;
        else               difficulty = 9;
    }
}



