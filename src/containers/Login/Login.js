import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

@connect(
  state => ({user: state.auth.user, key: state.auth.key, error: state.auth.loginError}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.object,
    key: PropTypes.number,
    signup: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func,
    setKey: PropTypes.func
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

  handleSelect = (key) => {
    this.props.setKey(key);
  }

  render() {
    const {user, logout, error, key} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Tabs activeKey={key} onChange={this.handleSelect} id="controlled-tab-example" className={styles.tabContainer}>
            <Tab eventKey={1} title="Sign Up">
              <div>
                <Helmet title="Sign Up"/>
                {!user &&
                <div className={styles.formContainer}>
                  <form className="login-form form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <p>Name</p>
                      <input type="text" ref="signupName" placeholder="Name" className="form-control"/><br/>
                      <p>Username</p>
                      <input type="text" ref="signupUsername" placeholder="Username" className="form-control"/><br/>
                      <p>Email</p>
                      <input type="text" ref="signupEmail" placeholder="Email" className="form-control"/><br/>
                      <p>Password</p>
                      <input type="password" ref="signupPassword" placeholder="Password" className="form-control"/><br/>
                    </div><br/>
                    <button className="btn" onClick={this.handleSignupSubmit}>{' '}Sign Up
                    </button>
                  </form>
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
            </Tab>

            <Tab eventKey={2} title="Login">
              <div>
                <Helmet title="Login"/>
                {!user &&
                <div className={styles.formContainer}>
                  <form className="login-form form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <p>FCC Dashboard Login</p>
                      <input type="text" ref="loginEmail" placeholder="Email" className="form-control"/><br/>
                      <p>Password</p>
                      <input type="password" ref="loginPassword" placeholder="Password" className="form-control"/><br/>
                    </div><br/>
                    <button className="btn" onClick={this.handleLoginSubmit}>{' '}Login
                    </button>
                  </form>
                  {error &&
                    <p>The email or password do not match an existing user.</p>
                  }
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
            </Tab>
          </Tabs>
      </div>
    );
  }
}
