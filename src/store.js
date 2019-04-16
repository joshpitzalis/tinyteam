import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import { authReducer } from './features/auth/authReducer';
import { fetchTaskLists } from './features/tasks/epic';
import { taskReducer } from './features/tasks/reducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
});

const rootEpic = combineEpics(
  fetchTaskLists
  // signUserIn,
  // logUserOut,
  // authStream$,
  // myProjects$,
  // createNewTeam
);

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
