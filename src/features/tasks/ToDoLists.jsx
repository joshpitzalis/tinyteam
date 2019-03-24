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

  const moreThan5ArchivedTasks =  tasks
  .filter(item => item.completed === false).length > 5

const first5ActiveTasks = tasks
.filter(item => item.completed === false).slice(0, 5)
const activeTasks = tasks.filter(item => item.completed === false)

const archivedTasks = tasks.filter(item => item.completed === true)
  const [archived, setArchived] = React.useState(true);
  const [full, setFull] = React.useState(tasks && moreThan5ArchivedTasks);

  return (
    <div className="dib ma1 w5" style={{ color }}>
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
        {!full ? (
          <span onMouseLeave={() => setArchived(true)}>
            {tasks && first5ActiveTasks.map((task, indexx, array) => {
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
            {tasks && activeTasks.length > 5 ? (
              <div className="tc ">
                <small className="pointer pv3" onClick={() => setFull(true)}>
                  {'Show More Tasks..'}
                </small>
              </div>
            ) :
            archivedTasks.length > 0 && (
              <div className="tc ">
                <small
                  className="pointer pv3"
                  onClick={() => {
                    archived ? setArchived(false) : setArchived(true);
                  }}
                >
                  {archived ? 'Show Archived Tasks' : 'Hide Archived Tasks'}
                </small>
              </div>
            )}
            {!archived &&
              tasks &&
              archivedTasks
                .map((task, indexx, array) => {
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
            
          </span>
        ) : (
          <span onMouseLeave={() => setFull(false)}>
            {tasks &&
              activeTasks
                .map((task, indexx, array) => {
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
            {tasks && archivedTasks.length > 0 && (
              <div className="tc ">
                <small
                  className="pointer pv3"
                  onClick={() => {
                    archived ? setArchived(false) : setArchived(true);
                  }}
                >
                  {archived ? 'Show Archived Tasks' : 'Hide Archived Tasks'}
                </small>
              </div>
            )}
            {!archived &&
              tasks &&
              archivedTasks
                .map((task, indexx, array) => {
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
          </span>
        )}
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
