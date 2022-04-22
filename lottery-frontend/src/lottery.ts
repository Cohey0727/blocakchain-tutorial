import Web3 from "web3";
import { useAsyncMemo } from "./hooks";

export const getLottery = (web3: Web3) => {
  const abi = JSON.parse(process.env.REACT_APP_LOTTERY_ABI!);
  const lotteryAddress = process.env.REACT_APP_LOTTERY_ADDRESS!;
  const lottery = new web3.eth.Contract(abi, lotteryAddress);
  return lottery;
};

export const useLotteryInfo = (
  web3: Web3,
  lottery: ReturnType<typeof getLottery>
) => {
  return useAsyncMemo(
    async () => {
      const managerPromise = lottery.methods.manager().call();
      const playersPromise = lottery.methods.getPlayers().call();
      const prevWinnerPromise = lottery.methods.prevWinner().call();
      const balancePromise = web3.eth.getBalance(lottery.options.address);
      const networkTypePromise = web3.eth.net.getNetworkType();
      const [manager, players, prevWinner, balance, network] =
        await Promise.all([
          managerPromise,
          playersPromise,
          prevWinnerPromise,
          balancePromise,
          networkTypePromise,
        ]);
      return { manager, players, prevWinner, balance, network };
    },
    null,
    [lottery]
  );
};
