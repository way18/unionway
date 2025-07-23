# 🔐 UnionWay Multichain Safe Autobot

Bot aman dan bersih untuk bridge/test transfer antar chain testnet:

## 🌐 Chain yang Didukung
- Sepolia ↔ Holesky (EVM)
- Holesky ↔ Babylon (EVM → Cosmos)
- Holesky → Xion
- Babylon → Holesky
- Sei → BSC

## 🧪 Direkomendasikan untuk testnet

## 📦 Setup Termux

```bash
pkg update && pkg upgrade -y
pkg install git nodejs -y
git clone https://github.com/way18/unionway.git
cd unionway
npm install
cp .env.example .env
nano .env
