import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addUser} from 'redux/modules/user';

@connect(
    state => ({user: state.user.data}),
    dispatch => bindActionCreators({addUser}, dispatch))
export default class ShowUsers extends Component {
  static propTypes = {
    user: PropTypes.object,
    addUser: PropTypes.func.isRequired
  }

  render() {
    const {addUser} = this.props; // eslint-disable-line no-shadow
    return (
      <div>
        <button onClick={addUser}>Add User</button>
      </div>
    );
  }
}
