import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CommentsProvider from './context/CommentsContext';
import VoteProvider from './context/VoteContext';
import Discussions from './features/chat/Chat';
import Errors from './features/errors';
import NoMatch from './features/errors/NoMatch';
import Tasks from './features/tasks/Tasks';
import Votes from './features/votes/Votes';
import './index.css';
import Projects from './pages/Project';
import * as serviceWorker from './serviceWorker';

const Routes = () => {
  return (
    <BrowserRouter>
    <React.StrictMode>
    <Errors>
      <div className="sans-serif pa4">
        <Switch>
          <Route
            exact
            path="/"
            component={Projects}
          />
          <Route
            exact
            path="/discussion/:discussionId"
            component={Discussions}
          />
           <Route
            exact
            path="/task/:taskId"
            component={Tasks}
          />
           <Route
            exact
            path="/vote/:voteId"
            component={Votes}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
      </Errors>
      </React.StrictMode>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <VoteProvider>
    <CommentsProvider>
      <Routes />
    </CommentsProvider>
  </VoteProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

