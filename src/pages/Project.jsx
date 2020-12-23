/* eslint-disable */
import Button from 'antd/lib/button';
import React, { useEffect } from 'react';
import { authState } from 'rxfire/auth';
import { Machine } from 'xstate';
// import Chat from '../features/chat/Chat';
// import { Stats } from '../features/stats';
import HillChart from 'hill-chart';
import Tasks from '../features/tasks';
import Votes from '../features/votes';
import { useMachine } from '../hooks/useMachine';
import { app, googleAuthProvider } from '../utils/firebase';
// import { Static } from '../features/static/index.jsx';

import 'hill-chart/dist/styles.css';

export const authMachine = Machine({
  id: 'auth',
  initial: 'loggedIn',
  states: {
    idle: {
      on: {
        LOGGED_IN: 'loggedIn',
        LOGGED_OUT: 'loggedOut',
      },
    },
    loggedOut: {
      on: {
        LOGGED_IN: 'loggedIn',
      },
    },
    loggedIn: {
      on: {
        LOGGED_OUT: {
          actions: (ctx, event) => event.payload,
          target: 'loggedOut',
        },
      },
    },
  },
});

const data = [
  {
    id: '3', // (optional)
    color: 'red',
    description: 'Late af task',
    size: 10,
    x: 12.069770990416055,
    y: 12.069770990416057,
  },

  {
    id: '2', // (optional)
    color: 'green',
    description: 'Hell yeah!',
    x: 93.48837209302326,
    y: 6.511627906976724,
    size: 10,
  },
];

const config = {
  target: '.hill-chart',
  width: 1000,
  height: 200,
  preview: false,
};

const Project = () => {
  useEffect(() => {
    const hill = new HillChart(data, config);
    hill.render();
  }, []);
  return (
    <article className="bg-light-brown">
      <>
        <div className="tr">
          <Button size="large" onClick={() => app.auth().signOut()}>
            Logout
          </Button>
        </div>
        <div className="bg-white w-3/4 center shadow pt-5 rounded-md">
          <div className="tc ">
            <svg className="hill-chart" />
          </div>
          <Tasks />
          <Votes />
        </div>
      </>
    </article>
  );
};

export default Project;
