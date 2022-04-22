import { css } from "@emotion/css";
import Button from "antd/lib/button";
import React, { useCallback, useState } from "react";
import { Column } from "../components";
import { screenLoadingVar } from "../Layout";
import { connectMetaMask } from "../web3";

const MyPage: React.FC = () => {
  const handleClick = useCallback(async () => {
    screenLoadingVar(true);
    try {
      const web3 = await connectMetaMask();
    } finally {
      screenLoadingVar(false);
    }
  }, []);
  return (
    <Column className={styles.root}>
      <Button onClick={handleClick}>Connect Wallet</Button>
    </Column>
  );
};

const styles = {
  root: css`
    padding: 16px;
  `,
};

export default MyPage;
