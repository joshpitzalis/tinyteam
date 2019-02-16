import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProblemProvider } from './context/ProblemsContext';
import './index.css';
import Discussions from './pages/Discussions';
import NoMatch from './pages/NoMatch';
import Problems from './pages/Problems';
import * as serviceWorker from './serviceWorker';

const Routes = () => {

  
  return (
    <BrowserRouter>
      <div className="sans-serif pa4">
      
      <Switch>
        <Route exact path="/" component={Problems} />
        <Route exact path="/discussion/:discussionId" component={Discussions} />
        <Route component={NoMatch} />
        </Switch>
     
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(
<ProblemProvider>
  <Routes />   
  </ProblemProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
