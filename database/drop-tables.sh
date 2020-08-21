#!/bin/bash
  
# AUTHOR: Griffin Wong
# DATE: MON AUG 17 14:15:38 PST
# COURSE: CS 375-004
# TEAM: Crispy Journey
# PURPOSE: A simple script to delete
# all data tables for our program

# Variable Definitions
DATABASE="crispy"
USER="postgres"
PASSWORD="r3bm3m3r5tn@hp3l3"

echo "Dropping Class Table"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "DROP TABLE class cascade;"

echo "Dropping Player Table"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "DROP TABLE player cascade;"

echo "Dropping Attack-Player-Join Table"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "DROP TABLE attack_player_join cascade;"

echo "Dropping Attack Table"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "DROP TABLE attack cascade;"

echo "Dropping Leaderboard Table"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "DROP TABLE leaderboard cascade;"

echo "Dropping Match Table"
PGPASSWORD=$PASSWORD psql -U $USER -d $DATABASE -c "DROP TABLE match cascade;"
