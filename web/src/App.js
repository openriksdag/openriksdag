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
import { Route, BrowserRouter } from "react-router-dom";
import AboutProject from './components/AboutProject/AboutProject'

function App(props) {
  const {
    peopleData,
    motionsData,
    propoData,
    searchDate,
    hovered,
    selected,
  } = useSelector(s => s);

  return (

    <BrowserRouter>

      <Route path="/about" render={() => (
        <Layout>
          <AboutUs />
          <div className="arrow-disable">
            <svg></svg>
          </div>
        </Layout>
      )} />

      <Route path="/project" render={() => (
        <Layout>

          <AboutProject />
          <div className="arrow-disable">
            <svg></svg>
          </div>
        </Layout>
      )} />

      <Route exact path="/" render={() => (

        <Layout>
          <div className="top-section">
            <Arrow index={0} shownFor={'representative'} hovered={hovered} selected={selected} />
            <RiksdagChart people={peopleData} hovered={hovered} selected={selected} date={searchDate} />
            <Arrow index={3} shownFor={'proposition'} hovered={hovered} selected={selected} />
          </div>

          <div className="mid-section">
            <MotionsChart
              type="Motions"
              description="Motions and Proposals"
              data={motionsData}
              hovered={hovered}
              selected={selected}
            />
            <div className="government-arrow">
              <Arrow index={4} shownFor={'government'} hovered={hovered} selected={selected} />
            </div>
            <GovernmentChart />

            <MotionsChart
              type="Proposals"
              description="Proposals for decision"
              data={propoData}
              hovered={hovered}
              selected={selected}
              reverse
            />
          </div>
          <div className="bottom-section">
            <Arrow index={1} shownFor={'motion'} hovered={hovered} selected={selected} />
            <Committees />
            <Arrow index={2} shownFor={'committee'} hovered={hovered} selected={selected} />
          </div>
        </Layout>

      )} />
    </BrowserRouter>
  );
}

export default App;
