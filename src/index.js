import { Grommet } from 'grommet';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
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
         
        
          <nav class="dt w-100 border-box pa3 ph6-ns bb b--black-10 ">
  <a class="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
    <img src="http://tachyons.io/img/logo.jpg" class="dib w2 h2 br-100" alt="Site Name" />
  </a>
  <div class="dtc v-mid w-75 tr">
    {/* <a class="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#" title="About">Services</a> */}
    <a class="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#" title="Store">Blog</a>
    <a class="link dim dark-gray f6 f5-ns dib" href="#" title="Contact"> Logout</a>
  </div>
</nav><div className="sans-serif pa4">
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
          
          <footer class="bg-near-black white-80 pv5 pv6-l ph4">
  <p class="f6"><span class="dib mr4 mr5-ns">©2048 Your Company LLC, Inc.</span>
    <a class="link white-80 hover-light-purple" href="/terms">Terms</a> /
    <a class="link white-80 hover-gold" href="/privacy"> Privacy </a> /
    <a class="link white-80 hover-green" href="#">hi@yourcompany.com /</a>
    <small>Version 0.4.3</small>
  </p>
</footer>
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
