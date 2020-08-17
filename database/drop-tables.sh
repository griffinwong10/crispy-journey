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

echo "Dropping Class Table"
PGPASSWORD=$password psql -U $user -d $database -c "DROP TABLE class cascade;"

echo "Dropping Player Table"
PGPASSWORD=$password psql -U $user -d $database -c "DROP TABLE player cascade;"

echo "Dropping Attack-Player-Join Table"
PGPASSWORD=$password psql -U $user -d $database -c "DROP TABLE attack_player_join cascade;"

echo "Dropping Attack Table"
PGPASSWORD=$password psql -U $user -d $database -c "DROP TABLE attack cascade;"

echo "Dropping Leaderboard Table"
PGPASSWORD=$password psql -U $user -d $database -c "DROP TABLE leaderboard cascade;"

echo "Dropping Match Table"
PGPASSWORD=$password psql -U $user -d $database -c "DROP TABLE match cascade;"
