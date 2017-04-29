import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect(state => ({ time: state.info.data.time }))
export default class Solution extends Component {
  // static propTypes = {
  //   time: PropTypes.number
  // }

  render() {
    return (
      <div className="solution">
        <h2>Testing</h2>
      </div>
    );
  }
}
