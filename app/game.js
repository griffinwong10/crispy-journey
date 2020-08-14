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

function sendToDatabaseForClient(client, data){
	// TODO
}

function sendStatsToClient(client, stats){
	// TODO: Send HP, ATK, Armor to client.
}

function clientAsksForStats(client){
	let stats = queryDatabaseForClient(client, ['hp', 'atk', 'armor'])
	sendStatsToClient(client, stats)
}



// Griffin Wong 08/12/2020
// Query database for current players
// Returns a a list of IDs
function getCharactersFromDatabase(){

// // Select all players that are in a specific room
// // TODO: Determine if queryStringTwo is necessary
// let queryStringTwo = 'SELECT players.player_id FROM players WHERE players.room_id = $1';
// let valueTwo = [replaceThisValue];

// Select all players that are still in the match
let queryStringOne = 'SELECT players.player_id FROM players WHERE players.is_dead = FALSE';

pool.query(queryStringOne, (err, result) => {
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
})
}


// // Requirement 1F; Parameterized Query Insertion
// // Reference: https://node-postgres.com/features/queries#parameterized-query
// let text = 'INSERT INTO books(title, genre, quality) VALUES($1, $2, $3)';
// let values = [req.body.title, req.body.genre, req.body.quality];

// // Requirement 1E; Insert Book
// pool.query(text, values, (err, res) => {
//     if (err) {
//         console.log("Error", err.stack);
//     } else {
//         console.log("Book has been added!");
//     }
// });

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