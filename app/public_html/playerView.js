"use strict";
let ws;
let room;
let playerId;
let attackTarget;
let onCd = [false, false, false];
let cdTimer = [-1, -1, -1];
let cooldown = [0, 0, 0];
/*Testing only */
room = 1;
playerId = 1;

document.addEventListener('DOMContentLoaded', function(event){
    let classSelectDiv = document.getElementById("class-select");
    //fetch from /
    //For loop through db json return
    let aClass = document.createElement("option");
    aClass.value = "warrior";
    aClass.textContent = "warrior";
    classSelectDiv.appendChild(aClass);
    let aClass2= document.createElement("option");
    aClass2.value = "shield";
    aClass2.textContent = "sheld";
    classSelectDiv.appendChild(aClass2);

    let submitNameBtn = document.getElementById("submit-btn");
    submitNameBtn.addEventListener("click", function(){
        let name = document.getElementById("username-input").value;
        let userClass = document.getElementById("class-select").value;

        if(name.length === 0){
            let usernameError = document.getElementById("username-error");
            usernameError.style.display = "block";
        }
        else{
            //using data = {player_id, health, armor, attacks: [{attack_id, attack_type, attack_name, attack_cooldown, attack_information}], class: {class_name, class_information}, room_timer}
            /*TODO put in when server is ready
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"username": name, "class": userClass}),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let overlay = document.getElementById("overlay");
                overlay.style.display = "none";
                updateStats(null, 0, 0, 0, data.health);
                createActionBtn(data.attacks);
                populateTargets();
                playerId = data.player_id;
                room = data.room;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            */

            ///PLS delete this is a proof of concept
            /*
            let overlay = document.getElementById("overlay");
            overlay.style.display = "none";
            let attacks =  [{"attack_id": 1, "attack_type": "fire", "attack_name": "fire ball", "attack_cooldown": 5, "attack_information": "n/A"}, {"attack_id": 2, "attack_type": "water", "attack_name": "slash", "attack_cooldown": 10, "attack_information": "n/A"}];
            createActionBtn(attacks);
            */
            ws = new WebSocket("ws:/localhost:3000/ws");
            ws.addEventListener('open', function() {
                console.log(name, userClass);
            });
            ws.addEventListener('message', function(message){
                let data = JSON.parse(message.data);
                //TODO: put message values in UI 
                if(JSON.stringify(Object.keys(data)) === JSON.stringify(validStats)){//process score, room timer, and target list
                    console.log("validStats", data["score"], data["room_timer"]);
                    let score = data["score"];
                    let timer = data["room_timer"];
                    updateStats(timer, score, null, null, null);
                } 
                else if (JSON.stringify(Object.keys(data)) === JSON.stringify(validClientPayload)){//update kill_count, score, event log
                    console.log("cPayload", data["kill_count"], data["score"], data["message"]);
                    let killcount = data["kill_count"];
                    let score = data["score"];

                    updateStats(null, score, null, killcount, null);
                    addToHistory(data["message"]);
                } 
                else if (JSON.stringify(Object.keys(data)) === JSON.stringify(validTargetPayload)){//update health, is_dead, message
                    console.log("tPayload", data["health"], data["is_dead"], data["message"]);
                    let health = data["health"];
                    let is_dead = data["is_dead"];

                    updateStats(null, null, null, null, health);
                    addToHistory(data["message"]);
                } 
                else {//invalid message
                    console.log("invalid message");
                }
            });
        }
    });
});

function createActionBtn(attacksArray){
    let actionContainer = document.getElementById("actions");
    //TODO replace loop coniditionals with returned attack list from db
    for(let i = 0; i < attacksArray.length; i++)
    {
        let actionBtn = document.createElement("div");
        actionBtn.id = attacksArray[i].attack_id;
        actionBtn.classList.add("action");
        actionBtn.textContent = attacksArray[i].attack_name;
        let actionCd = document.createElement("div");
        actionCd.classList.add("action-cd");
        actionCd.classList.add("hidden");
        actionBtn.appendChild(actionCd);
        actionContainer.appendChild(actionBtn);
        cooldown[i] = attacksArray[i].attack_cooldown;
        let countdown = cooldown[i];
        actionBtn.addEventListener("click", function(){
            if(!onCd[i]){
                onCd[i] = true;
                actionCd.classList.remove("hidden");
                actionCd.textContent = countdown;
                cdTimer[i] = window.setInterval(function(){
                    console.log("run interval");
                    countdown = countdown - 1;
                    if(countdown === 0){
                        clearInterval(cdTimer[i]);
                        actionCd.classList.add("hidden");
                        onCd[i] = false;
                        countdown = cooldown[i];
                    }
                    else{
                        actionCd.textContent = countdown;
                    }
                }, 1000);
                let targetRadio = document.getElementsByName('other-player');
                for (let i = 0; i < targetRadio.length; i++) {
                    if (targetRadio[i].checked) {
                        attackTarget = targetRadio[i].value;
                        break;
                    }
                }
                let atk = {//dummy values until we can get them from UI
                    "attack":i+1,
                    "target":2
                }
                ws.send(JSON.stringify(atk));
                console.log("attack send")
            }
        });
    }
}

//using data = {health, score, survival_time, kill_count, room_timer, other_players: [{player_id, username, health, score}], leaderboard: [{username, score}]}
function populateTargets(){
    fetch(`/targets?room=${room}`)
    .then(response => response.json())
    .then(data => {
        console.log('Targets returned:', data);
        let targetContainer = document.getElementById("targets");
        for(let i = 0; i < data.other_players.length; i++)
        {
            let targetRadio = document.createElement("input");
            targetRadio.type = "radio";
            targetRadio.id = "player-id-" + i.toString() + "-" + data.other_players[i].player_id.toString();
            targetRadio.name = "other-player";
            targetRadio.value = data.other_players[i].player_id;
            let targetLabel = document.createElement("label");
            targetLabel.for = "player-id-" + i.toString() + "-" + data.other_players[i].player_id.toString();
            targetLabel.textContent = data.other_players[i].username + "| Health: " + data.other_players[i].health.toString() + "| Score: " + data.other_players[i].score.toString();
            let breakTag = document.createElement("br");
            targetContainer.appendChild(targetRadio);
            targetContainer.appendChild(targetLabel);
            targetContainer.appendChild(breakTag);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function addToHistory(historyEntry){
    let msg = document.createElement("div");
    msg.textContent = historyEntry;
    document.getElementById("history").append(msg);
}

//Works, but deprecated
/*
function populateHistory(){
    let history = document.getElementById("history");
    //update throuch socket
    for(let i = 0; i < 3; i++)
    {
        let hisData = document.createElement("div");
        hisData.classList.add("history-data");
        hisData.textContent = "Attacker Defender Damage ";
        history.appendChild(hisData);
    }
}
*/

//Low Priority
/*
function populateLeaderboard(){
    let learderboard = document.getElementById("leaderboard");
    //TODO replace with fetch
    for(let i = 0; i < 3; i++)
    {
        let ranker = document.createElement("div");
        ranker.classList.add("leaderborad-player");
        ranker.textContent = "Name Score";
        learderboard.appendChild(ranker);
    }
}
*/

function updateStats(roomTimer, score, survivalTime, killCount, health){
    //Assume all parameters are None or integers
    let roomTimerDiv = document.getElementById("room-timer");
    let scoreDiv = document.getElementById("score");
    let survivalTimeDiv = document.getElementById("survival-time");
    let killCountDiv = document.getElementById("kill-count");
    let healthDiv = document.getElementById("health");
    if(roomTimer !== null){
        roomTimerDiv.textContent = "Time Left: "  + roomTimer;
    }
    if(score !== null){
        scoreDiv.textContent = "Score: " + score;
    }
    if(survivalTime !== null){
        survivalTimeDiv.textContent = "Survival: " + survivalTime;
    }
    if(killCount !== null){
        killCountDiv.textContent = "Kill Count: " + killCount;
    }
    if(health !== null){
        healthDiv.textContent = "Health: " + health;
    }
}

function getRoundTime(){
    //pull from web socket unsure how to do
}

ws.onmessage = function(message){
    console.log(message);
};


//TODO
//Test attack gen from db
//Test cd and sending fetch

//storing user id
//Storing room variable.