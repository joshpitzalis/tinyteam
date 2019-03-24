import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchTaskLists } from './features/tasks/epic';
import { taskReducer } from './features/tasks/reducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const rootEpic = combineEpics(fetchTaskLists);

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
