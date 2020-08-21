#!/bin/bash

# Variable Definitions
DATABASE="crispy"
USER="postgres"
PASSWORD="r3bm3m3r5tn@hp3l3"

#Create Database

PGPASSWORD=$PASSWORD psql -U $USER postgres -c "CREATE DATABASE $DATABASE;"
