import React, { Component } from "react";
import * as d3 from "d3";

import Government from "./government";

export default class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    new Government(this.refs.chart);
  }

  render() {
    return <div id="government" ref="chart"></div>;
  }
}
