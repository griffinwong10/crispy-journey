// AUTHORS: Johnathan Eberly, Griffin Wong, Jason Liu, Ryan Kalbach
// DATE: 08/13/2020
// COURSE: CS 375-004
// TEAM: Crispy Journey
// PURPOSE: Server Side Code

// TODO IMPORT FUNCTIONS FROM game.js TO USE IN ROUTE HANDLERS GW 08/13/2020


const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

// Express constants
// Griffin Wong 08/12/2020
const pg = require("pg");
const express = require("express");
const app = express();
const port = 3000;
const hostname = "localhost";

// Database connections
// Griffin Wong 08/12/2020
const Pool = pg.Pool;
const pool = new Pool(env);

pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

// Middleware
// Griffin Wong 08/12/2020
const bodyParser = require('body-parser')
app.use(bodyParser.json())


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