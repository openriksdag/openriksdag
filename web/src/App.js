import React, {Component} from 'react';
import RiksdagChart from "./components/RiksdagChart/RiksdagChart";
import Layout from "./components/layout";
import ChartWrapper from "./ChartWrapper";
import MotionsSquare from "./components/MotionsSquare";

import peopleData from "./data/people.json";


class App extends Component {
  render() {
    return (
      <Layout>
        <ChartWrapper/>
        <RiksdagChart people={peopleData}/>
        <MotionsSquare type="Motions" description="Motions & Proposals" />
        <MotionsSquare
          type="Proposals"
          description="Proposals for decision"
          reverse
        />
      </Layout>
    )
  }
}

export default App;
