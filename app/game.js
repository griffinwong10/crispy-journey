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



// Griffin Wong 08/12/2020
const pg = require("pg");
const express = require("express");
const app = express();
const port = 3000;
const hostname = "localhost";
const Pool = pg.Pool;
const pool = new Pool(env);

// Create Database Connection
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

// Use Middleware for parsing JSON
const bodyParser = require('body-parser')
app.use(bodyParser.json())



// TODO: Query database for the listed 
// fields of the given client ID and Return 
// as a dict Johnathan Eberly ND/ND/2020
function queryDatabaseForClient(client, fields){

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
function sendToDatabaseForClient(client, data){

	let createPlayer = 'INSERT INTO player(username, class_id) VALUES($1, $2)';
	let createPlayerValues = [req.body.username, req.body.class];

	pool.query(createPlayer, createPlayerValues, (err, res) => {
	    if (err) {
	        console.log("Error", err.stack);
	    } else {
	        console.log("Player has been added to the match!");
	    }
	});
}



// Griffin Wong 08/13/2020
// Parameterized Query Insertion
// Reference: https://node-postgres.com/features/queries#parameterized-query

// NOTE: The query to select attack_strength may be incorrect
// TODO: Send HP, Attack Strength (ATK), Armor to client
function sendStatsToClient(client, stats){
	
	let getPlayerInfoString = 'SELECT health, armor FROM player WHERE player_id = $1';
	let getPlayerInfoValues = [req.query.player_id];
	let getPlayerAttackStrength = 'SELECT attack_strength FROM attack WHERE attack.attack_player_id = player.attack_player_id';

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

	// Send Response to Client
	res.setHeader("Content-Type", "application/json");
	res.status(200).send(jsonResonseBody);
	console.log(jsonResonseBody);
}


// Johnathan Eberly 08/11/2020
function clientAsksForStats(client){
	let stats = queryDatabaseForClient(client, ['hp', 'atk', 'armor'])
	sendStatsToClient(client, stats)
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

function clientAsksForTargets(client){
	let possibleTargets = getCharactersFromDatabase
	// TODO: Filter to a smaller list
	let currentTargets
	sendToDatabaseForClient(client, {targets: currentTargets})
}



function clientCallsAttack(client, target, attack){
	let clientStats = queryStatsForClient(client, ['atk', 'attacks', 'targets'])
	// Something like {atk: 70, attacks: {0: {cooldown: 5000, lastUsed: 1596906504861}}, targets: [17, 25, 64]}
	
	if(clientStats.targets.indexOf(target) == -1){
		return
	}
	
	if(Object.keys(clientStats.attacks).indexOf(attack) == -1){
		return
	}
	
	if(new Date() < (clientStats.attacks[attack].lastUsed + clientStats.attacks[attack].cooldown)){
		return
	}
	
	// TODO: Process the actual attack
}