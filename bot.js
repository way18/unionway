require('dotenv').config();
const inquirer = require('inquirer');
const { evmTransfer } = require('./evmTransfer');
const { cosmosTransfer } = require('./cosmosTransfer');
const { evmToCosmosTransfer } = require('./evmToCosmosTransfer');
const { cosmosToEvmTransfer } = require('./cosmosToEvmTransfer');

// 🔀 Semua pairing digabung jadi satu list
const allPairs = [
  // Prioritas tampil di atas
  { name: '🔥 Holesky → Babylon', handler: () => evmToCosmosTransfer('holesky', 'babylon') },

  // EVM ↔ EVM
  { name: 'Sepolia → Holesky', handler: () => evmTransfer('sepolia', 'holesky') },
  { name: 'Holesky → Sepolia', handler: () => evmTransfer('holesky', 'sepolia') },

  // Cosmos ↔ Cosmos
  { name: 'Babylon → Holesky', handler: () => cosmosTransfer('babylon', 'holesky') },
  { name: 'Sei → BSC', handler: () => cosmosTransfer('sei', 'bsc') },
  { name: 'Xion → Sei', handler: () => cosmosTransfer('xion', 'sei') },

  // EVM → Cosmos
  { name: 'Sepolia → Xion', handler: () => evmToCosmosTransfer('sepolia', 'xion') },
  { name: 'Sepolia → Sei', handler: () => evmToCosmosTransfer('sepolia', 'sei') },

  // Cosmos → EVM
  { name: 'Babylon → Sepolia', handler: () => cosmosToEvmTransfer('babylon', 'sepolia') },
  { name: 'Sei → Holesky', handler: () => cosmosToEvmTransfer('sei', 'holesky') },
  { name: 'Xion → Sepolia', handler: () => cosmosToEvmTransfer('xion', 'sepolia') }
];

async function main() {
  console.clear();
  console.log("🌉 UNIONWAY MULTICHAIN BOT\n");

  const { selected } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selected',
      message: 'Pilih jalur transfer:',
      choices: [
        ...allPairs.map(p => ({ name: p.name, value: p.handler })),
        { name: '❌ Keluar', value: null }
      ]
    }
  ]);

  if (!selected) {
    console.log("👋 Keluar.");
    return;
  }

  await selected();
  console.log("\n✅ Selesai!\n");
}

main();
