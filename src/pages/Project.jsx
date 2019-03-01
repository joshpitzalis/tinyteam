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
  initial: 'loggedIn',
  states: {
    idle: {
      on: {
        LOGGED_IN: 'loggedIn',
        LOGGED_OUT: 'loggedOut'
      }
    },
    loggedOut: {
      on: {
        LOGGED_IN: 'loggedIn'
      }
    },
    loggedIn: {
      on: {
        LOGGED_OUT: {
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
    const auth$ = authState(app.auth()).subscribe(user =>
      user ? send('LOGGED_IN') : send('LOGGED_OUT')
    );
    return () => {
      auth$.unsubscribe();
    };
  }, []);
  return (
    <article>
      <Static />
      {state.matches('loggedIn') ? (
        <>
          <div className="tc">
            <button
              onClick={() =>
                send({ type: 'SIGNED_OUT', payload: app.auth().signOut() })
              }
            >
              Logout
            </button>
          </div>
          <Chat />
          <Votes />
          <Tasks />
          <Stats />
        </>
      ) : (
        <div className="tc">
          <button
            onClick={() => app.auth().signInWithPopup(googleAuthProvider)}
          >
            Signup/Login
          </button>
        </div>
      )}
    </article>
  );
};

export default Project;
