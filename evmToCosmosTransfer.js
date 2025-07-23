require('dotenv').config();
const { ethers } = require("ethers");
const cosmosChains = require('./config/cosmosChains');
const evmChains = require('./config/evmChains');

async function evmToCosmosTransfer(from, to) {
  const sender = evmChains[from];
  const recipient = cosmosChains[to];

  if (!sender || !recipient) {
    console.error(`❌ Konfigurasi chain tidak ditemukan untuk ${from} atau ${to}`);
    return;
  }

  const privateKey = process.env[from.toUpperCase() + '_PK'];
  if (!privateKey) {
    console.error(`❌ Private key untuk ${from} belum diset di .env`);
    return;
  }

  const amount = process.env.EVM_AMOUNT || "0.0001";

  try {
    const provider = new ethers.JsonRpcProvider(sender.rpc);
    const wallet = new ethers.Wallet(privateKey, provider);

    console.log(`🚀 Mengirim ${amount} ETH dari ${wallet.address} ke ${recipient.address}...`);

    const tx = await wallet.sendTransaction({
      to: recipient.address,
      value: ethers.parseEther(amount)
    });

    console.log(`⏳ TX Terkirim: ${tx.hash}`);
    await tx.wait();
    console.log(`✅ Transfer berhasil! TX Hash: ${tx.hash}`);
  } catch (err) {
    console.error("❌ Gagal transfer EVM ke Cosmos:", err.message);
  }
}

module.exports = { evmToCosmosTransfer };
