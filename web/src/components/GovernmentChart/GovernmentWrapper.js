import React, {Component} from 'react';
import Government from './Government';
import "./GovernmentWrapper.css"
import {ChangeHover, Select, Selected} from "../../state/state"

export default class GovernmentWrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    new Government(this.refs.governmentChart,
      (name) => this.props.dispatch(ChangeHover(Selected.Ministry(name))),
      () => this.props.dispatch(ChangeHover(Selected.Nothing())),
      (name) => this.props.dispatch(Select(Selected.Ministry(name))),
      this.props.selected,
    );
  }

  render() {
    return (
      <div>
        <div className="government" ref="governmentChart">
        </div>
      </div>

    )
  }
}