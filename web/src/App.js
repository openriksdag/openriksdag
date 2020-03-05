import React, { Component } from "react";
import RiksdagChart from "./components/RiksdagChart/RiksdagChart";
import Layout from "./components/layout";
import ChartWrapper from "./ChartWrapper";
import MotionsSquare from "./components/MotionsSquare";
import { useSelector } from "react-redux";

import propoData from "./data/propositions.json";
import motionsData from "./data/motions.json";

<<<<<<< HEAD

class App extends Component {
  render() {
    return (
      <Layout>
        <ChartWrapper />
        <RiksdagChart />
      </Layout>

    )
  }
||||||| merged common ancestors

class App extends Component {
  render() {
    return (
      <Layout>
        <ChartWrapper />
        <RiksdagChart />
      </Layout>



    )
  }
=======
function App(props) {
  const { peopleData, hovered } = useSelector(({ peopleData, hovered }) => ({
    peopleData,
    hovered
  }));
  return (
    <Layout>
      <RiksdagChart people={peopleData} hovered={hovered} />
      <MotionsSquare
        type="Motions"
        description="Motions & Proposals"
        data={motionsData}
      />
      <ChartWrapper />
      <MotionsSquare
        type="Proposals"
        description="Proposals for decision"
        data={propoData}
        reverse
      />
    </Layout>
  );
>>>>>>> 0d809dedaea9c21a4c10f94e6775a528b430d7ca
}

export default App;
