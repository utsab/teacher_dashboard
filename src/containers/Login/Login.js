import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const inputName = this.refs.name;
    const inputUsername = this.refs.username;
    const inputEmail = this.refs.email;
    const inputPassword = this.refs.password;
    this.props.login(inputName.value, inputUsername.value, inputEmail.value, inputPassword.value);
    inputName.value = '';
    inputUsername.value = '';
    inputEmail.value = '';
    inputPassword.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="name" placeholder="Name" className="form-control"/><br/>
              <input type="text" ref="username" placeholder="Username" className="form-control"/><br/>
              <input type="text" ref="email" placeholder="Email" className="form-control"/><br/>
              <input type="password" ref="password" placeholder="Password" className="form-control"/><br/>
            </div><br/>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Sign Up
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
