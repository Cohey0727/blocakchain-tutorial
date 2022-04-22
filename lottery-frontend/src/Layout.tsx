import { Layout, Menu, MenuProps } from "antd";
import { makeVar, useReactiveVar } from "@apollo/client";
import { Outlet, Link } from "@tanstack/react-location";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import React, { Suspense, useState } from "react";
import LoadingBackdrop from "./components/LoadingBackdrop";
import { css } from "@emotion/css";
const { Header, Content, Footer, Sider } = Layout;

export const screenLoadingVar = makeVar(false);

type MenuItemType = Required<MenuProps>["items"][number];

function MenuItem(
  label: React.ReactNode,
  path: string,
  icon?: React.ReactNode
) {
  return {
    key: path,
    icon,
    label: <Link to={path}>{label}</Link>,
  } as MenuItemType;
}

const items: MenuItemType[] = [
  MenuItem("My Page", "/mypage", <PieChartOutlined />),
  MenuItem("Lottery", "/lotteries", <DesktopOutlined />),
];

function SiderDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const loading = useReactiveVar(screenLoadingVar);

  return (
    <LoadingBackdrop loading={loading}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content className={styles.content}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>Ether Lottery ©2022</Footer>
        </Layout>
      </Layout>
    </LoadingBackdrop>
  );
}

const styles = {
  content: css`
    margin: 0 16px;
  `,
};

export default SiderDemo;
