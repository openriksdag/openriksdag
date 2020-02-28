<<<<<<< HEAD
=======
import React from "react";
import RiksdagChart from "./components/RiksdagChart";
>>>>>>> c7b87c8c9c4b055eed18c7df45ec05580acdd816
import Layout from "./layout.js";
import { render } from "@testing-library/react";
import React, { Component } from "react";
import Wrapper from "./Wrapper";
import Government from "./government";

<<<<<<< HEAD
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          Beautiful content
          <Wrapper />
          <Government />
        </Layout>
      </div>
    );
  }
=======
function App() {
  return (
    <Layout>
      <RiksdagChart />
    </Layout>
  );
>>>>>>> c7b87c8c9c4b055eed18c7df45ec05580acdd816
}

export default App;
