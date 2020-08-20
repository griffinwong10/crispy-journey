#!/bin/bash
  
# AUTHOR: Griffin Wong
# DATE: TUES AUG 18 08:00:38 PST
# COURSE: CS 375-004
# TEAM: Crispy Journey
# PURPOSE: A simple script to insert
# test data into tables for our program

# Variable Definitions
database="crispy"
user="postgres"
password="r3bm3m3r5tn@hp3l3"

#Player Table Inserts

echo "Creating Player One"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO player VALUES ("player0ne", 100, 0, 100, 0, 0, false, 1);"

echo "Creating Player Two"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO player VALUES ("player_two", 100, 0, 100, 0, 0, false, 1);"

echo "Creating Player Three"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO player VALUES ("phillyPhil", 100, 0, 100, 0, 0, false, 1);"

echo "Creating Player Four"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO player VALUES ("sunnySam", 100, 0, 100, 0, 0, false, 2);"

echo "Creating Player Five"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO player VALUES ("wellThankYou2", 100, 0, 100, 0, 0, false, 2);"

echo "Creating Player Six"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO player VALUES ("aUsername", 100, 0, 100, 0, 0, false, 2);"



#Attack Table Inserts

echo "Creating Slash Attack"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO attack VALUES ("Basic", "Slash", 5, 1, 'Lorem ipsum dolor sit amet consectetur');"

echo "Creating Spike Attack"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO attack VALUES ("Basic", "Spike", 7, 2, 'Lorem ipsum dolor sit amet consectetur');"

echo "Creating Smash Attack"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO attack VALUES ("Basic", "Smash", 8, 2.5, 'Lorem ipsum dolor sit amet consectetur');"

echo "Creating Uppercut Attack"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO attack VALUES ("Special", "Uppercut", 12, 5, 'Lorem ipsum dolor sit amet consectetur');"

echo "Creating Powerslam Attack"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO attack VALUES ("Special", "Powerslam", 13, 8, 'Lorem ipsum dolor sit amet consectetur');"




# Class Table Inserts

echo "Creating Barbarian Class"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO class VALUES
    ('Barbarian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    5);"

echo "Creating Fighter Class"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO class VALUES
    ('Fighter', 'Lorem ipsum dolor sit amet consectetur adipiscing elit 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    5);"

echo "Creating Monk Class"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO class VALUES
    ('Monk', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    5);"

echo "Creating Paladin Class"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO class VALUES
    ('Paladin', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    5);"

echo "Creating Ranger Class"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO class VALUES
    ('Ranger', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    5);"

echo "Creating Rogue Class"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO class VALUES
    ('Rogue', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    5);"

echo "Creating Wizard Class"
PGPASSWORD=$password psql -U $user -d $database -c "INSERT INTO class VALUES
    ('Wizard', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    5);"