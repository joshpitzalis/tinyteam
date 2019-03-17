import React from 'react';
import { firestore } from '../../utils/firebase';
import { EditableToDoItem } from './components/EditableToDoItem';

export const ListCreator = ({ dispatch, providedTitle = '' }) => {
  const [title, setTitle] = React.useState('');
  const [value, setValue] = React.useState('');
  const [tasks, setTasks] = React.useState([]);

  const createList = async () => {
    try {
      const list = await firestore.collection(`todoLists`).doc();

      await firestore.doc(`todoLists/${list.id}`).set({
        title: title || providedTitle,
        id: list.id,
        createdOn: +new Date(),
      });

      for (const task of tasks) {
        const newTask = await firestore
          .collection(`todoLists/${list.id}/tasks`)
          .doc();

        await firestore
          .doc(`todoLists/${list.id}/tasks/${newTask.id}`)
          .set({ ...task, id: newTask.id });
      }
      dispatch({
        type: 'LIST_CREATED',
      });
    } catch (error) {
      console.error('Error creating a list:', error);
    }
  };

  const setItem = e => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        title: value,
        createdOn: +new Date(),
        createdBy: 'Josh',
        completed: false,
        deadline: '3 days',
      },
    ]);
    setValue('');
  };
  return (
    <section data-testid="taskListCreator">
      <h1>Create a task list here</h1>
      <div>
        <div>
          <p>{title}</p>{' '}
        </div>
        <input
          type="text"
          value={title || providedTitle}
          placeholder="List title goes here"
          className="db"
          onChange={e => setTitle(e.target.value)}
          data-testid="titleInput"
        />
      </div>
      <ul>{tasks && tasks.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
      <EditableToDoItem submit={setItem} todo={value} setTodo={setValue} />
      <button onClick={() => createList()} data-testid="submitTodoList">
        Save List
      </button>
    </section>
  );
};
