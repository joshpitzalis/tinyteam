import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CommentsProvider from './context/CommentsContext';
import TaskProvider from './context/TasksContext';
import VoteProvider from './context/VoteContext';
// import { initializeFirePerf } from './utils/firebase';
import { checkAuth } from './features/auth/authOperations';
import './index.css';
import { Routes } from './Routes';
import * as serviceWorker from './serviceWorker';
import store from './store';

store.dispatch(checkAuth());

export const App = () => (
  <Provider store={store}>
    <TaskProvider>
      <VoteProvider>
        <CommentsProvider>
          <Routes />
        </CommentsProvider>
      </VoteProvider>
    </TaskProvider>
  </Provider>
);

// initializeFirePerf();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
