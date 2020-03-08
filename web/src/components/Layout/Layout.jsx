import React from "react";
import "./Layout.css";
import gitlogo from "../../images/github.png";
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="title">
        Open Riksdag
        <div className="description">
          Decision-making in the Swedish parliamentary system
        </div>
      </div>
      <div className="content">
        {children.map((chart, index) => (
          <div className="chart" key={index}>
            {chart}
          </div>
        ))}
      </div>
      <div className="navbar">
        <div className="rotation-wrapper-outer">
          <div className="rotation-wrapper-inner">
            <div className="link">
              <a href="../../">About us</a>
            </div>
          </div>
        </div>
        <div className="rotation-wrapper-outer">
          <div className="rotation-wrapper-inner">
            <div className="link">About the project</div>
          </div>
        </div>

        <div id="git">
          <a href="https://github.com/openriksdag/openriksdag">
            <img alt="Git" src={gitlogo}></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Layout;
