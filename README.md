# crispy-journey

COURSE: CS 375 Section 004
TEAM: Crispy Journey
AUTHORS: 
  Griffin Wong
  Jason Liu
  Ryan Kalbach
  Johnathan Eberly

==============================================
Setting Up the Application
==============================================

1. Download db_auth.cfg file (Separate file)
2. Change database password in db_auth.cfg to your own password
3. Place db_auth.cfg file into ~/crispy-journey/database
4. In terminal, run: bash create-database.sh (or run: ./create-database.sh)
5. In terminal, run: bash create-tables.sh (or run: ./create-tables.sh)
6. In terminal, run: bash Insert-Test-Data.sh (or run: ./Insert-Test-Data.sh)
7. In ~/crispy-journey/app, run: npm install node
8. In ~/crispy-journey/app, run: npm install express
9. In ~/crispy-journey/app, run: npm install pg
10. In ~/crispy-journey/app, run: npm install ws
11. In ~/crispy-journey/app, run: npm install body-parser
12. In ~/crispy-journey/app, run: npm install underscore
13. In ~/crispy-journey/app, run: git checkout John/Backend
14. In ~/crispy-journey/app, run: node server.js
15. (Optional) In terminal, run: bash drop-tables.sh


==============================================
Proposal
==============================================


Description: 
  Text-and-button battle royale game. Intended users are gamers. A player gets a list of other
  players to attack, and their attacks have cooldowns. Available targets are decided randomly,
  with bias for players who previously attacked you, and the list can be influenced by abilities.
  Other than that, all current players of the game are eligible to appear. The goal is to make it
  onto the leaderboard with your score, which factors in survival time and kill count.


Stack/Tools:
  HTML, JS, CSS, Express, Node, Fetch, PostgresQL, Websockets (multiplayer), GitHub


Timeline: 
  Weekly – 2-6 hours, or just whatever it takes
  Week 6 - Write out project proposal, research individual topics, mockups for UI and data flow, create ERD
  Week 7 – Implement basic PvE combat, Database; Weekly Status Report
  Week 8 – Matchmaking; Weekly Status Report
  Week 9 – Character creation; Weekly Status Report
  Week 10 – Final touches, Styling, Custom move creation (if there’s time); Weekly Status Report
  

Role: 
  Scribe – John
  Front-end – Jason
  Database – Griffin
  Back-end – Ryan and John


Communication/Team Obligations: 
  Meetings, sprint planning, pull requests
  During class breakout sessions (we’re also in a shared Discord server, so we’ll be incontact)
  Yes, as long as everyone is doing their part.
  Talk to them about it. If no progress, inform instructor.
  Talk on Discord to catch up with what they missed. Otherwise, same as above.
