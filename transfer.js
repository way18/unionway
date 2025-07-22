require('dotenv').config();
const { ethers } = require('ethers');

async function transferETH() {
  const privateKey = process.env.PRIVATE_KEY;
  const rpcUrl = process.env.RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const recipient = process.env.RECIPIENT_ADDRESS;
  const amountInEth = process.env.AMOUNT || "0.001"; // Default 0.001 ETH

  try {
    console.log(`🚀 Mengirim ${amountInEth} ETH ke ${recipient}...`);
    const tx = await wallet.sendTransaction({
      to: recipient,
      value: ethers.parseEther(amountInEth)
    });

    console.log("⏳ Menunggu konfirmasi...");
    await tx.wait();

    console.log("✅ Transaksi sukses!");
    console.log(`Hash: ${tx.hash}`);
  } catch (error) {
    console.error("❌ Error transfer:", error.message);
  }
}

module.exports = { transferETH };
