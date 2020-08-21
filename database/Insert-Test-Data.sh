#!/bin/bash
  
# AUTHOR: Griffin Wong
# DATE: TUES AUG 18 08:00:38 PST
# COURSE: CS 375-004
# TEAM: Crispy Journey
# PURPOSE: A simple script to insert
# test data into tables for our program

# Variable Definitions
DATABASE="crispy"
USER="postgres"
PASSWORD="r3bm3m3r5tn@hp3l3"

#Player Table Inserts

echo "Creating Player One"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO player VALUES (DEFAULT, 'player0ne', 100, 0, 100, 0, 0, false, 1);"

echo "Creating Player Two"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO player VALUES (DEFAULT, 'player_two', 100, 0, 100, 0, 0, false, 1);"

echo "Creating Player Three"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO player VALUES (DEFAULT, 'phillyPhil', 100, 0, 100, 0, 0, false, 1);"

echo "Creating Player Four"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO player VALUES (DEFAULT, 'sunnySam', 100, 0, 100, 0, 0, false, 2);"

echo "Creating Player Five"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO player VALUES (DEFAULT, 'wellThankYou2', 100, 0, 100, 0, 0, false, 2);"

echo "Creating Player Six"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO player VALUES (DEFAULT, 'aUSERname', 100, 0, 100, 0, 0, false, 2);"



#Attack Table Inserts

echo "Creating Slash Attack"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO attack VALUES (DEFAULT, 'Basic', 'Slash', 5, 1, 'Lorem ipsum dolor sit amet consectetur');"

echo "Creating Spike Attack"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO attack VALUES (DEFAULT, 'Basic', 'Spike', 7, 2, 'Lorem ipsum dolor sit amet consectetur');"

echo "Creating Smash Attack"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO attack VALUES (DEFAULT, 'Basic', 'Smash', 8, 2.5, 'Lorem ipsum dolor sit amet consectetur');"

echo "Creating Uppercut Attack"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO attack VALUES (DEFAULT, 'Special', 'Uppercut', 12, 5, 'Lorem ipsum dolor sit amet consectetur');"

echo "Creating Powerslam Attack"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO attack VALUES (DEFAULT, 'Special', 'Powerslam', 13, 8, 'Lorem ipsum dolor sit amet consectetur');"




# Class Table Inserts

echo "Creating Barbarian Class"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO class VALUES
    (DEFAULT, 'Barbarian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');"

echo "Creating Fighter Class"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO class VALUES
    (DEFAULT, 'Fighter', 'Lorem ipsum dolor sit amet consectetur adipiscing elit 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');"

echo "Creating Monk Class"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO class VALUES
    (DEFAULT, 'Monk', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');"

echo "Creating Paladin Class"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO class VALUES
    (DEFAULT, 'Paladin', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');"

echo "Creating Ranger Class"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO class VALUES
    (DEFAULT, 'Ranger', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');"

echo "Creating Rogue Class"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO class VALUES
    (DEFAULT, 'Rogue', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');"

echo "Creating Wizard Class"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "INSERT INTO class VALUES
    (DEFAULT, 'Wizard', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');"