const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'SimpleToken.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'SimpleToken.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

function findImports(importPath) {
  try {
    const fullPath = path.resolve(__dirname, 'node_modules', importPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    return { contents: content };
  } catch (error) {
    return { error: 'File not found' };
  }
}

const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

if (output.errors) {
  output.errors.forEach(err => {
    console.error(err.formattedMessage);
  });
}

console.log(JSON.parse(solc.compile(JSON.stringify(input), { import: findImports })).contracts[
  'SimpleToken.sol'
].SimpleToken.evm.bytecode.object);
module.exports = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports })).contracts[
  'SimpleToken.sol'
].SimpleToken.evm.bytecode.object;