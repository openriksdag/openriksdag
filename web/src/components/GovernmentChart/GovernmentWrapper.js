import React, { Component } from 'react';
import Government from './Government';
import logo from "../../images/logo-government.png"
import "./GovernmentWrapper.css"

export default class GovernmentWrapper extends Component {
    componentDidMount() {
        new Government(this.refs.governmentChart);
    }
    render() {
        return (
            <div>
                {/* <div className="logo">
                    <img src={logo} />
                </div> */}
                <div className="government" ref="governmentChart">
                </div>
            </div>

        )
    }
}