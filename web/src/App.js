import React, { Component } from "react";
import RiksdagChart from "./components/RiksdagChart/RiksdagChart";
import Layout from "./components/layout";
import ChartWrapper from "./ChartWrapper";
import MotionsSquare from "./components/MotionsSquare";

import peopleData from "./data/people.json";
import propoData from "./data/propositions.json";
import motionsData from "./data/motions.json";

class App extends Component {
  render() {
    return (
      <Layout>
        <ChartWrapper />
        <RiksdagChart people={peopleData} />
        <MotionsSquare
          type="Motions"
          description="Motions & Proposals"
          data={motionsData}
        />
        <MotionsSquare
          type="Proposals"
          description="Proposals for decision"
          data={propoData}
          reverse
        />
      </Layout>
    );
  }
}

export default App;
