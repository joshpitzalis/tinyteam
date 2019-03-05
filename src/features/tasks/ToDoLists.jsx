import React from 'react';
import { useFireColl } from '../../hooks/firebase';
import { ToDoItem } from './ToDoItem';

export const ToDoLists = ({ lists, dispatch }) => {
  return (
    <div className="dib ma3 flex col">
      {lists &&
        lists.map((list, index) => (
          <List
            key={list.id}
            index={index}
            dispatch={dispatch}
            id={list.id}
            title={list.title}
          />
        ))}
    </div>
  );
};

export const List = ({ dispatch, id, title, index }) => {
  const tasks = useFireColl(`todoLists/${id}/tasks`);
  return (
    <div className={`dib pa3`} style={{ color: `${index === 0 && '#c8494d'}` }}>
      <div>
        <h1
          className="f4 bold  dib"
          style={{ color: `${index === 0 && '#c8494d'}` }}
        >
          {title}
        </h1>
        <small
          onClick={() =>
            dispatch({
              type: 'OPENED_TASK_LIST_EDITOR',
              payload: id
            })
          }
          data-testid="editTaskList"
          className="pl3 dib"
        >
          Edit
        </small>
      </div>
      <ul
        className="list pl0 ml0 center mw5 ba br3"
        key={id}
        style={{ borderColor: `${index === 0 && '#c8494d'}` }}
      >
        {tasks &&
          tasks.map((task, indexx, array) => {
            const lastTask = indexx + 1 === array.length;
            return (
              <ToDoItem
                index={index}
                task={task}
                lastTask={lastTask}
                key={task.id}
                listId={id}
              />
            );
          })}
      </ul>
    </div>
  );
};
