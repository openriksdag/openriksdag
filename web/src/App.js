import React, { Component } from "react";
import RiksdagChart from "./components/RiksdagChart/RiksdagChart";
import Layout from "./components/Layout/Layout";
import GovernmentChart from "./components/GovernmentChart/GovernmentWrapper"
import CommitteesChart from "./components/CommitteesChart/CommitteesWrapper"
import MotionsChart from "./components/MotionsChart";
import { useSelector } from "react-redux";

import propoData from "./data/propositions.json";
import motionsData from "./data/motions.json";

function App(props) {
  const { peopleData, hovered } = useSelector(({ peopleData, hovered }) => ({
    peopleData,
    hovered
  }));
  return (
    <Layout>
      <RiksdagChart people={peopleData} hovered={hovered} />
      <div className="mid-section">
        <MotionsChart
          type="Motions"
          description="Motions and Proposals"
          data={motionsData}
        />
        <MotionsChart
          type="Proposals"
          description="Proposals for decision"
          data={propoData}
          reverse
        />
      </div>
      <GovernmentChart />
      <CommitteesChart />


    </Layout>
  );
}

export default App;
