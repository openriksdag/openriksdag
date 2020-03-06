import Arrow from './Arrow';
import React, { Component } from 'react';

export default class ArrowWrapper extends Component {
    componentDidMount() {
        new Arrow(this.refs.arrow);
    }
    render() {
        return (
            <div className="arrow">

                <div className="arrow" ref="arrow">
                </div>
            </div>

        )
    }
}