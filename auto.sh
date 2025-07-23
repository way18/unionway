#!/data/data/com.termux/files/usr/bin/bash

echo "🚀 Auto Setup UnionWay Multichain Bot"

pkg update && pkg upgrade -y
pkg install git nodejs -y

git clone https://github.com/way18/unionway.git
cd unionway

npm install

echo "✅ Setup selesai. Sekarang isi file .env kamu:"
echo "    cp .env.example .env"
echo "    nano .env"
echo "Lalu jalankan dengan:"
echo "    node bot.js"
