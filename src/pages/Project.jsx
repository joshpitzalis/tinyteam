import React, { useEffect } from 'react';
import { authState } from 'rxfire/auth';
import { Machine } from 'xstate';
import Chat from '../features/chat/Chat';
import Tasks from '../features/tasks';
import Votes from '../features/votes';
import { useMachine } from '../hooks/useMachine';
import { app, googleAuthProvider } from '../utils/firebase';
import { Static } from './../features/static/index.jsx';
import { Stats } from './../features/stats/index.jsx';

export const authMachine = Machine({
  id: 'auth',
  initial: 'loggedOut',
  states: {
    loggedOut: {
      on: {
        LOGGED_IN: 'loggedIn'
      }
    },
    loggedIn: {
      on: {
        SIGNED_OUT: {
          actions: (ctx, event) => event.payload,
          target: 'loggedOut'
        }
      }
    }
  }
});

const Project = () => {
  const [state, send] = useMachine(authMachine);

  useEffect(() => {
    authState(app.auth()).subscribe(user => send('LOGGED_IN'));
  }, []);
  return (
    <article>
      <Static />

      {state.matches('loggedIn') ? (
        <>
          <button
            onClick={() =>
              send({ type: 'SIGNED_OUT', payload: app.auth().signOut() })
            }
          >
            Logout
          </button>
          <Chat />
          <Votes />
          <Tasks />
          <Stats />
        </>
      ) : (
        <button onClick={() => app.auth().signInWithPopup(googleAuthProvider)}>
          Signup/Login
        </button>
      )}
    </article>
  );
};

export default Project;
