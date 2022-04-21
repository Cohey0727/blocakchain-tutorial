import path from 'path';
import fs from 'fs';
import solc from 'solc';
import { Lottery } from './types';

const lotteryPath = path.resolve(__dirname, '../contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');
var input = {
  language: 'Solidity',
  sources: { Lottery: { content: source } },
  settings: { outputSelection: { '*': { '*': ['*'] } } },
};
const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
export default compiled.contracts.Lottery.Lottery as Lottery;
