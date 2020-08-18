"use strict";
document.addEventListener('DOMContentLoaded', function(event){
    let classSelectDiv = document.getElementById("class-select");
    //For loop through db json return
    let aClass = document.createElement("option");
    aClass.value = "warrior";
    aClass.textContent = "warrior";
    classSelectDiv.appendChild(aClass);
    let aClass2= document.createElement("option");
    aClass2.value = "sheild";
    aClass2.textContent = "sheild";
    classSelectDiv.appendChild(aClass2);

    let submitNameBtn = document.getElementById("submit-btn");
    submitNameBtn.addEventListener("click", function(){
        let name = document.getElementById("username-input").value;
        //let class TODO after pulls from db
        console.log(name);
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            */
            
        }
    });
});


//Enter Username and select class input
    //Default route is /
    //Send POST to / to add username + class
    //Return Default Stats and attacks ID in database and currernt round timer
    //

//Each attack sends another POST request to /attack
//Attack ID, and target ID

//TODO
//Test Class gen on front page
//Test attack gen from db
//Test cd and sending fetch


