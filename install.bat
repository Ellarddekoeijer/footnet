@echo on
cd "frontend"
call npm install

cd "../backend"
call npm install

echo ["Installed successfully"]
exit