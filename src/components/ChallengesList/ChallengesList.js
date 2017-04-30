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
    const _this = this;

    const challenges = challengesList.map(function renderChallengeTitle(challengeObj) {
      return (
          <li onClick={() => _this.props.loadChallenge(challengeObj.url)}>
            {challengeObj.title}
          </li>
        );
    });


    return (
      <div className="solution">
        <h2>ChallengesList</h2>
        <ul>
          {challenges}
        </ul>
      </div>
    );
  }
}
