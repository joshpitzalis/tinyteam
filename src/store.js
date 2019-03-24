import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { taskReducer } from './features/tasks/reducer';

const epic1 = () => of({ type: 'SET_NAME', payload: 'sally' });

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const rootEpic = combineEpics(epic1);

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
