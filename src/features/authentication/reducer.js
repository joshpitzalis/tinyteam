import produce from 'immer';
import { SIGNED_IN, SIGNED_OUT } from './constants';

const MY_PROJECTS_RECIEVED = 'MY_PROJECTS_RECIEVED';

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
      draft.projects.push(action.payload);
    }
  },
  { status: false, user: null, projects: [] }
);
