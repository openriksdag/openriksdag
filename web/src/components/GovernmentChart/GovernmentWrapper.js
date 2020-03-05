import React, { Component } from 'react';
import Government from './Government'

export default class ChartWrapper extends Component {
    componentDidMount() {
        new Government(this.refs.governmentChart);
    }
    render() {
        return (
            <div>
                <div ref="governmentChart"></div>
            </div>

        )
    }
}