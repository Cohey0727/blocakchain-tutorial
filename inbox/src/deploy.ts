import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import Inbox from './compile';

const { evm, abi } = Inbox;
const { bytecode } = evm;

const mnemonicPhases = process.env.MNEMONIC_PHASES!;
const networkUrk = process.env.NETWORK_URK!;

const walletProvider = new HDWalletProvider(mnemonicPhases, networkUrk);

const web3 = new Web3(walletProvider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode.object, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: 1000000 });
  console.log('Contract deploy to ', result.options.address);
};
deploy();
