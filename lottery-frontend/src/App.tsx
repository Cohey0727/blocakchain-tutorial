import React from "react";
import Layout from "./Layout";
import Router from "./Router";

type Props = {};

const App: React.FC<Props> = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
