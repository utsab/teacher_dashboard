import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({studentCode: state.solution.data})
)

export default class Solution extends Component {
  static propTypes = {
    studentCode: PropTypes.object
  };

  render() {
    const {studentCode} = this.props;
    console.log(studentCode);
    return (
      <div className="solution">
        <h2>StudentCode</h2>
        <textarea></textarea>
      </div>
    );
  }
}
