import React, {Component} from 'react';
import { Solution } from 'components';
import { ChallengesList } from 'components';

export default class Challenges extends Component {

  render() {
    return (
      <div>
        <ChallengesList/>
        <Solution/>
      </div>
    );
  }
}
