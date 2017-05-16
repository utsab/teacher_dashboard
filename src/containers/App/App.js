import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { IndexLink } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import logo from './freeCodeCamp.jpg';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { isLoaded as isUserLoaded, load as loadUser } from 'redux/modules/user';
import { isLoaded as isStudentLoaded, load as loadStudent } from 'redux/modules/classForm';
import { isLoaded as isDashboardLoaded, load as loadDashboard } from 'redux/modules/classDashboard';


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
    if (!isDashboardLoaded(getState()) && isAuthLoaded(getState())) {
      promises.push(dispatch(loadDashboard()));
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
                <IndexLink to="/">
                  <a href="#" className="navbar-brand"><img className="img-responsive" src={logo}/></a>
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Text pullLeft>
                Teacher Dashboard BETA
              </Navbar.Text>
               {user && <Navbar.Toggle />}
            </Navbar.Header>
             {user && <Navbar.Collapse>
              <Navbar.Text pullRight>
                <Navbar.Link className="logout-link" onClick={this.handleLogout} href="/logout">Logout</Navbar.Link>
              </Navbar.Text>
            </Navbar.Collapse>}
          </Navbar>
          <div className={styles.appNav}>
            {user && <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                </Navbar.Brand>
                <Navbar.Toggle/>
              </Navbar.Header>
                <Navbar.Collapse eventKey={0}>
                  <Nav navbar>
                    {user && <LinkContainer to="/chat">
                      <NavItem eventKey={1}>Chat</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/manageClass">
                      <NavItem eventKey={1}>Manage Class</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/widgets">
                      <NavItem eventKey={2}>Widgets</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/survey">
                      <NavItem eventKey={3}>Survey</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/pagination">
                      <NavItem eventKey={4}>Pagination</NavItem>
                    </LinkContainer>}
                    {user && <LinkContainer to="/about">
                      <NavItem eventKey={5}>About Us</NavItem>
                    </LinkContainer>}
                  </Nav>
                  {user &&
                  <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}
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
      </div>
    );
  }
}
