#!/bin/bash

# AUTHOR: Griffin Wong
# DATE: MON AUG 17 1:54:24 PST
# COURSE: CS 375-004
# TEAM: Crispy Journey
# PURPOSE: A simple script to create
# the database for our program

# Variable Definitions
DATABASE="crispy"
USER="postgres"

# Import Password
source ./db_auth.cfg
PASSWORD=$(eval echo ${PASSWORD})

#Create Database
PGPASSWORD=$PASSWORD psql -U $USER postgres -c "CREATE DATABASE $DATABASE;"
