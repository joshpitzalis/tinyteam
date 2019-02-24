import React from 'react';
import { TasksContext } from '../../context/TasksContext';
export const ListEditor = ({ dispatch, list }) => {
  const [title, setTitle] = React.useState('');
  const [value, setValue] = React.useState('');
  const [todos, setTodo] = React.useState({});
  const { updateLists } = React.useContext(TasksContext);

  return (
    <section data-testid="taskListEditor">
      <h1>Create a task list here</h1>
      <div>
        <div>
          <p data-testid="title">{title || list.title}</p>{' '}
        </div>
        <input
          type="text"
          value={title || list.title}
          placeholder="List title goes here"
          className="db"
          onChange={e => setTitle(e.target.value)}
          data-testid="titleInput"
        />
      </div>
      <ul>
        {Object.values(list.tasks).map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <form
        onSubmit={e => {
          e.preventDefault();
          const id = +new Date();
          const newTodos = { ...list.todos };
          newTodos[id] = {
            title: value,
            id,
            createdBy: 'Josh',
            completed: false,
            deadline: '3 days'
          };
          setTodo(newTodos);
          setValue('');
        }}
      >
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          data-testid="taskInput"
        />
        <input type="submit" value="add todo" data-testid="addToDo" />
      </form>

      <button
        onClick={() =>
          dispatch({
            type: 'LIST_UPDATED',
            payload: {
              updateLists,
              list: {
                title,
                id: +new Date(),
                tasks: todos,
                createdOn: +new Date()
              }
            }
          })
        }
        data-testid="submitTodoList"
      >
        Save List
      </button>
    </section>
  );
};
