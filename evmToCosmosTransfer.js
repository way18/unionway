require('dotenv').config();
const { ethers } = require('ethers');
const evmChains = require('./config/evmChains');
const cosmosChains = require('./config/cosmosChains');

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

  const bridgeAddress = recipient.bridgeContract;
  if (!bridgeAddress || !ethers.isAddress(bridgeAddress)) {
    console.error(`❌ Alamat bridge contract untuk ${to} tidak valid`);
    return;
  }

  const provider = new ethers.JsonRpcProvider(sender.rpc);
  const wallet = new ethers.Wallet(privateKey, provider);

  const value = ethers.parseUnits(process.env.EVM_AMOUNT || '0.000001', 'ether');

  const memo = recipient.address || "bby1dummyaddresshere";

  const tx = {
    to: bridgeAddress,
    value,
    data: ethers.hexlify(ethers.toUtf8Bytes(memo))
  };

  try {
    console.log(`🚀 Mengirim ${value} ETH dari ${wallet.address} ke bridge ${bridgeAddress} dengan memo: ${memo}`);
    const response = await wallet.sendTransaction(tx);
    console.log(`✅ Transfer berhasil! TX Hash: ${response.hash}`);
  } catch (err) {
    console.error("❌ Gagal transfer EVM ke Cosmos:", err.message);
  }
}

module.exports = { evmToCosmosTransfer };
