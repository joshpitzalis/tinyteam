import { ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { collection } from 'rxfire/firestore';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  flatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { app, firestore, googleAuthProvider } from '../../utils/firebase';
import {
  AUTH_STATUS_CHECKED,
  LOG_OUT_REQUEST,
  SIGNED_IN,
  SIGNED_OUT,
} from './constants';
import { setMyProjects } from './reducer';

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

export const myProjects$ = () =>
  authState(app.auth()).pipe(
    switchMap(user =>
      collection(firestore.collection('teams')).pipe(
        flatMap(docs => docs.map(doc => doc.data())),
        filter(data => data.members.includes(user.uid)),
        map(data => setMyProjects(data))
      )
    ),
    catchError(error => console.log('problems getting your project', error))
  );
