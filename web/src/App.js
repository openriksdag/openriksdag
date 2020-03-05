import React, {Component} from 'react';
import RiksdagChart from "./components/RiksdagChart/RiksdagChart";
import Layout from "./components/layout";
import ChartWrapper from "./ChartWrapper";
import {useSelector} from "react-redux"


function App(props) {
  const {peopleData, hovered} = useSelector(({peopleData, hovered}) => ({peopleData, hovered}))
  return (
    <Layout>
      <ChartWrapper/>
      <RiksdagChart people={peopleData} hovered={hovered}/>
    </Layout>
  )
}

export default App;
