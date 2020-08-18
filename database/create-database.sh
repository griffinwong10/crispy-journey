#!/bin/bash

# Variable Definitions
database="crispy"
user="postgres"
password="r3bm3m3r5tn@hp3l3"

#Create Database

PGPASSWORD=$password psql -U $user postgres -c "CREATE DATABASE $database;"
