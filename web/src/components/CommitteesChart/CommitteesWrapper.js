import React, { Component } from 'react';
import Committees from './Committees'

export default class CommitteesWrapper extends Component {
    componentDidMount() {
        new Committees(this.refs.committeesChart);
    }
    render() {
        return (
            <div>
                <div ref="committeesChart"></div>
            </div>

        )
    }
}