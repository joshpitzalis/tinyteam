import produce from 'immer';
import { FETCH_FULFILLED } from './constants';

export const taskReducer = produce(
  (draft, action) => {
    if (action.type === FETCH_FULFILLED) {
      draft.data = action.payload;
      draft.loading = false;
    }
  },
  { data: [], loading: true }
);
