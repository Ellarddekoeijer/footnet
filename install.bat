@echo on
cd "frontend"
call npm install

cd "../backend"
call npm install

cd "../"
echo Installed successfully