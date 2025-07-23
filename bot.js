require('dotenv').config();
const inquirer = require('inquirer');
const { evmTransfer } = require('./evmTransfer');
const { cosmosTransfer } = require('./cosmosTransfer');
const { evmToCosmosTransfer } = require('./evmToCosmosTransfer');
const { cosmosToEvmTransfer } = require('./cosmosToEvmTransfer');

// 🟩 EVM → EVM
const evmPairs = [
  { name: 'Sepolia → Holesky', from: 'sepolia', to: 'holesky' },
  { name: 'Holesky → Sepolia', from: 'holesky', to: 'sepolia' }
];

// 🟦 Cosmos → Cosmos
const cosmosPairs = [
  { name: 'Babylon → Holesky', from: 'babylon', to: 'holesky' },
  { name: 'Sei → BSC', from: 'sei', to: 'bsc' },
  { name: 'Xion → Sei', from: 'xion', to: 'sei' }
];

// 🟨 EVM → Cosmos
const evmToCosmosPairs = [
  { name: 'Holesky → Babylon', from: 'holesky', to: 'babylon' },
  { name: 'Sepolia → Xion', from: 'sepolia', to: 'xion' },
  { name: 'Sepolia → Sei', from: 'sepolia', to: 'sei' }
];

// 🟥 Cosmos → EVM
const cosmosToEvmPairs = [
  { name: 'Babylon → Sepolia', from: 'babylon', to: 'sepolia' },
  { name: 'Sei → Holesky', from: 'sei', to: 'holesky' },
  { name: 'Xion → Sepolia', from: 'xion', to: 'sepolia' }
];

async function main() {
  console.clear();
  console.log("🌉 UNIONWAY MULTICHAIN BOT\n");

  const allChoices = [
    { type: 'separator', line: '=== EVM ke EVM ===' },
    ...evmPairs.map(p => ({ name: p.name, value: () => evmTransfer(p.from, p.to) })),

    { type: 'separator', line: '=== Cosmos ke Cosmos ===' },
    ...cosmosPairs.map(p => ({ name: p.name, value: () => cosmosTransfer(p.from, p.to) })),

    { type: 'separator', line: '=== EVM ke Cosmos ===' },
    ...evmToCosmosPairs.map(p => ({ name: p.name, value: () => evmToCosmosTransfer(p.from, p.to) })),

    { type: 'separator', line: '=== Cosmos ke EVM ===' },
    ...cosmosToEvmPairs.map(p => ({ name: p.name, value: () => cosmosToEvmTransfer(p.from, p.to) })),

    { type: 'separator' },
    { name: '❌ Keluar', value: null }
  ];

  const { selected } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selected',
      message: 'Pilih jalur transfer:',
      choices: allChoices
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
