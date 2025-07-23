require('dotenv').config();
const { DirectSecp256k1Wallet } = require('@cosmjs/proto-signing');
const { SigningStargateClient } = require('@cosmjs/stargate');
const cosmosChains = require('./config/cosmosChains');

async function cosmosTransfer(from, to) {
  const sender = cosmosChains[from];
  const recipient = cosmosChains[to];

  if (!sender || !recipient) {
    console.error(`❌ Chain config tidak ditemukan untuk ${from} atau ${to}`);
    return;
  }

  const envKey = (from || '').trim().toUpperCase() + '_MNEMONIC';
  const mnemonic = process.env[envKey];

  // DEBUGGING
  console.log('====================');
  console.log('FROM:', from);
  console.log('TO:', to);
  console.log('ENV KEY:', envKey);
  console.log('MNEMONIC DETECTED:', mnemonic ? '[✅]' : '[❌]');
  console.log('====================');

  if (!mnemonic) {
    console.error(`❌ Mnemonic untuk ${from} belum diset di .env (dicoba baca dari ${envKey})`);
    return;
  }

  const amount = {
    denom: sender.denom,
    amount: process.env.COSMOS_AMOUNT || "100000"
  };

  const fee = {
    amount: [{ denom: sender.denom, amount: "5000" }],
    gas: "80000",
  };

  try {
    const wallet = await DirectSecp256k1Wallet.fromMnemonic(mnemonic, { prefix: sender.prefix });
    const [account] = await wallet.getAccounts();

    const client = await SigningStargateClient.connectWithSigner(sender.rpc, wallet);
    console.log(`🚀 Mengirim ${amount.amount} ${sender.denom} dari ${account.address} ke ${recipient.address}...`);

    const result = await client.sendTokens(account.address, recipient.address, [amount], fee, "UnionWay transfer");
    console.log(`✅ Transfer berhasil! TX Hash: ${result.transactionHash}`);
  } catch (err) {
    console.error("❌ Gagal transfer Cosmos:", err.message);
  }
}

module.exports = { cosmosTransfer };
