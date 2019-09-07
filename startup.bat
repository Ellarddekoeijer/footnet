@echo off
cd "frontend"
start cmd /k npm start

cd "../backend"
start cmd /k nodemon index

exit