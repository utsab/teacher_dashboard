import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({studentCode: state.solution.data})
)

export default class Solution extends Component {
  static propTypes = {
    studentCode: PropTypes
  };

  render() {
    const {studentCode} = this.props;
    return (
      <div className="solution">
        <h2>StudentCode</h2>
        <h3>{studentCode ? studentCode.title : ''}</h3>
        <a href={studentCode ? studentCode.description : ''}>
          {studentCode ? studentCode.description : ''}
        </a>
        <textarea name="studentCode"
                  value={studentCode ? studentCode.solution : ''}
                  disabled
        />
      </div>
    );
  }
}
