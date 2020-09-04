// AUTHORS: Johnathan Eberly, Griffin Wong, Jason Liu, Ryan Kalbach
// DATE: 08/17/2020
// COURSE: CS 375-004
// TEAM: Crispy Journey
// PURPOSE: Server-Side Code

var gameFunctions = require("./game.js");

const express = require("express");
const ws = require("ws");
const app = express();
const port = 3000;
const hostname = "localhost";

const validAttack = ["attack", "target"];//compare to attack request for validation
const validInit = ["username"];

// Use Middleware for parsing JSON
const bodyParser = require('body-parser');
const { clientAsksForStats, clientCallsInitialize} = require("./game.js");
app.use(bodyParser.json())

app.use(express.static("public_html"));

let httpServer = app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});

const wsServer = new ws.Server({server : httpServer, path : '/ws'});
let clients = [];
let id = 0;//PLAYER IDENTIFIER 
 
app.post('/init', async function(req, res){
    console.log("BOD:", req.body);
    let query = await clientCallsInitialize(req.body["username"], req.body["class"]);
    
    res.send("HERE");
})
// wsServer.on('connection', function(socket){
//     socket.id = id;
//     console.log(socket.id, "connected");
//     clients.push(socket);
//     id++;

//     socket.on('message', async function(message){//client attacks
//         let msg = JSON.parse(message);
//         console.log("MSG:", msg);
//         if(JSON.stringify(Object.keys(msg)) === JSON.stringify(validAttack) && clients[msg["target"]]){
//             console.log("attack: "+msg["attack"]+" target: "+msg["target"]+" attacker: "+socket.id);
//             let atkResult = gameFunctions.clientCallsAttack(socket.id, msg["target"], msg["attack"]);//call attack on target
//             clients[msg["target"]].send(JSON.stringify({"atkResult":atkResult["clientPayload"]}));
//             clients[socket.id].send(JSON.stringify({"atkResult":atkResult["targetPayload"]}));
//         } else if(JSON.stringify(Object.keys(msg)) === JSON.stringify(validInit)){
//             let stats = await clientAsksForStats(socket.id);//get initial stats, timer and targets
//             clients[socket.id].send(JSON.stringify({"score":stats["score"],"room_timer":stats["room_timer"],"other_players":stats["other_players"]}));
//         } else{
//             console.log("invalid");
//         }
//     })
//     socket.on('close', function(){
//         console.log("closed socket #"+socket.id);
//     })
// });