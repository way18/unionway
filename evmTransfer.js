require('dotenv').config();
const { ethers } = require('ethers');
const evmChains = require('./config/evmChains');

async function evmTransfer(from, to) {
  const senderConfig = evmChains[from];
  const recipientConfig = evmChains[to];

  if (!senderConfig || !recipientConfig) {
    console.error(`❌ Chain config tidak ditemukan untuk ${from} atau ${to}`);
    return;
  }

  const privateKey = process.env[from.toUpperCase() + '_PK'];
  if (!privateKey) {
    console.error(`❌ PRIVATE KEY untuk ${from} belum diset di .env`);
    return;
  }

  const provider = new ethers.JsonRpcProvider(senderConfig.rpc);
  const wallet = new ethers.Wallet(privateKey, provider);

  const amountInEth = process.env.EVM_AMOUNT || "0.001";

  console.log(`🚀 Mengirim ${amountInEth} ETH dari ${from} ke ${recipientConfig.address}...`);

  try {
    const tx = await wallet.sendTransaction({
      to: recipientConfig.address,
      value: ethers.parseEther(amountInEth)
    });

    console.log("⏳ Menunggu konfirmasi...");
    await tx.wait();
    console.log(`✅ Transfer berhasil! TX Hash: ${tx.hash}`);
  } catch (err) {
    console.error("❌ Gagal transfer:", err.message);
  }
}

module.exports = { evmTransfer };
