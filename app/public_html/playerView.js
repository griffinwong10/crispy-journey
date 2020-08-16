"use strict";

const ws = new WebSocket("ws:/localhost:3000/attack");

document.addEventListener('DOMContentLoaded', function(event){
    let classSelectDiv = document.getElementById("class-select");
    //fetch classes from db and populate classSelectDiv

    let submitNameBtn = document.getElementById("submit-name-btn");
    submitNameBtn.addEventListener("click", function(){
        let name = document.getElementById("name-input").value;
        //let class TODO after pulls from db
        console.log(name);
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        let overlay = document.getElementById("overlay");
        overlay.style.display = "none";
    });
});


//Enter Username and select class input
    //Default route is /
    //Send POST to / to add username + class
    //Return Default Stats and attacks ID in database and currernt round timer
ws.onopen = function(){
    console.log("connected");
    if(overlay.style.display === "none"){
        ws.send("ATTACK");//placeholder until we add attack button and figure out request format
        /*document.getElementById("attack-button").addEventListener("click", function(){
            ws.send(atkInfo);
        })*/
    }
};

//Each attack sends another POST request to /attack
//Attack ID, and target ID


