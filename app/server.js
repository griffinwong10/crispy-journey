const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

//INCLUDE DATABASE IMPORTS HERE, WE NEED AN env.json FILE WITH DB INFO AS WELL
//IMPORT FUNCTIONS FROM game.js TO USE IN ROUTE HANDLERS

app.get('/', function(req, res){//when client reaches the main page, server queries database to get their stats
    clientAsksForStats();
    res.send();
})

app.get('/targets', function(req, res){//client presses a button to get list of potential targets, server queries database and returns list
    clientAsksForTargets();//not sure if we want to send any client data to this function, might need to change to a post request
    res.send();
});

app.post('/attack', function(req, res){//client sends attacktype and target id, server queries database to check cooldowns and do damage calculations
    clientCallsAttack();
    res.send();
})

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});