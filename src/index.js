import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CommentsProvider } from './context/CommentsContext';
import { ProblemProvider } from './context/ProblemsContext';
import './index.css';
import Discussions from './pages/Discussions';
import NoMatch from './pages/NoMatch';
import Projects from './pages/Summary';
import Tasks from './pages/Tasks';
import Votes from './pages/Votes';
import * as serviceWorker from './serviceWorker';


const Routes = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

ReactDOM.render(
  <ProblemProvider>
    <CommentsProvider>
      <Routes />
    </CommentsProvider>
  </ProblemProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
