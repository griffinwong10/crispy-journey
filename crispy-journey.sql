-- AUTHOR: Griffin Wong
-- DATE: 08/08/2020
-- COURSE: CS 375-004
-- PROFESSOR: AUGENBLICK
-- PURPOSE: Database tables for Crispy-Journey


-- This table holds information for each player 
-- that is playing in the specific match

CREATE TABLE player (
    player_id SERIAL PRIMARY KEY,
    username VARCHAR(15),
    health INT(10),
    score INT(100),
    survival_time INT(255),
    kill_count INT(100),
    is_dead BOOLEAN,

    CONSTRAINT fk_class
      FOREIGN KEY(class_id) 
	      REFERENCES class(class_id),
    
    CONSTRAINT fk_attack
      FOREIGN KEY(attack_id) 
	      REFERENCES attack(attack_id),
    
    CONSTRAINT fk_armor
      FOREIGN KEY(armor_id) 
	      REFERENCES armor(armor_id),

    CONSTRAINT fk_match
      FOREIGN KEY(match_id) 
	      REFERENCES match(match_id),

    CONSTRAINT fk_available_target
      FOREIGN KEY(available_target_id) 
	      REFERENCES available_target(available_target_id)
);


-- This table hold information
-- for each attack that a specific
-- class can use agaisnt a target

CREATE TABLE attack (
    attack_id SERIAL PRIMARY KEY,
    attack_type VARCHAR(100),
    attack_name VARCHAR(100),
    attack_strength INT(100),
    attack_cooldown INT(100),
    attack_information VARCHAR(100),    
);


-- Class type of each player
-- This enables bonuses for each class

CREATE TABLE class (
    class_id SERIAL PRIMARY KEY,
    class_name VARCHAR(15),
    class_information VARCHAR(100),

    -- Constant value that is added onto the
    -- attack_strength, armor_strength, or health
    -- that provides an advantage to that class
    class_bonus INT(5)
);


-- Target(s) associated with each player

CREATE TABLE current_target (
    current_target_id SERIAL PRIMARY KEY,
    username VARCHAR(15),
    health INT(100),
    score INT(100),
    kill_count INT(100),

    CONSTRAINT fk_class
      FOREIGN KEY(class_id) 
	      REFERENCES class(class_id),

    CONSTRAINT fk_available_target
      FOREIGN KEY(available_target_id) 
	      REFERENCES available_target(available_target_id)
);

-- Join table, a target can be
-- associated with many different
-- players and a player can choose
-- from many different targets

CREATE TABLE available_target (
    available_target_id SERIAL PRIMARY KEY,
    
    CONSTRAINT fk_current_target
      FOREIGN KEY(current_target_id) 
	      REFERENCES current_target(current_target_id),

    CONSTRAINT fk_player
      FOREIGN KEY(player_id) 
	      REFERENCES player(player_id)
);

-- Holds the players that have made
-- it to the leaderboard for a specific
-- match based on score

CREATE TABLE leaderboard (
    leaderboard_id SERIAL PRIMARY KEY,
    
    CONSTRAINT fk_player
      FOREIGN KEY(player_id) 
	      REFERENCES player(player_id),

    CONSTRAINT fk_match
      FOREIGN KEY(match_id) 
	      REFERENCES match(match_id)
);


CREATE TABLE match (
    match_id SERIAL PRIMARY KEY,
    player_count INT(255),
    time_remaining INT(255),

    CONSTRAINT fk_leaderboard
      FOREIGN KEY(leaderboard_id) 
	      REFERENCES leaderboard(leaderboard_id)
);


CREATE TABLE armor (
    armor_id SERIAL PRIMARY KEY,
    armor_type VARCHAR(100),
    armor_name VARCHAR(100),
    armor_strength INT(100),
    armor_health INT(100),
    armor_information VARCHAR(100)
);