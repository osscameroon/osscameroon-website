echo "[+] - - - - - - - - - - -"
echo "[+] Setting the virtualenv..."
virtualenv -p python3 venv

echo "[+] Activating the virtualenv..."
source venv/bin/activate

echo "[+] Installing requirements..."
pip install -r requirements.txt
echo "[+] - - - - - - - - - - - - - -"
