import { Grommet } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './features/auth/components/Navbar';
import Errors from './features/errors';
import NoMatch from './features/errors/NoMatch';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Projects from './pages/Project';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
    colors: { brand: 'currentColor' },
  },
};
const _Routes = ({ authStatus, userId }) => (
  <Grommet theme={theme}>
    <BrowserRouter>
      <React.StrictMode>
        <Errors>
          <div className="wrapper">
            <Navbar userId={userId} />
            <main className="sans-serif pa4">
              <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute
                  authStatus={authStatus}
                  exact
                  path="/project/:project"
                  component={Projects}
                />
                <PrivateRoute
                  authStatus={authStatus}
                  exact
                  path="/dashboard/:user"
                  component={Dashboard}
                />
                <Route component={NoMatch} />
              </Switch>
            </main>
            <Footer />
          </div>
        </Errors>
      </React.StrictMode>
    </BrowserRouter>
  </Grommet>
);

const select = store => ({
  authStatus: store.auth && store.auth.status,
  userId: store.auth.user && store.auth.user.uid,
});

export const Routes = connect(select)(_Routes);

const PrivateRoute = ({ component: Component, authStatus, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authStatus ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
