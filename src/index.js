import { Grommet } from 'grommet';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CommentsProvider from './context/CommentsContext';
import TaskProvider from './context/TasksContext';
import VoteProvider from './context/VoteContext';
import Discussions from './features/chat/Chat';
import Errors from './features/errors';
import NoMatch from './features/errors/NoMatch';
import Tasks from './features/tasks';
import Votes from './features/votes';
import './index.css';
import Projects from './pages/Project';
import * as serviceWorker from './serviceWorker';
import './tailwind.output.css';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const Routes = () => (
  <Grommet theme={theme}>
    <BrowserRouter>
      <React.StrictMode>
        <Errors>
          <div className="sans-serif pa4 bg-light-brown">
            <Switch>
              <Route exact path="/" component={Projects} />
              <Route
                exact
                path="/discussion/:discussionId"
                component={Discussions}
              />
              <Route exact path="/task/:taskId" component={Tasks} />
              <Route exact path="/vote/:voteId" component={Votes} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <div className="tc sans-serif fw1 ma3 bg-yellow-100">
            <small>Version 0.4.1</small>
          </div>
        </Errors>
      </React.StrictMode>
    </BrowserRouter>
  </Grommet>
);

ReactDOM.render(
  <TaskProvider>
    <VoteProvider>
      <CommentsProvider>
        <Routes />
      </CommentsProvider>
    </VoteProvider>
  </TaskProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
