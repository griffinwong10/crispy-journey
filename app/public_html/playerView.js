"use strict";
let ws;
let room;
let playerId;
let name;
let userClass;
var target;

const validClientPayload = ["score", "kill_count", "message"];
const validTargetPayload = ["health", "is_dead", "message"];
const validStats = ["score","room_timer","other_players"];
const classIDs = {"Barbarian":1, "Fighter":2, "Monk":3, "Paladin":4, "Ranger":5, "Rogue":6, "Wizard":7};

/*Testing only */
room = 1;
playerId = 1;

document.addEventListener('DOMContentLoaded', function(event){
    let classSelectDiv = document.getElementById("class-select");
    //For loop through db json return
    Object.keys(classIDs).forEach(function(key){//populate class select list
        let aClass = document.createElement("option");
        aClass.value = classIDs[key];
        aClass.textContent = key;
        classSelectDiv.appendChild(aClass);
    })

    let submitNameBtn = document.getElementById("submit-btn");
    submitNameBtn.addEventListener("click", function(){
        name = document.getElementById("username-input").value;
        userClass = document.getElementById("class-select").value;

        if(name.length === 0){
            let usernameError = document.getElementById("username-error");
            usernameError.style.display = "block";
        }
        else{
            let overlay = document.getElementById("overlay");
            overlay.style.display = "none";
            fetch('http://localhost:3000/init', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username:name, class:userClass})
            }).then(function (response){
                response.json().then(function(data){
                    ws = new WebSocket('ws:/localhost:3000/ws');
                    ws.addEventListener('open', function() {
                        ws.send(JSON.stringify({"playerID":data}));
                    });  
                    addSocketListeners();
                    console.log("DATA:", data);
                })
            })
            createActionBtn();
        }
    });
});

function createActionBtn(){
    let actionContainer = document.getElementById("actions");
    //TODO replace loop coniditionals with returned attack list from db
    for(let i = 0; i < 3; i++)
    {
        let actionBtn = document.createElement("div");
        actionBtn.classList.add("action");
        actionBtn.textContent = "attack";
        actionContainer.appendChild(actionBtn);
        actionBtn.addEventListener("click", function(){
            if(target){
                let atk = {//dummy values until we can get them from UI
                    "attack":i+1,
                    "target":target
                }
                // target = null;
                ws.send(JSON.stringify(atk));
            } else {
                console.log("invalid target");
                let msg = document.createElement("div");
                msg.style.width = '100%';
                msg.text = "Select a target first by clicking on the player's name in the top right!";
                document.getElementById("history").append(msg);
            }
        });
    }
}

function populateTargets(targets){
    //TODO get room from db
    let targetContainer = document.getElementById("targets");
    targets.forEach(function(targetPlayer){
        let targetBtn = document.createElement("button");
        targetBtn.textContent = "PLAYER: "+targetPlayer["username"]+"\nHP: "+targetPlayer["health"];
        targetBtn.style.width = '100%';
        targetBtn.addEventListener("click", function(){
            target = targetPlayer["player_id"];
        });
        targetContainer.append(targetBtn);
    });
}

function addSocketListeners(){
    ws.addEventListener('message', function(message){
        let data = JSON.parse(message.data);
        if(JSON.stringify(Object.keys(data)) === JSON.stringify(validStats)){//process score, room timer, and target list
            console.log("validStats", data["score"], data["room_timer"], data["other_players"]);
            let score = data["score"];
            let timer = data["room_timer"];
            let targets = data["other_players"];
            populateTargets(targets);
        } 
        else if (JSON.stringify(Object.keys(data)) === JSON.stringify(validClientPayload)){//update kill_count, score, event log
            console.log("cPayload", data["kill_count"], data["score"], data["message"]);
            let killcount = data["kill_count"];
            let score = data["score"];

            let msg = document.createElement("div");
            msg.textContent = data["message"];
            document.getElementById("history").append(msg);
        } 
        else if (JSON.stringify(Object.keys(data)) === JSON.stringify(validTargetPayload)){//update health, is_dead, message
            console.log("tPayload", data["health"], data["is_dead"], data["message"]);
            let health = data["health"];
            let is_dead = data["is_dead"];

            let msg = document.createElement("div");
            msg.textContent = data["message"];
            document.getElementById("history").append(msg);
        } 
        else {//invalid message
            console.log("invalid message");
        }
    })
}