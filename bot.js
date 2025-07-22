require('dotenv').config();
const { transferETH } = require('./transfer');
const inquirer = require('inquirer');

async function main() {
  console.clear();
  console.log("🌉 UNION Autobot CLI (Safe Version)");
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Pilih aksi:',
      choices: ['Transfer Sepolia → Holesky (ETH)', 'Keluar'],
    }
  ]);

  if (answer.action.includes('Transfer')) {
    await transferETH();
  } else {
    console.log("👋 Keluar.");
    process.exit(0);
  }
}

main();
