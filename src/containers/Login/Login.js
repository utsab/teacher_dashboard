import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user, error: state.auth.loginError}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.object,
    signup: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSignupSubmit = (event) => {
    event.preventDefault();
    const inputName = this.refs.signupName;
    const inputUsername = this.refs.signupUsername;
    const inputEmail = this.refs.signupEmail;
    const inputPassword = this.refs.signupPassword;
    this.props.signup(inputName.value, inputUsername.value, inputEmail.value, inputPassword.value);
    inputName.value = '';
    inputUsername.value = '';
    inputEmail.value = '';
    inputPassword.value = '';
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const inputEmail = this.refs.loginEmail;
    const inputPassword = this.refs.loginPassword;
    this.props.login(inputEmail.value, inputPassword.value);
    inputEmail.value = '';
    inputPassword.value = '';
  }

  render() {
    const {user, logout, error} = this.props;
    const styles = require('./Login.scss');
    console.log(error);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return (
      <div>
        <div className={styles.loginPage + ' container'}>
          <Helmet title="Sign Up"/>
          <h1>Sign Up</h1>
          {!user &&
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" ref="signupName" placeholder="Name" className="form-control"/><br/>
                <input type="text" ref="signupUsername" placeholder="Username" className="form-control"/><br/>
                <input type="text" ref="signupEmail" placeholder="Email" className="form-control"/><br/>
                <input type="password" ref="signupPassword" placeholder="Password" className="form-control"/><br/>
              </div><br/>
              <button className="btn btn-success" onClick={this.handleSignupSubmit}><i className="fa fa-sign-in"/>{' '}Sign Up
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

        <div className={styles.loginPage + ' container'}>
          <Helmet title="Login"/>
          <h1>Login</h1>
          {!user &&
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" ref="loginEmail" placeholder="Email" className="form-control"/><br/>
                <input type="password" ref="loginPassword" placeholder="Password" className="form-control"/><br/>
              </div><br/>
              <button className="btn btn-success" onClick={this.handleLoginSubmit}><i className="fa fa-sign-in"/>{' '}Login
              </button>
            </form>
            {error &&
              <p>The email or password do not match an existing user.</p>
            }
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
      </div>
    );
  }
}
