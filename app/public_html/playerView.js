"use strict";
let ws;
let room;
let playerId;
let name;
let userClass;

const validClientPayload = ["score", "kill_count", "message"];
const validTargetPayload = ["health", "is_dead", "message"];
const validStats = ["score","room_timer","other_players"];
const classIDs = {"Barbarian":1, "Fighter":2, "Monk":3, "Paladin":4, "Ranger":5, "Rogue":6, "Wizard":7};

/*Testing only */
room = 1;
playerId = 1;

document.addEventListener('DOMContentLoaded', function(event){
    let classSelectDiv = document.getElementById("class-select");
    //fetch from /
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

        /*Test Log */
        // console.log(name);
        // console.log(userClass);

        if(name.length === 0){
            let usernameError = document.getElementById("username-error");
            usernameError.style.display = "block";
        }
        else{
            /*TODO put in when server is ready
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"new-user": name, "class": "cleric"}), //TODO class change to variable
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let overlay = document.getElementById("overlay");
                overlay.style.display = "none";
                //stats for player here
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            */

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
            let atk = {//dummy values until we can get them from UI
                "attack":i+1,
                "target":2//TODO: target selection
            }
            ws.send(JSON.stringify(atk));
            console.log("attack send")
        });
    }
}

function populateTargets(){
    //TODO get room from db
    fetch(`/targets?room=${room}`)
    .then(response => response.json())
    .then(data => {
        console.log('Targets returned:', data);
        let targetContainer = document.getElementById("targets");
        //Rewrite loop with actaul data
        for(let i = 0; i < 3; i++)
        {
            //considering radio button structure
            let target = document.createElement("div");
            target.classList.add("target");
            target.textContent = "Target Name, HP, Armor";
            targetContainer.appendChild(target);
            target.addEventListener("click", function(){
                //add as target
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function addSocketListeners(){
    ws.addEventListener('message', function(message){
        let data = JSON.parse(message.data);
        //TODO: put message values in UI 
        if(JSON.stringify(Object.keys(data)) === JSON.stringify(validStats)){//process score, room timer, and target list
            console.log("validStats", data["score"], data["room_timer"], data["other_players"]);
            let score = data["score"];
            let timer = data["room_timer"];
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
//TODO
//Test attack gen from db
//Test cd and sending fetch

//storing user id
//Storing room variable.


