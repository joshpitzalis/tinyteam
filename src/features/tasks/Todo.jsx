import React from 'react';
import { firestore } from '../../utils/firebase';

export const Todo = ({ todo, id, listId }) => {
  const [title, setTitle] = React.useState('');
  return (
    <li key={todo.id}>
      <div>
        <input
          type="checkbox"
          value={todo.completed}
          onChange={() =>
            firestore.doc(`todoLists/${listId}/tasks/${id}`).update({
              completed: !todo.completed,
            })
          }
        />
        <label>{todo.title}</label>{' '}
        <button
          onClick={() =>
            firestore.doc(`todoLists/${listId}/tasks/${id}`).update({
              title: title || todo.title,
            })
          }
        >
          Update
        </button>
        <button
          onClick={() =>
            firestore.doc(`todoLists/${listId}/tasks/${id}`).delete()
          }
        >
          Destroy
        </button>
      </div>
      <input value={title} onChange={e => setTitle(e.target.value)} />
    </li>
  );
};
