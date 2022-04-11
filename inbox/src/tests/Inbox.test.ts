// contract test code will go here
import assert from 'assert';
import Web3 from 'web3';
import compiled from '../compile';

const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());

const { evm, abi } = compiled;
const { bytecode } = evm;
const INITIAL_STRING = 'Hi there!';

// console.debug({ abi });

const data = {
  accounts: [] as any[],
  inbox: null as any,
};

beforeEach(async (...args) => {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(abi);
  const deployed = contract.deploy({ data: bytecode.object, arguments: [INITIAL_STRING] });
  const inbox = await deployed.send({ from: accounts[0], gas: 1000000 });
  data.accounts = accounts;
  data.inbox = inbox;
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(data.inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await data.inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
  it('can change the message', async () => {
    const newMessage = 'Hello there!';
    await data.inbox.methods.setMessage(newMessage).send({ from: data.accounts[0] });
    const message = await data.inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});
