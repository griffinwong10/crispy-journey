#!/bin/bash

# AUTHOR: Griffin Wong
# DATE: MON AUG 17 1:54:24 PST
# COURSE: CS 375-004
# TEAM: Crispy Journey
# PURPOSE: A simple script to create
# all data tables for our program


# Variable Definitions
database="crispy"
user="postgres"
password="r3bm3m3r5tn@hp3l3"


echo "Creating Class Table"
PGPASSWORD=$password psql -U $user -d $database -c "CREATE TABLE class (class_id serial primary key, class_name character varying, class_information character varying,class_bonus integer);"

echo "Creating Player Table"
# The following commands create the tables
PGPASSWORD=$password psql -U $user -d $database -c "CREATE TABLE player (player_id serial primary key, username character varying, health integer, score integer, armor integer, survival_time integer, kill_count integer, is_dead boolean, room_id integer);"

echo "Creating Attack Table"
PGPASSWORD=$password psql -U $user -d $database -c "CREATE TABLE attack (attack_id serial primary key, attack_type character varying, attack_name character varying, attack_strength integer, attack_cooldown integer, attack_information character varying);"

echo "Creating Leaderboard Table"
PGPASSWORD=$password psql -U $user -d $database -c "CREATE TABLE leaderboard (leaderboard_id serial primary key);"

echo "Creating Match Table"
PGPASSWORD=$password psql -U $user -d $database -c "CREATE TABLE match (match_id serial primary key, player_count integer, time_remaining integer);"

echo "Creating Attack Player Join Table"
PGPASSWORD=$password psql -U $user -d $database -c "CREATE TABLE attack_player_join (attack_player_id serial primary key);"

echo "Adding Player Foreign Key to Attack-Player-Join Table"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE attack_player_join ADD COLUMN player_id integer;"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE attack_player_join ADD CONSTRAINT fk_player FOREIGN KEY (player_id) REFERENCES player (player_id);"

echo "Adding Attack Foreign Key to Attack-Player-Join Table"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE attack_player_join ADD COLUMN attack_id integer;"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE attack_player_join ADD CONSTRAINT fk_attack FOREIGN KEY (attack_id) REFERENCES attack (attack_id);"

echo "Adding Foreign Key to Match Table"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE match ADD COLUMN leaderboard_id integer;"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE match ADD CONSTRAINT fk_leaderboard FOREIGN KEY (leaderboard_id) REFERENCES leaderboard(leaderboard_id);"

echo "Adding Foriegn Key to Leaderboard Table"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE leaderboard ADD COLUMN player_id integer;"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE leaderboard ADD CONSTRAINT fk_player FOREIGN KEY (player_id) REFERENCES player(player_id);"

echo "Adding Another Foreign Key to Leaderboard Table"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE leaderboard ADD COLUMN match_id integer;"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE leaderboard ADD CONSTRAINT fk_match FOREIGN KEY (match_id) REFERENCES match(match_id);"

echo "Adding Foreign Key to Player Table"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE player ADD COLUMN class_id integer;"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE player ADD CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES class(class_id);"

echo "Adding Another Foreign Key to Player Table"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE player ADD COLUMN attack_player_id integer;"
PGPASSWORD=$password psql -U $user -d $database -c "ALTER TABLE player ADD CONSTRAINT fk_attack_player FOREIGN KEY (attack_player_id) REFERENCES attack_player_join (attack_player_id);"
