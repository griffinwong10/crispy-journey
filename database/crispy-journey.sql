-- AUTHOR: Griffin Wong
-- DATE: 08/11/2020
-- COURSE: CS 375-004
-- PROFESSOR: AUGENBLICK
-- PURPOSE: Database tables for Crispy-Journey

-- To create this database:

-- psql --username postgres
-- CREATE DATABASE crispy;
-- \c crispy



-- To delete tables:

-- DROP TABLE class cascade;
-- DROP TABLE player cascade;
-- DROP TABLE attack_player_join cascade;
-- DROP TABLE attack cascade;
-- DROP TABLE leaderboard cascade;
-- DROP TABLE match cascade;


-- This table holds information for each player 
-- that is playing in the specific match

CREATE TABLE player (
    player_id SERIAL PRIMARY KEY,
    username VARCHAR(15),
    health INT(10),
    score INT(100),
    armor INT(100),
    survival_time INT(255),
    kill_count INT(100),
    is_dead BOOLEAN,
    room_id INT(1),
    class_id integer,
    attack_player_id integer,
    match_id integer,

    CONSTRAINT fk_class
      FOREIGN KEY(class_id) 
	      REFERENCES class(class_id),
    
    CONSTRAINT fk_attack_player
      FOREIGN KEY(attack_player_id) 
	      REFERENCES attack_player_join(attack_player_id),
    
    CONSTRAINT fk_match
      FOREIGN KEY(match_id) 
	      REFERENCES match(match_id)
);


CREATE TABLE attack_player_join (
    attack_player_id SERIAL PRIMARY KEY,
    player_id integer,
    attack_id integer,
   
    CONSTRAINT fk_player
      FOREIGN KEY(player_id) 
	      REFERENCES player(player_id),
    
    CONSTRAINT fk_attack
      FOREIGN KEY(attack_id) 
	      REFERENCES attack(attack_id)
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
    attack_player_id integer,

    CONSTRAINT fk_player_attack
      FOREIGN KEY(attack_player_id)
	      REFERENCES attack_player_join(attack_player_id)
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

-- Holds the players that have made
-- it to the leaderboard for a specific
-- match based on score

CREATE TABLE leaderboard (
    leaderboard_id SERIAL PRIMARY KEY,
    player_id integer,
    match_id integer
    
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
    leaderboard_id integer,

    CONSTRAINT fk_leaderboard
      FOREIGN KEY(leaderboard_id) 
	      REFERENCES leaderboard(leaderboard_id)
);