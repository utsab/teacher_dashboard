import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadChallenge} from 'redux/modules/solution';
import {bindActionCreators} from 'redux';

@connect(
  state => ({challengesList: state.solution.challengesList}),
  dispatch => bindActionCreators({loadChallenge}, dispatch)
)

export default class Solution extends Component {
  static propTypes = {
    challengesList: PropTypes.array,
    loadChallenge: PropTypes.func.isRequired
  };

  render() {
    const {challengesList} = this.props;

    const challenges = challengesList.map(function(challengeObj) {
      return (
          <li onClick={this.props.loadChallenge}>
            {challengeObj.title}
          </li>
        );
    }.bind(this));


    return (
      <div className="solution">
        <h2>Testing</h2>
        <ul>
          {challenges}
        </ul>
      </div>
    );
  }
}
