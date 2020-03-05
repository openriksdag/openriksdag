import React, {Component} from 'react';
import RiksdagChart from "./components/RiksdagChart/RiksdagChart";
import Layout from "./components/layout";
import ChartWrapper from "./ChartWrapper";

import peopleData from "./data/people.json";


class App extends Component {
  render() {
    return (
      <Layout>
        <ChartWrapper/>
        <RiksdagChart people={peopleData}/>
      </Layout>
    )
  }
}

export default App;
