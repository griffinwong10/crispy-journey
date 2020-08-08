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

function getCharactersFromDatabase(){
	// TODO: Query database for current players
	// Return as a list of IDs
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