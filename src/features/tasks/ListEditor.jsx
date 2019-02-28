import React from 'react';
import { actions, Machine } from 'xstate';
import { TasksContext } from '../../context/TasksContext';
import { useMachine } from '../../hooks/useMachine';

const { assign } = actions;

export const todosMachine = Machine({
  id: 'todos',
  context: {},
  initial: 'all',
  states: {
    all: {},
    active: {},
    completed: {}
  },
  on: {
    TODO_DELETED: {
      actions: ['deleted']
    },
    TODO_CHANGED: {
      actions: ['handleTodoChange']
    },
    TITLE_CHANGED: {
      actions: ['handleTitleChange']
    },
    NEW_TASK_CHANGED: {
      actions: ['handleNewTaskChange']
    },
    TODO_CREATED: {
      actions: ['handleNewTaskSubmit']
    }
  }
});

export const ListEditor = ({ dispatch, list }) => {
  const { updateLists } = React.useContext(TasksContext);
  const [state, send] = useMachine(
    todosMachine.withConfig(
      {
        actions: {
          handleTitleChange: assign({
            title: (ctx, e) => e.payload
          }),
          deleted: assign({
            todos: (ctx, e) => {
              return ctx.todos.filter(todo => todo.id !== e.id);
            }
          }),
          handleTodoChange: assign({
            todos: (ctx, e) =>
              ctx.todos.map(todo =>
                todo.id === e.payload.id
                  ? {
                      title: e.payload.title,
                      id: todo.id,
                      createdBy: todo.createdBy,
                      completed: todo.completed,
                      deadline: todo.deadline
                    }
                  : todo
              )
          }),
          handleNewTaskChange: assign({
            todo: (ctx, e) => e.payload
          }),
          handleNewTaskSubmit: assign({
            todos: (ctx, e) =>
              ctx.todos.concat({
                title: ctx.todo,
                id: +new Date(),
                createdBy: 'Josh',
                completed: false,
                deadline: '3 days'
              }),
            todo: ''
          })
        }
      },
      {
        title: list.title,
        todo: '',
        todos: Object.values(list.tasks)
      }
    )
  );

  return (
    <section data-testid="taskListEditor">
      <h1>Create a task list here</h1>
      <div>
        <div>
          <p data-testid="title">{state.context.title}</p>{' '}
        </div>
        <input
          type="text"
          value={state.context.title}
          placeholder="List title goes here"
          className="db"
          onChange={e =>
            send({ type: 'TITLE_CHANGED', payload: e.target.value })
          }
          data-testid="titleInput"
        />
      </div>
      <ul>
        {state.context.todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onChange={payload =>
              send({
                type: 'TODO_CHANGED',
                payload
              })
            }
            onDelete={id => send({ type: 'TODO_DELETED', id })}
          />
        ))}
      </ul>

      <form
        onSubmit={e => {
          e.preventDefault();
          send({
            type: 'TODO_CREATED'
          });
        }}
      >
        <input
          type="text"
          value={state.context.todo}
          onChange={e =>
            send({
              type: 'NEW_TASK_CHANGED',
              payload: e.target.value
            })
          }
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
                title: state.context.title,
                id: list.id,
                tasks: state.context.todos,
                createdOn: list.createdOn
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

export const Todo = ({ todo, onChange, onDelete }) => {
  return (
    <li key={todo.id}>
      <div>
        <input
          type="checkbox"
          value={todo.completed}
          defaultChecked={todo.completed}
        />
        <label>{todo.title}</label>{' '}
        <button onClick={() => onDelete(todo.id)}>Destroy</button>
      </div>
      <input
        value={todo.title}
        onChange={e => onChange({ id: todo.id, title: e.target.value })}
      />
    </li>
  );
};
