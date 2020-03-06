import React, { Component } from "react";
import RiksdagChart from "./components/RiksdagChart/RiksdagChart";
import Layout from "./components/Layout/Layout";
import GovernmentChart from "./components/GovernmentChart/GovernmentWrapper"
import Committees from "./components/CommitteesChart/Committees"
import MotionsChart from "./components/MotionsChart";
import { useSelector } from "react-redux";

import propoData from "./data/propositions.json";
import motionsData from "./data/motions.json";

function App(props) {
  const { peopleData, hovered, searchDate } = useSelector((s) => s);
  return (
    <Layout>
      <RiksdagChart people={peopleData} hovered={hovered} date={searchDate} />
      <div className="mid-section">
        <MotionsChart
          type="Motions"
          description="Motions and Proposals"
          data={motionsData}
        />
        <GovernmentChart />
        <MotionsChart
          type="Proposals"
          description="Proposals for decision"
          data={propoData}
          reverse
        />

      </div>

      <Committees />


    </Layout>
  );
}

export default App;
