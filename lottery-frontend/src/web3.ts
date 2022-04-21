import Web3 from "web3";

export const connectMetaMask = async () => {
  window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);
  return web3;
};
