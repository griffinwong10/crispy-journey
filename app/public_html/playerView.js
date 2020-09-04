"use strict";
const ws = new WebSocket("ws:/localhost:3000/ws");
let room;
let playerId;
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

        /*Test Log */
        console.log(name);
        console.log(userClass);

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

            /*Testing only */
            let overlay = document.getElementById("overlay");
            overlay.style.display = "none";
            createActionBtn();
            //Occur every reset
            populateTargets();
            populateHistory();s
        }
    });
});

function createActionBtn(){
    let actionContainer = document.getElementById("actions");
    //TODO replace loop coniditionals with returned attack list from db
    for(let i = 0; i < 3; i++)
    {
        let attackTarget;
        let actionBtn = document.createElement("div");
        actionBtn.id = i;//TODO replace with action id on pull
        actionBtn.classList.add("action");
        actionBtn.textContent = "attack";
        actionContainer.appendChild(actionBtn);
        actionBtn.addEventListener("click", function(){
            let actionOverlay = document.createElement("div");
            let targetRadio = document.getElementsByName('other-player');
            for (let i = 0; i < targetRadio.length; i++) {
            if (targetRadio[i].checked) {
                // do whatever you want with the checked radio
                let attackTarget = targetRadio[i].value;
                break;
            }
            }
            let atk = {//dummy values until we can get them from UI
                "attack":i+1,
                "target":2
            }
            ws.send(JSON.stringify(atk));
            console.log("attack send")
        });
    }
}

function populateTargets(){
    //TODO get room from db
    /*
    fetch(`/targets?room=${room}`)
    .then(response => response.json())
    .then(data => {
        console.log('Targets returned:', data);
        let targetContainer = document.getElementById("targets");
        //Rewrite loop with actaul data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    */
    let targetContainer = document.getElementById("targets");
    //TODO Rewrite loop with actaul data
    /*radio Button USE THIS*/
    for(let i = 0; i < 3; i++)
    {
        //TODO value should be player ID
        let targetRadio = document.createElement("input");
        targetRadio.type = "radio";
        targetRadio.id = "id" + i.toString();
        targetRadio.name = "other-player";
        targetRadio.value = "id" + i.toString();
        let targetLabel = document.createElement("label");
        targetLabel.for = "id" + i.toString();
        targetLabel.textContent = "Target Name, HP, Armor " + i.toString();
        let breakTag = document.createElement("br");
        targetContainer.appendChild(targetRadio);
        targetContainer.appendChild(targetLabel);
        targetContainer.appendChild(breakTag);
    }
}

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


//Low Priority
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

function updateStats(){
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