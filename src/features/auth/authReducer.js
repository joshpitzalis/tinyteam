import produce from 'immer';

export const MY_PROJECTS_RECIEVED = 'MY_PROJECTS_RECIEVED';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGNED_OUT = 'SIGNED_OUT';
export const AUTH_STATUS_CHECKED = 'AUTH_STATUS_CHECKED';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';

export const signedIn = user => ({ type: SIGNED_IN, payload: user });

export const setMyProjects = payload => ({
  type: MY_PROJECTS_RECIEVED,
  payload,
});

export const authReducer = produce(
  (draft, action) => {
    if (action.type === SIGNED_IN) {
      draft.status = true;
      draft.user = action.payload;
    }

    if (action.type === SIGNED_OUT) {
      draft.status = false;
      draft.user = null;
    }

    if (action.type === MY_PROJECTS_RECIEVED) {
      draft.projects = action.payload;
      draft.loading = false;
      if (action.payload.length === 0) {
        draft.noProjects = true;
      }
    }
  },
  {
    status: false,
    user: null,
    projects: [],

    noProjects: false,
  }
);
