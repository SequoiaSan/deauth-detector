sudo apt update &
sudo apt install python3.8 nodejs npm mongodb aircrack-ng -y &
python3.8 -m easy_install pip

pip install flask flask_cors &

./deploy.sh
