import React, { Component } from 'react';
import RiksdagChart from "./components/RiksdagChart";
import Layout from "./components/layout";
import { render } from "@testing-library/react";
// import React, { Component } from "react";
import ChartWrapper from "./ChartWrapper";
// import Government from "./components/Government.js";



class App extends Component {
  render() {
    return (
      <Layout>
        <ChartWrapper />
        <RiksdagChart />
      </Layout>

    )
  }
}

export default App;
