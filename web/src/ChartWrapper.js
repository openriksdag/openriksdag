import React, { Component } from 'react';
import Government from './components/Government';
import Committees from './components/Committees'

export default class ChartWrapper extends Component {
    componentDidMount() {
        new Government(this.refs.governmentChart);
        new Committees(this.refs.committeesChart)

    }
    render() {
        return (
            <div>
                <div ref="governmentChart"></div>
                <div ref="committeesChart"></div>

            </div>

        )
    }
}