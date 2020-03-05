import React, { Component } from "react";
import RiksdagChart from "./components/RiksdagChart/RiksdagChart";
import Layout from "./components/layout";
import ChartWrapper from "./ChartWrapper";
import {useSelector} from "react-redux"

import propoData from "./data/propositions.json";
import motionsData from "./data/motions.json";

function App(props) {
  const {peopleData, hovered} = useSelector(({peopleData, hovered}) => ({peopleData, hovered}))
  return (
    <Layout>
      <ChartWrapper/>
      <RiksdagChart people={peopleData} hovered={hovered}/>
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
  )
}

export default App;