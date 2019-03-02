import React from 'react';
import { actions } from 'xstate';
import { useFireColl, useFireDoc } from '../../hooks/firebase';
import { firestore } from '../../utils/firebase';
const { assign } = actions;

export const ListEditor = ({ dispatch, listId }) => {
  const tasks = useFireColl(`todoLists/${listId}/tasks`);
  const list = useFireDoc(`todoLists/${listId}`);

  const [title, setTitle] = React.useState('');
  const [todo, setTodo] = React.useState('');

  const createTodo = async (todo, listId) => {
    const newTask = await firestore
      .collection(`todoLists/${listId}/tasks`)
      .doc();

    await firestore.doc(`todoLists/${listId}/tasks/${newTask.id}`).set({
      title: todo,
      id: newTask.id,
      completed: false,
      createdOn: +new Date()
    });
  };

  return (
    <section data-testid="taskListEditor">
      <h1>Create a task list here</h1>
      <div>
        <div>
          <p data-testid="title">{list.title}</p>{' '}
        </div>
        <input
          type="text"
          value={title || list.title}
          placeholder="List title goes here"
          className="db"
          onChange={e => setTitle(e.target.value)}
          data-testid="titleInput"
        />
        <button
          onClick={() =>
            firestore.doc(`todoLists/${listId}`).update({
              title: title || list.title
            })
          }
          data-testid="submitTodoList"
        >
          Save List
        </button>
      </div>
      <ul>
        {tasks.map(todo => (
          <Todo key={todo.id} todo={todo} id={todo.id} listId={listId} />
        ))}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault();
          createTodo(todo, listId);
        }}
      >
        <input
          type="text"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          data-testid="taskInput"
        />
        <input type="submit" value="add todo" data-testid="addToDo" />
      </form>
      <small
        className="red pt3"
        onClick={() => {
          dispatch({ type: 'EDITOR_MODAL_CLOSED' });
          firestore.doc(`todoLists/${listId}`).delete();
        }}
      >
        Delete Entire List
      </small>{' '}
    </section>
  );
};

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
              completed: !todo.completed
            })
          }
        />
        <label>{todo.title}</label>{' '}
        <button
          onClick={() =>
            firestore.doc(`todoLists/${listId}/tasks/${id}`).update({
              title: title || todo.title
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
