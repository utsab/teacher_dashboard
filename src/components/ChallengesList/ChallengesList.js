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
    // const {challengesList} = this.props;
    // const challenges = challengesList.map(function(challengeObj) {
    //   return (
    //       <li onClick={console.log('clicked!!!!')}>
    //         {challengeObj.title}
    //       </li>
    //     );
    // });

    return (
      <div className="solution">
        <h2>Testing</h2>
          <span className="left" onClick={function() {alert('left');}}>Left</span>
      </div>
    );
  }
}
