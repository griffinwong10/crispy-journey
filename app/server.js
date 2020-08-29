// AUTHORS: Johnathan Eberly, Griffin Wong, Jason Liu, Ryan Kalbach
// DATE: 08/17/2020
// COURSE: CS 375-004
// TEAM: Crispy Journey
// PURPOSE: Server-Side Code

// TODO: 
// 1. IMPORT DB FUNCTIONS FROM game.js TO USE IN ROUTE HANDLERS GW 08/13/2020
// 2. 
// 3. 
// 4. 
// 5.

var gameFunctions = require("./game.js");

const express = require("express");
const ws = require("ws");
const app = express();
const port = 3000;
const hostname = "localhost";

const validAttack = ["attack", "target"];//compare to attack request for validation

const pg = require("pg");
const Pool = pg.Pool;
const pool = new Pool(env);

// Create Database Connection
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

// Use Middleware for parsing JSON
const bodyParser = require('body-parser');
const { clientAsksForStats } = require("./game.js");
app.use(bodyParser.json())

app.use(express.static("public_html"));

let httpServer = app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});

const wsServer = new ws.Server({server : httpServer, path : '/ws'});
let clients = [];
let id = 0;//PLAYER IDENTIFIER 

wsServer.on('connection', function(socket){
    socket.id = id;
    console.log(socket.id, "connected");
    clients.push(socket);
    id++;
    stats = clientAsksForStats(socket.id);//get initial stats, timer and targets
    clients[socket.id].send(JSON.stringify({"score":stats["score"],"room_timer":stats["room_timer"],"other_players":stats["other_players"]}));

    socket.on('message', function(message){//client attacks
        let atk = JSON.parse(message);
        if(JSON.stringify(Object.keys(atk)) === JSON.stringify(validAttack) && clients[atk["target"]]){
            console.log("attack: "+atk["attack"]+" target: "+atk["target"]+" attacker: "+socket.id);
            let atkResult = gameFunctions.clientCallsAttack(socket.id, atk["target"], atk["attack"]);//call attack on target
            clients[atk["target"]].send(JSON.stringify({"atkResult":atkResult["clientPayload"]});
            clients[socket.id].send(JSON.stringify({"atkResult":atkResult["targetPayload"]});
        }else{
            console.log("invalid");
        }
    })
    socket.on('close', function(){
        console.log("closed socket #"+socket.id);
    })
});