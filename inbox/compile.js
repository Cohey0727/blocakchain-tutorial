const path = require('path');
const fs = require('fs');
const solc = require('solc');

const compile = () => {
  const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
  const source = fs.readFileSync(inboxPath, 'utf8');
  var input = {
    language: 'Solidity',
    sources: { Inbox: { content: source } },
    settings: { outputSelection: { '*': { '*': ['*'] } } },
  };
  const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
  return compiled.contracts;
};

module.exports = compile;
