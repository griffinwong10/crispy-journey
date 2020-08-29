// AUTHORS: Johnathan Eberly, Griffin Wong, Jason Liu, Ryan Kalbach
// DATE: 08/17/2020
// COURSE: CS 375-004
// TEAM: Crispy Journey
// PURPOSE: Database and Backend Functions


// TODO:
// 1. Determine what fields of the given client ID need to be returned for
// 			queryDatabaseForClient function Griffin Wong 08/17/2020
// 2.
// 3.
// 4.
// 5.

// Griffin Wong 08/19/2020
// Here is the postgreSQL statement that can be used to update values
// A couple of examples are included below as well

// let yourPlayerID = "SELECT player_id FROM player WHERE username = 'player0ne'";
// let yourPlayerHealth =  "SELECT health FROM player WHERE username = 'player0ne'";

// NOTE: This will need to be changed to subtract the attack damage that is associated with
// the attack that the opponent used agaisnt the player. The database structure seems
// like it needs to be changed to reflect this requirement. We can discuss on Thurs.

// let updatedHealth = yourPlayerHealth - 5;
// UPDATE player SET health = updatedHealth WHERE player_id = yourPlayerID;


// Griffin Wong 08/12/2020
const pg = require("pg");
const express = require("express");
const app = express();
const port = 3000;
const hostname = "localhost";
const Pool = pg.Pool;
const pool = new Pool(env);
let rooms = []
let roomTimer = 6000

// Create Database Connection
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

// Use Middleware for parsing JSON
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// TODO: Test what this returns and make it work

// NOTE: The query to select attack_strength may be incorrect
function queryDatabaseForClient(client, fields){

	let getPlayerInfoString = 'SELECT health, armor FROM player WHERE player_id = $1';
	let getPlayerInfoValues = [client];

  let playerInfoArr = [];

	// Get health and armor from player table
	pool.query(getPlayerInfoString, getPlayerInfoValues, (err, result) => {
		if (err) {
		  return console.error('Error executing query', err.stack)
		  console.log(err)
		} else {
			for (let i=0; i < result.rows.length; i++) {
				playerInfoArr.push(result.rows[i]);
			}
			// Create JS Object
			let jsonResonseBody = {
				rows: playerInfoArr,
			};
		}
	});
}

function queryDatabaseForAttack(attack){
  let getPlayerAttackStrength = 'SELECT attack_strength FROM attack WHERE attack.attack_player_id = player.attack_player_id';

	// Get attack strength from attack table
	pool.query(getPlayerAttackStrength, (err, result) => {
		if (err) {
		  return console.error('Error executing query', err.stack)
		  console.log(err)
		} else {
			for (let i=0; i < result.rows.length; i++) {
				playerInfoArr.push(result.rows[i]);
			}
			// Create JS Object
			let jsonResonseBody = {
				rows: playerInfoArr,
			};
		}
	});
}


// Griffin Wong 08/13/2020
// Reference: https://node-postgres.com/features/queries#parameterized-query

// TODO: This may need to be placed in the server.js file to allow for the
// 	request body to be parsed using middleware and to extract/submit
// 	information to the database

// NOTE: These were the only two form fields
// that I saw on playerView.html,
// we can discuss if there are more params
// Griffin Wong 08/17/2020

// Create Player with Username and Class Type
// that uses a parameterized Query Insertion
function clientCallsInitialize(req){

	let createPlayer = 'INSERT INTO player(username, class_id) VALUES($1, $2)';
	let createPlayerValues = [req.body.username, req.body.class];

	pool.query(createPlayer, createPlayerValues, (err, res) => {
	    if (err) {
	        console.log("Error", err.stack);
	    } else {
	        console.log("Player has been added to the match!");
          console.log(JSON.stringify(res));
          // TODO: Determine res structure, then send stats to client.
	    }
	});
}


// Griffin Wong 08/13/2020
// Parameterized Query Insertion
// Reference: https://node-postgres.com/features/queries#parameterized-query

// TODO: Send HP, Attack Strength (ATK), Armor to client
function sendStatsToClient(client, stats){

	// Send Response to Client
	res.setHeader("Content-Type", "application/json");
	res.status(200).send(jsonResonseBody);
	console.log(jsonResonseBody);
}

function sendToDatabaseForClient(client, payload){
  // TODO
}


// Johnathan Eberly 08/22/2020
function clientAsksForStats(client){
  let stats = queryDatabaseForClient(client, ['health', 'score', 'survival_time', 'kill_count'])
  stats.score = calculateScore(stats.survival_time, stats.kill_count)
  stats.room_timer = room_timer
  stats.other_players = getCharactersFromDatabase()
  sendToDatabaseForClient(client, {score: stats.score})
  return({"score":stats.score, "room_timer":stats.room_timer, "other_players":stats.other_players});
}


// Griffin Wong 08/17/2020
// Query database for current players
// Returns a a list of IDs
function getCharactersFromDatabase(){

	let roomValue; // Define this for each player

	// Select all players that are in a specific room
	let queryStringOne = 'SELECT player_id FROM player WHERE room_id = $1';

	// Change variable of roomValue with whatever room is being queried
	let valueTwo = [roomValue];

	pool.query(queryStringOne, valueTwo, (err, result) => {
		if (err) {
		return console.error('Error executing query', err.stack)
		console.log(err)
		} else {

			// Initialize array
			let activePlayerList = [];

			// Create list of all player IDs
			for (let i=0; i < result.rows.length; i++) {
				activePlayerList.push(result.rows[i]);
			}

			// Create JS Object
			let activePlayersObject = {
				players: activePlayerList,
			};

			// Send Response to Client
			res.setHeader("Content-Type", "application/json");
			res.status(200).send(jsonResonseBodyTwo); // JSON Body
			console.log(jsonResonseBodyTwo);
		}
	});
}

function roomSwitch(){
  let allClients = []
  let newRooms = []
  for(let i = 0; i < rooms.length; i++){
    newRooms.push([])
    for(let j = 0; j < rooms[i].length; j++){
      allClients.push(rooms[i][j])
    }
  }

  let roomMax = Math.ceil(allClients.length / allRooms.length) // TODO: Decide room count dynamically

  // Clients get popped when added to a valid room. If the room is full, roll again.
  for(;allClients.length > 0;){

    let targetRoom = Math.floor(Math.random * newRooms.length)

    if(newRooms[targetRoom].length < roomMax){
      newRooms[targetRoom].push(allClients.pop())
    }

  }

  rooms = newRooms

  // Update all the clients accordingly
  for(let i = 0; i < rooms.length; i++){
    for(let j = 0; j < rooms[i].length; j++){
      let survivalTime = queryDatabaseForClient(rooms[i][j], "survival_time").survival_time + 1
      clientAsksForStats(rooms[i][j])
    }
  }
}

function calculateScore(survival_time, kill_count){
  return (survival_time * 12) + (kill_count * 5)
}

function clientCallsAttack(client, target, attack){
  let clientStats = queryDatabaseForClient(client, ['username', 'health', 'score', 'survival_time', 'kill_count', 'room_id', 'attack_player_id'])
  let targetStats = queryDatabaseForClient(target, ['username', 'health', 'armor', 'room_id'])

	if( clientStats.room_id != targetStats.room_id ){
    return
  }
  if( clientStats.attack_player_id != attack ){
    return
  }
  // TODO: Check cooldown

  let attackStats = queryDatabaseForAttack(attack)
  let message
  let clientPayload = {}
  let targetPayload = {}

  if(attackStats.attack_strength <= targetStats.armor){
    message = `${clientStats.username} tried to use ${attackStats.attack_name} on ${targetStats.username}, but it failed to pierce armor!`
  } else {
    let damage = attackStats.attack_strength - targetStats.armor
    if(targetStats.health <= damage){
      
      message = `${clientStats.username} killed ${targetStats.username} with ${attackStats.attack_name} for ${damage} damage!`
      
      clientPayload = {
        score: calculateScore(clientStats.survival_time, clientStats.kill_count + 1),
        kill_count: clientStats.kill_count + 1
      }
      
      targetPayload = {
        health: 0,
        is_dead: true
      }
      
    } else {
      
      message = `${clientStats.username} used ${attackStats.attack_name} on ${targetStats.username} for ${damage} damage!`
      
      targetPayload = {
        health: targetStats.health - damage
      }
    }
  }
  
  sendToDatabaseForClient(client, clientPayload)
  sendToDatabaseForClient(target, targetPayload)

  clientPayload.message = message;
  targetPayload.message = message;

  return {"client":clientPayload, "target":targetPayload};
}

setTimeout(function(){
  roomTimer--
  if(roomTimer <= 0){
    roomSwitch()
    roomTimer = 6000
  }
}, 10)

module.exports = {
  clientCallsInitialize : clientCallsInitialize,
  clientAsksForStats : clientAsksForStats,
  clientCallsAttack : clientCallsAttack
};