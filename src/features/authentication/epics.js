import { ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { app, googleAuthProvider } from '../../utils/firebase';
import {
  AUTH_STATUS_CHECKED,
  LOG_OUT_REQUEST,
  SIGNED_IN,
  SIGNED_OUT,
} from './constants';

const signIn = authProvider =>
  app
    .auth()
    .signInWithPopup(authProvider)
    .then(user => ({ type: 'SIGNED_IN', payload: user }));

const signout = () =>
  app
    .auth()
    .signOut()
    .then(() => ({ type: 'SIGNED_OUT' }));

export const authStream$ = () =>
  authState(app.auth()).pipe(
    mergeMap(user =>
      !user ? of({ type: SIGNED_OUT }) : of({ type: SIGNED_IN, payload: user })
    ),
    catchError(error => console.log('problems signing out'))
  );

export const signUserIn = action$ =>
  action$.pipe(
    ofType(AUTH_STATUS_CHECKED),
    switchMap(() => signIn(googleAuthProvider)),
    catchError(error => console.log('problems signing in'))
  );

export const logUserOut = action$ =>
  action$.pipe(
    ofType(LOG_OUT_REQUEST),
    switchMap(() => signout()),
    catchError(error => console.log('problems signing out'))
  );

// http://thecodebarbarian.com/a-beginners-guide-to-redux-observable

// const countEpic = action$ => action$.pipe(
//   filter(action => action.type === 'CLICK_INCREMENT'),
//   // `mergeMap()` supports functions that return promises, as well as observables
//   mergeMap(async (action) => {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return { type: 'INCREMENT', amount: 1 };
//   })
// );
