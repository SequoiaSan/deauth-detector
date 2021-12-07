export wlanDeviceToUse="wlan0"

export monitorDevice="${wlanDeviceToUse}mon"
# Listning port
export listenPort=80
# Your AP mac address
export defaultRouterMacAdress=""

airmon-ng start $wlanDeviceToUse &

# Start the scapy application
cd deauth-monitor-scapy
pip3 install -r requirements.txt
python3 deauth.py &
cd ..

# Start the Flask API
cd deauth-monitor-api
pip3 install -r requirements.txt
python3 app.py mock_data &
cd ..

# Start the React application
cd deauth-monitor-web/deauth-web-ui
npm install
npm run build 
cd ..
npm install
node index.js &
