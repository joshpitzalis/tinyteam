import { Grommet } from 'grommet';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './features/authentication/components/Navbar';
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
export const Routes = () => (
  <Grommet theme={theme}>
    <BrowserRouter>
      <React.StrictMode>
        <Errors>
          <div className="wrapper">
            <Navbar />
            <main className="sans-serif pa4">
              <Switch>
                <Route exact path="/project/:project" component={Projects} />
                <Route exact path="/" component={Login} />
                <Route exact path="/dashboard/:user" component={Dashboard} />
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
