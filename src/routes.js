import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Widgets,
    Login,
    LoginSuccess,
    NotFound,
    Pagination,
    ManageClass
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <IndexRoute component={ManageClass} onEnter={requireLogin}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="pagination" component={Pagination}/>
        <Route path="widgets" component={Widgets}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="manageClass" component={ManageClass}/>
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
