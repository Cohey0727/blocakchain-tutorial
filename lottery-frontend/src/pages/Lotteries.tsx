import { useReactiveVar } from "@apollo/client";
import { css } from "@emotion/css";
import { Tooltip } from "antd";

import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import React, { useCallback, useMemo } from "react";
import Web3 from "web3";
import UpCircleOutlined from "@ant-design/icons/UpCircleOutlined";

import { Column, KeyValueList, Row } from "../components";
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

  const handleWinnerPickup = useCallback(async () => {
    await lottery.methods.pickWinner().send({ from: account });
  }, [account, web3]);

  if (!lotteryInfo) {
    return <></>;
  }
  const { manager, players, prevWinner, balance, network } = lotteryInfo;
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
      key: "PrevWinner",
      value: <Text copyable>{prevWinner}</Text>,
    },
    {
      key: "Balance",
      value: `${web3.utils.fromWei(balance, "ether")} ETH`,
    },
    {
      key: "Network",
      value: network,
    },
  ];

  return (
    <Column className={styles.root}>
      <Title>Lottery Contract Information</Title>
      <Column className={styles.contents}>
        <KeyValueList
          items={listItems}
          classes={{ root: styles.lotteryInfo }}
        />
        <Row className={styles.actions}>
          <Button
            type="primary"
            icon={<UpCircleOutlined />}
            onClick={handleEntryClick}
            className={styles.entryButton}
          >
            Lottery Entry
          </Button>
          <Tooltip
            placement="bottom"
            title="Only Manager"
            visible={manager === account ? false : undefined}
          >
            <Button
              disabled={manager !== account}
              className={styles.entryButton}
              onClick={handleWinnerPickup}
            >
              Lottery Finish
            </Button>
          </Tooltip>
        </Row>
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
    return <></>;
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
  actions: css`
    justify-content: flex-end;
  `,
  entryButton: css`
    margin-right: 8px;
  `,
};
