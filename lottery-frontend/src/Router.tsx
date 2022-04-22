import React from "react";
import {
  Route,
  ReactLocation,
  Router as BaseRouter,
} from "@tanstack/react-location";
import Lotteries from "./pages/Lotteries";
import MyPage from "./pages/MyPage";

export const location = new ReactLocation();

const routes: Route[] = [
  {
    path: "/",
    element: <MyPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/lotteries",
    element: <Lotteries />,
  },
];

type RouterProps = {
  children: React.ReactNode;
};

const Router: React.FC<RouterProps> = (props) => {
  const { children } = props;
  return (
    <BaseRouter routes={routes} location={location}>
      {children}
    </BaseRouter>
  );
};

export default Router;
