// AUTHORS: Johnathan Eberly, Griffin Wong, Jason Liu, Ryan Kalbach
// DATE: 08/17/2020
// COURSE: CS 375-004
// TEAM: Crispy Journey
// PURPOSE: Server-Side Code


const express = require("express");
const ws = require("ws");
const app = express();
const port = 3000;
const hostname = "localhost";

const validAttack = ["attack", "target"];//compare to attack request for validation
const validInit = ["playerID"];

// Use Middleware for parsing JSON
const bodyParser = require('body-parser');
const { clientCallsInitialize, getPlayerID, clientAsksForStats, clientCallsAttack } = require("./game.js");

var roomTimer = 6000;
var roomInterval;

app.use(bodyParser.json())

app.use(express.static("public_html"));

let httpServer = app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});

const wsServer = new ws.Server({server : httpServer, path : '/ws'});
var clients = {};
 
app.post('/init', async function(req, res){
    await clientCallsInitialize(req.body["username"], req.body["class"]);
    let playerID = await getPlayerID();
    res.send(JSON.stringify(playerID.rows[0]["max"]));
})

 wsServer.on('connection', function(socket){
     if(Object.keys(clients).length == 0){
        roomInterval = setInterval(function(){
            roomTimer--;
            Object.values(clients).forEach(function(skt){
                skt.send(JSON.stringify({"room_timer":roomTimer}));
            });
            if(roomTimer <= 0){
                roomSwitch();
                roomTimer = 6000
            }
        }, 1000);
     }
    socket.on('message', async function(message){//client attacks
        let msg = JSON.parse(message);
        console.log("MSG:", msg);
        if(JSON.stringify(Object.keys(msg)) === JSON.stringify(validAttack)){//attack call
            console.log("attack: "+msg["attack"]+" target: "+msg["target"]+" attacker: "+socket.id);//code should work up to here
            let atkResult = await clientCallsAttack(socket.id, msg["target"], msg["attack"]);//call attack on target
            console.log("atkResult:", atkResult);
            clients[msg["target"]].send(JSON.stringify({"atkResult":atkResult["clientPayload"]}));
            clients[socket.id].send(JSON.stringify({"atkResult":atkResult["targetPayload"]}));
        } else if(JSON.stringify(Object.keys(msg)) === JSON.stringify(validInit)){//init call
            socket.id = msg["playerID"];
            clients[socket.id] = socket;
            let stats = await clientAsksForStats(socket.id);//get initial stats, timer and targets
            clients[socket.id].send(JSON.stringify({"score":stats["score"],"room_timer":stats["room_timer"],"other_players":stats["other_players"]}));
        } else{
            console.log("invalid");
        }
    });
    socket.on('close', function(){
        delete clients[socket.id];
        if(Object.keys(clients).length == 0){
            clearInterval(roomInterval);
            roomTimer = 6000;
            console.log("close");
        }
        console.log(clients);
        console.log("closed socket #"+socket.id);
    })
});