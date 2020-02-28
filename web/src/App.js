import Layout from "./layout.js";
import { render } from "@testing-library/react";
import React, { Component } from "react";
import Wrapper from "./Wrapper";
import Government from "./government";

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
}

export default App;
