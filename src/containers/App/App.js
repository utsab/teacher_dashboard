import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
// import { IndexLink } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import logo from './freeCodeCamp.jpg';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { isLoaded as isUserLoaded, load as loadUser } from 'redux/modules/user';
import { isLoaded as isStudentLoaded, load as loadStudent } from 'redux/modules/classForm';


import { InfoBar } from 'components';
import { ShowUsers } from 'components';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    if (!isStudentLoaded(getState()) && isAuthLoaded(getState())) {
      promises.push(dispatch(loadStudent()));
    }

    if (!isUserLoaded(getState())) {
      promises.push(dispatch(loadUser()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div>
        <div className={styles.app}>
          <Helmet {...config.app.head}/>
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/" className="navbar-brand pull-left">
                  <img src={logo}/>
                  <span>Teacher Dashboard BETA</span>
                </a>
              </Navbar.Brand>
               {user && <Navbar.Toggle />}
            </Navbar.Header>
             {user && <Navbar.Collapse eventKey={0}>
                  <Nav navbar>
                    {user && <LinkContainer to="/chat">
                      <NavItem eventKey={1} className="hidden-sm hidden-md hidden-lg">Chat</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/">
                      <NavItem eventKey={2} className="hidden-sm hidden-md hidden-lg">Dashboard</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/manageClass">
                      <NavItem eventKey={3} className="hidden-sm hidden-md hidden-lg">Manage Class</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/widgets">
                      <NavItem eventKey={4} className="hidden-sm hidden-md hidden-lg">Widgets</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/survey">
                      <NavItem eventKey={5} className="hidden-sm hidden-md hidden-lg">Survey</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/pagination">
                      <NavItem eventKey={6} className="hidden-sm hidden-md hidden-lg">Pagination</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/about">
                      <NavItem eventKey={7} className="hidden-sm hidden-md hidden-lg">About Us</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/logout">
                      <NavItem eventKey={8} className="logout-link" onClick={this.handleLogout}>
                        Logout
                      </NavItem>
                    </LinkContainer>}
                  </Nav>
            </Navbar.Collapse>}
          </Navbar>
        </div>
        <div className={styles.appNav}>
          {user && <Navbar className="hidden-xs">
            <Navbar.Header>
              <Navbar.Brand>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
              <Navbar.Collapse eventKey={0}>
                <Nav navbar>
                  {user && <LinkContainer to="/">
                      <NavItem eventKey={1}>Dashboard</NavItem>
                    </LinkContainer>}
                  {user && <LinkContainer to="/chat">
                    <NavItem eventKey={2}>Chat</NavItem>
                  </LinkContainer>}
                  {user && <LinkContainer to="/manageClass">
                    <NavItem eventKey={3}>Manage Class</NavItem>
                  </LinkContainer>}
                  {user && <LinkContainer to="/widgets">
                    <NavItem eventKey={4}>Widgets</NavItem>
                  </LinkContainer>}
                  {user && <LinkContainer to="/survey">
                    <NavItem eventKey={5}>Survey</NavItem>
                  </LinkContainer>}
                  {user && <LinkContainer to="/pagination">
                    <NavItem eventKey={6}>Pagination</NavItem>
                  </LinkContainer>}
                  {user && <LinkContainer to="/about">
                    <NavItem eventKey={7}>About Us</NavItem>
                  </LinkContainer>}
                </Nav>
              </Navbar.Collapse>
          </Navbar>}
        </div>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <ShowUsers/>
        <InfoBar/>

        <div className="well text-center">
          Have questions? Ask for help <a
          href="https://github.com/erikras/react-redux-universal-hot-example/issues"
          target="_blank">on Github</a> or in the <a
          href="https://discord.gg/0ZcbPKXt5bZZb1Ko" target="_blank">#react-redux-universal</a> Discord channel.
        </div>
      </div>
    );
  }
}
