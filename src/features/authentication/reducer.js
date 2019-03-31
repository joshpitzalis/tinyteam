import produce from 'immer';
import { SIGNED_IN, SIGNED_OUT } from './constants';

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
  },
  { status: false, user: null }
);
