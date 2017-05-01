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
    const styles = require('./Solution.scss');
    const textareaStyle = {color: 'white',
                           backgroundColor: 'black',
                           height: '800px', };
    return (
      <div className="solution">
        <div className="col-md-4">
          <div>
            <strong className={styles.foobarfoo}>{studentCode ? studentCode.title : ''}</strong>
          </div>
          <p>
            <a href={studentCode ? studentCode.description : ''}>
              {studentCode ? studentCode.description : ''}
            </a>
          </p>
        </div>
        <div className="col-md-6">
          <textarea name="studentCode"
                    value={studentCode ? studentCode.solution : ''}
                    disabled
                    style={textareaStyle}
          />
        </div>
      </div>
    );
  }
}
