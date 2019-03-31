import { Grommet } from 'grommet';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Footer } from './components/Footer';
import CommentsProvider from './context/CommentsContext';
import TaskProvider from './context/TasksContext';
import VoteProvider from './context/VoteContext';
import { Navbar } from './features/authentication/components/Navbar';
import Errors from './features/errors';
import NoMatch from './features/errors/NoMatch';
import './index.css';
import Projects from './pages/Project';
import * as serviceWorker from './serviceWorker';
import store from './store';

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

const Routes = () => (
  <Grommet theme={theme}>
    <BrowserRouter>
      <React.StrictMode>
        <Errors>
          <Navbar />
          <div className="sans-serif pa4">
            <Switch>
              <Route exact path="/" component={Projects} />
              {/* <Route
                exact
                path="/discussion/:discussionId"
                component={Discussions}
              />
              <Route exact path="/task/:taskId" component={Tasks} />
              <Route exact path="/vote/:voteId" component={Votes} /> */}
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </Errors>
      </React.StrictMode>
    </BrowserRouter>
  </Grommet>
);

ReactDOM.render(
  <Provider store={store}>
    <TaskProvider>
      <VoteProvider>
        <CommentsProvider>
          <Routes />
        </CommentsProvider>
      </VoteProvider>
    </TaskProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
