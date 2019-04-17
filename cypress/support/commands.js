// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { attachCustomCommands } from 'cypress-firebase';
import 'cypress-testing-library/add-commands';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const projectId = 'tinyteams-dev';
const env = Cypress.env('env') || 'stage';
const apiKey = 'AIzaSyCvGFg3NatUJ_jALDTx_WsalhxgXsLtj9o';

const fbConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`,
};

// upload file helper
Cypress.Commands.add('upload_file', (fileName, selector) =>
  cy.get(selector).then(subject =>
    cy
      .fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        if (blob) {
          const el = subject[0];
          const testFile = new File([blob], fileName, {
            type: 'image/png',
            // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
          return subject;
        }
      })
  )
);

// UTILS
function hexStringToByte(str) {
  if (!str) {
    return new Uint8Array();
  }

  const a = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}

// Attach authed instance to window (so it can be picked up within the React App)
window.fbInstance = firebase.initializeApp(fbConfig);

// add cy.login, cy.logout, cy.callRtdb, and cy.callFirestore custom commands
attachCustomCommands({ Cypress, cy, firebase });
