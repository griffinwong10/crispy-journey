// AUTHOR: Johnathan Eberly, Griffin Wong
// DATE: 08/12/2020
// COURSE: CS 375-004
// TEAM: Crispy Journey
// PURPOSE: Database/Backend Functions

// Express constants
// Griffin Wong 08/12/2020
const pg = require("pg");
const express = require("express");
const app = express();
const port = 3000;
const hostname = "localhost";

// Database connections
// Griffin Wong 08/12/2020
const Pool = pg.Pool;
const pool = new Pool(env);

pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

// Middleware
// Griffin Wong 08/12/2020
const bodyParser = require('body-parser')
app.use(bodyParser.json())


function queryDatabaseForClient(client, fields){
	// TODO: Query database for the listed fields of the given client ID
	// Return as a dict
}

// Griffin Wong 08/13/2020
// Parameterized Query Insertion
// Reference: https://node-postgres.com/features/queries#parameterized-query

// TODO This may need to be placed in the server.js file to allow for the
// 	request body to be parsed using middleware and to extract/submit
// 	information to the database

// Create Player with Username and Class Type
function sendToDatabaseForClient(client, data){

	let createPlayerOne = 'INSERT INTO player(username, fk_class) VALUES($1, $2)';
	let createPlayerValuesOne = [req.body.username, req.body.class];

	pool.query(createPlayerOne, createPlayerValuesOne, (err, res) => {
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

// NOTE: There may be an issue with selecting attack_strength due to the join table
// TODO: Send HP, Attack Strength (ATK), Armor to client.
function sendStatsToClient(client, stats){
	
	let getPlayerInfoString = 'SELECT health, attack_strength, armor FROM player WHERE player.player_id = $1';
	let getPlayerInfoValues = [req.query.player_id];

	pool.query(getPlayerInfoString, getPlayerInfoValues, (err, result) => {
		if (err) {
		  return console.error('Error executing query', err.stack)
		  console.log(err)
		} else {

			let playerInfoArr = [];

			for (let i=0; i < result.rows.length; i++) {
				playerInfoArr.push(result.rows[i]);
			}

			// Create JS Object
			let jsonResonseBody = {
				rows: playerInfoArr,
			};

			// Send Response to Client
			res.setHeader("Content-Type", "application/json");
			res.status(200).send(jsonResonseBody);
			console.log(jsonResonseBody);
		}
	})



}


// Johnathan Eberly 08/11/2020
function clientAsksForStats(client){
	let stats = queryDatabaseForClient(client, ['hp', 'atk', 'armor'])
	sendStatsToClient(client, stats)
}


// Griffin Wong 08/12/2020
// Query database for current players
// Returns a a list of IDs
function getCharactersFromDatabase(){

	// Select all players that are in a specific room
	let queryStringOne = 'SELECT player.player_id FROM player WHERE player.room_id = $1';

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