import { Box } from 'grommet';
import React from 'react';
import { useFireColl } from '../../hooks/firebase';
import { ToDoItem } from './ToDoItem';

export const ToDoLists = ({ lists, dispatch }) => (
  <Box direction="row" wrap justify="between">
    {lists &&
      lists.map((list, index) => (
        <List
          key={list.id}
          index={index}
          dispatch={dispatch}
          id={list.id}
          title={list.title}
          color={list.colour}
        />
      ))}
  </Box>
);

export const List = ({ dispatch, id, title, index, color }) => {
  const tasks = useFireColl(`todoLists/${id}/tasks`);
  return (
    <div className="dib ma1" style={{ color }}>
      <div>
        <h1 className="f4 bold  dib" style={{ color }}>
          {title}
        </h1>
      </div>
      <ul
        className="list pl0 ml0 center mw5 ba br3"
        key={id}
        style={{ borderColor: color }}
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
                color={color}
              />
            );
          })}
      </ul>
      <small
        onClick={() =>
          dispatch({
            type: 'OPENED_TASK_LIST_EDITOR',
            payload: id,
          })
        }
        data-testid="editTaskList"
        className="pr3 dib pointer"
      >
        Edit
      </small>
    </div>
  );
};
