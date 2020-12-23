/* eslint-disable */
import Button from 'antd/lib/button';
import React, { useEffect } from 'react';
import { authState } from 'rxfire/auth';
import { Machine } from 'xstate';
// import Chat from '../features/chat/Chat';
// import { Stats } from '../features/stats';

import Tasks from '../features/tasks';
import Votes from '../features/votes';
import { useMachine } from '../hooks/useMachine';
import { app, googleAuthProvider } from '../utils/firebase';
// import { Static } from '../features/static/index.jsx';
import {Hill} from '../features/hill'


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

const Project = () => {
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
            <Hill  />
          </div>
          <Tasks />
          <Votes />
        </div>
      </>
    </article>
  );
};

export default Project;
