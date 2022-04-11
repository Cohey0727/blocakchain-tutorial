import path from 'path';
import fs from 'fs';
import solc from 'solc';
import { Inbox } from './types';

const inboxPath = path.resolve(__dirname, '../contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
var input = {
  language: 'Solidity',
  sources: { Inbox: { content: source } },
  settings: { outputSelection: { '*': { '*': ['*'] } } },
};
const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
export default compiled.contracts.Inbox.Inbox as Inbox;
