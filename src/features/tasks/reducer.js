import produce from 'immer';

export const taskReducer = produce(
  (draft, action) => {
    if (action.type === 'SET_NAME') {
      draft.count = action.payload;
    }
  },
  { count: 5 }
);
