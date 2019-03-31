import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  authStream$,
  logUserOut,
  signUserIn,
} from './features/authentication/epics';
import { authReducer } from './features/authentication/reducer';
import { fetchTaskLists } from './features/tasks/epic';
import { taskReducer } from './features/tasks/reducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
});

const rootEpic = combineEpics(
  fetchTaskLists,
  signUserIn,
  logUserOut,
  authStream$
);

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
