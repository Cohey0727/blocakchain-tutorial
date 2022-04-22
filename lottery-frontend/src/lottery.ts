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
      const winnerPromise = lottery.methods.winner().call();
      const balancePromise = web3.eth.getBalance(lottery.options.address);
      const finishedPromise = lottery.methods.finished().call();
      const [manager, players, winner, balance, finished] = await Promise.all([
        managerPromise,
        playersPromise,
        winnerPromise,
        balancePromise,
        finishedPromise,
      ]);
      return { manager, players, winner, balance, finished };
    },
    null,
    [lottery]
  );
};
