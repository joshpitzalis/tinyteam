import { auth, initializeApp } from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCvGFg3NatUJ_jALDTx_WsalhxgXsLtj9o',
  authDomain: 'tinyteams-dev.firebaseapp.com',
  databaseURL: 'https://tinyteams-dev.firebaseio.com',
  projectId: 'tinyteams-dev',
  storageBucket: 'tinyteams-dev.appspot.com',
  messagingSenderId: '459672893871'
};


export const app = initializeApp(config);

export const googleAuthProvider = new auth.GoogleAuthProvider();
