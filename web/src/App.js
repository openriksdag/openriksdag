import React from "react";
import RiksdagChart from "./components/RiksdagChart/RiksdagChart";
import Layout from "./components/Layout/Layout";
import GovernmentChart from "./components/GovernmentChart/GovernmentWrapper";
import Committees from "./components/CommitteesChart/Committees";
import MotionsChart from "./components/MotionChart/MotionsChart";
import { useSelector } from "react-redux";
// import Arrow from './components/Arrow/Arrow';
import Arrow from './components/Arrow/Arrow';
import AboutUs from './components/AboutUs/AboutUs';

function App(props) {
  const {
    peopleData,
    motionsData,
    propoData,
    searchDate,
    hovered
  } = useSelector(s => s);

  return (
    <Layout>
      <div className="top-section">

        <Arrow index={0} />
        <RiksdagChart people={peopleData} hovered={hovered} date={searchDate} />
        <Arrow index={3} />
      </div>

      <div className="mid-section">
        <MotionsChart
          type="Motions"
          description="Motions and Proposals"
          data={motionsData}
          hovered={hovered}
        />
        <div className="arrow-position-4">
          <Arrow index={4} />
        </div>
        <GovernmentChart />




        <MotionsChart
          type="Proposals"
          description="Proposals for decision"
          data={propoData}
          hovered={hovered}
          reverse
        />
      </div>
      <div className="buttom-section">
        <div className="arrow-position-1">
          <Arrow index={1} />
        </div>
        <Committees />
        <div className="arrow-position-2">
          <Arrow index={2} />
        </div>


      </div>



    </Layout>
  );
}

export default App;
