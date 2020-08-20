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
                "target":2
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

ws.onmessage = function(message){
    console.log(message);
};


//TODO
//Test attack gen from db
//Test cd and sending fetch

//storing user id
//Storing room variable.


