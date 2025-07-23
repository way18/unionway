require('dotenv').config();
const inquirer = require('inquirer');
const { evmTransfer } = require('./evmTransfer');
const { cosmosTransfer } = require('./cosmosTransfer');

const evmPairs = [
  { name: 'Sepolia → Holesky', from: 'sepolia', to: 'holesky' },
  { name: 'Holesky → Sepolia', from: 'holesky', to: 'sepolia' }
];

const cosmosPairs = [
  { name: 'Holesky → Babylon', from: 'holesky', to: 'babylon' },
  { name: 'Babylon → Holesky', from: 'babylon', to: 'holesky' },
  { name: 'Holesky → Xion', from: 'holesky', to: 'xion' },
  { name: 'Sei → BSC', from: 'sei', to: 'bsc' }
];

async function main() {
  console.clear();
  console.log("🌉 UNIONWAY MULTICHAIN BOT\n");

  const allOptions = [...evmPairs, ...cosmosPairs, { name: 'Keluar', exit: true }];
  const { selected } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selected',
      message: 'Pilih jalur transfer:',
      choices: allOptions.map(opt => opt.name)
    }
  ]);

  const pair = allOptions.find(opt => opt.name === selected);
  if (!pair || pair.exit) {
    console.log("👋 Keluar.");
    return;
  }

  const isEvm = evmPairs.includes(pair);
  if (isEvm) {
    await evmTransfer(pair.from, pair.to);
  } else {
    await cosmosTransfer(pair.from, pair.to);
  }

  console.log("\n✅ Selesai!\n");
}

main();
