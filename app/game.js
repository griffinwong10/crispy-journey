// AUTHORS: Johnathan Eberly, Griffin Wong, Jason Liu, Ryan Kalbach
// DATE: 08/17/2020
// COURSE: CS 375-004
// TEAM: Crispy Journey
// PURPOSE: Database and Backend Functions


const pg = require("pg");
const express = require("express");
const app = express();
const port = 3000;
const hostname = "localhost";
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
let rooms = []
let roomTimer = 6000

// Create Database Connection
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
}).catch(function () {
	console.log("Promise Rejected");
});

// Use Middleware for parsing JSON
const bodyParser = require('body-parser');
const { q } = require("underscore");
app.use(bodyParser.json())

//Ryan Kalbach 9/3/20
function queryDatabaseForClient(client, payload){

  let queryString = `SELECT ${payload.join()} from player WHERE player_id = ${client}`;
  
	// Get health and armor from player table
	let q = pool.query(queryString).catch(function(err){
    console.log('Error executing query', err.stack);
  });
  return q;
}

// Griffin Wong 09/03/2020
// Reference: https://node-postgres.com/features/queries#parameterized-query

function queryDatabaseForAttack(attack){
  let getPlayerAttackStrength = 'SELECT attack_strength, attack_cooldown, attack_information, attack_name, attack_type FROM attack WHERE attack.attack_player_id = player.attack_player_id';

	// Get relevant attack columns from attack table
	pool.query(getPlayerAttackStrength, (err, result) => {
		if (err) {
		  return console.error('Error executing query', err.stack);
		  console.log(err);
		} else {
			for (let i=0; i < result.rows.length; i++) {
				playerInfoArr.push(result.rows[i]);
			}
			// Create JS Object
			let responseObject = {
				rows: playerInfoArr
			};
			return responseObject;
		}
	});
}

//Ryan Kalbach 9/3/20
function getPlayerID(){
  let queryString = 'SELECT MAX(player_id) from player';

  let q = pool.query(queryString).catch(function(err){
    console.log("Error getting player ID", err.stack);
  });
  return q;
}

//Ryan Kalbach 9/3/20
function clientCallsInitialize(username, userClass){
	let initPlayer = 'INSERT INTO player VALUES(DEFAULT, $1, 100, 0, 100, 0, 0, false, 1, $2)';
  let initPlayerValues = [username, userClass];//add room id and match id 

  // Get relevant attack columns from attack table
	let q = pool.query(initPlayer, initPlayerValues).catch(function(err){
    console.log('Error executing add player', err.stack);
  });
  return q;
}

//Ryan Kalbach 9/3/20
// Reference: https://node-postgres.com/features/queries#parameterized-query
function sendToDatabaseForClient(client, payload){

	// Update health and score if present in payload object

  let fields = Object.keys(payload); // Array of all field names
  let values = Object.values(payload); // Array of their respective values
  let queryString = `UPDATE player SET ${fields.join()} = ${values.join()} WHERE player_id = ${client}`;

  let q = pool.query(queryString).catch(function(err){
    console.log("Error updating client", err.stack);
  });
  return q;
}

//Ryan Kalbach 9/3/20
async function clientAsksForStats(client){
  let result = await queryDatabaseForClient(client, ['health', 'score', 'survival_time', 'kill_count', 'room_id']);
  let stats = result.rows[0];
  let activePlayerList = [];

  stats.score = calculateScore(stats.survival_time, stats.kill_count);
  stats.room_timer = roomTimer;
  stats.other_players = await getCharactersFromDatabase(stats.room_id);

  for (let i=0; i < stats.other_players.rows.length; i++) {
    activePlayerList.push(stats.other_players.rows[i]);
  }

  await sendToDatabaseForClient(client, {score: stats.score});
  return({"score":stats.score, "room_timer":stats.room_timer, "other_players":activePlayerList, "health": stats.health});
}


//Ryan Kalbach 9/3/20
function getCharactersFromDatabase(roomValue){
	// Select all players that are in a specific room
	let queryStringOne = 'SELECT player_id FROM player WHERE room_id = $1';

	// Change variable of roomValue with whatever room is being queried
	let valueTwo = [roomValue];

	let q = pool.query(queryStringOne, valueTwo).catch(function(err){
    console.log('Error getting targets', err.stack);
  });
  return q;
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
  let clientStats = queryDatabaseForClient(client, ['username', 'health', 'score', 'survival_time', 'kill_count', 'room_id', 'attack_player_id', 'attack_last_used'])
  let targetStats = queryDatabaseForClient(target, ['username', 'health', 'armor', 'room_id'])

	if( clientStats.room_id != targetStats.room_id ){
    return
  }
  if( clientStats.attack_player_id != attack ){
    return
  }

  let attackStats = queryDatabaseForAttack(attack)
  let message
  let clientPayload = {}
  let targetPayload = {}

  if( new Date() < (attackStats.attack_cooldown + clientStats.attack_last_used) ){
    return
  }

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
  clientCallsAttack : clientCallsAttack,
  queryDatabaseForClient : queryDatabaseForClient,
  getPlayerID : getPlayerID
};
