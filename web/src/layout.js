import React from "react";
import "./layout.css";
import gitlogo from "./images/github.png";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="title">
        Open Riksdag
        <div className="description">
          Decision-making in the Swedish parliamentary system
        </div>
      </div>
      <div className="navbar">
        <div className="rotation-wrapper-outer">
          <div className="rotation-wrapper-inner">
            <div className="link">About us</div>
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
      {children}
    </div>
  );
};

export default Layout;
