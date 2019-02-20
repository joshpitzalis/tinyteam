import React from 'react';
import { TasksContext } from '../../context/TasksContext';
export const ListCreator = ({ dispatch }) => {
  const [title, setTitle] = React.useState('');
  const [value, setValue] = React.useState('');
  const [todos, setTodo] = React.useState({});
  const { updateLists } = React.useContext(TasksContext);
  console.log('todos', todos);
  return (
    <section>
      <h1>Create a task list here</h1>
      <div>
        <p>{title}</p>
        <input
          type="text"
          value={title}
          placeholder="List title goes here"
          className="db"
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <ul>
        {Object.values(todos).map(todo => (
          <li>{todo.title}</li>
        ))}
      </ul>

      <form
        onSubmit={e => {
          e.preventDefault();
          const id = +new Date();
          const newTodos = { ...todos };
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
        />
        <input type="submit" value="add todo" />
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
      >
        Save List
      </button>
    </section>
  );
};
