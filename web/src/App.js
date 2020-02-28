import React from "react";
import RiksdagChart from "./components/RiksdagChart";
import Layout from "./layout.js";
import { render } from "@testing-library/react";
import React, { Component } from "react";
import Wrapper from "./Wrapper";
import Government from "./government";

function App() {
  return (
    <Layout>
      <RiksdagChart />
    </Layout>
  );
}

export default App;
