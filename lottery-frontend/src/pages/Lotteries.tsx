import { useReactiveVar } from "@apollo/client";
import { css } from "@emotion/css";

import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import React, { useCallback, useMemo } from "react";
import Web3 from "web3";
import { Column, KeyValueList } from "../components";
import LoadingBackdrop from "../components/LoadingBackdrop";
import { useAsyncMemo } from "../hooks";
import { getLottery, useLotteryInfo } from "../lottery";
import { accountVar, web3Var } from "../web3";

const { Title, Paragraph, Text, Link } = Typography;

type LotteriesInnerProps = {
  web3: Web3;
  lottery: ReturnType<typeof getLottery>;
  account: string;
};
type LotteriesProps = {};

const Lotteries: React.FC<LotteriesInnerProps> = (props) => {
  const { lottery, web3, account } = props;
  const lotteryInfo = useLotteryInfo(web3, lottery);
  const handleEntryClick = useCallback(async () => {
    await lottery.methods.enter().send({
      from: account,
      value: web3.utils.toWei("0.01", "ether"),
    });
  }, [account, web3]);

  if (!lotteryInfo) {
    return <LoadingBackdrop />;
  }
  const { manager, players, winner, balance, finished } = lotteryInfo;
  const listItems = [
    {
      key: "Manager",
      value: <Text copyable>{manager}</Text>,
    },
    {
      key: "Number of Players",
      value: players.length,
    },
    {
      key: "Players",
      value: players.join(", "),
    },
    {
      key: "Winner",
      value: <Text copyable>{winner}</Text>,
    },
    {
      key: "Balance",
      value: `${web3.utils.fromWei(balance, "ether")} ETH`,
    },
    {
      key: "Finished?",
      value: `${finished}`,
    },
  ];

  console.log(lotteryInfo);

  return (
    <Column className={styles.root}>
      <Title>Lottery Contract Information</Title>
      <Column className={styles.contents}>
        <KeyValueList
          items={listItems}
          classes={{ root: styles.lotteryInfo }}
        />
        <Button disabled={finished} onClick={handleEntryClick}>
          Lottery Entry
        </Button>
      </Column>
    </Column>
  );
};

export default (props: LotteriesProps) => {
  const web3 = useReactiveVar(web3Var);
  const account = useReactiveVar(accountVar);
  const lottery = useMemo(() => {
    if (!web3) return null;
    return getLottery(web3);
  }, [web3]);
  if (!web3 || !lottery || !account) {
    return <LoadingBackdrop />;
  }
  return (
    <Lotteries {...props} web3={web3} lottery={lottery} account={account} />
  );
};

const styles = {
  root: css`
    padding: 16px;
  `,
  contents: css`
    width: 48%;
    min-width: 320px;
  `,
  lotteryInfo: css`
    margin-bottom: 16px;
  `,
};
