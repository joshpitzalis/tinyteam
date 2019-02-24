import React from 'react';
export const ToDoLists = ({ lists, dispatch }) => {
  return (
    <div className="dib ma3">
      {lists &&
        Object.values(lists).map(list => (
          <div className="dib pa3" key={list.id}>
            <div className="flex justify-between">
              <h1 className="f4 bold center w5">{list.title}</h1>
              <small
                onClick={() =>
                  dispatch({
                    type: 'OPENED_TASK_LIST_EDITOR',
                    payload: list.id
                  })
                }
                data-testid="editTaskList"
              >
                Edit
              </small>
            </div>
            <ul
              className="list pl0 ml0 center mw5 ba b--light-silver br3"
              key={list.id}
            >
              {Object.values(list.tasks).map((task, index, array) => {
                const lastTask = index + 1 === array.length;
                return (
                  <ToDoItem task={task} lastTask={lastTask} key={task.id} />
                );
              })}
            </ul>
          </div>
        ))}
    </div>
  );
};

const ToDoItem = ({ lastTask, task }) => {
  return (
    <li className={`ph3 pv2 ${!lastTask && 'bb b--light-silver'}`}>
      <input type="checkbox" checked={task.completed} onChange={() => {}} />{' '}
      {task.title}
    </li>
  );
};
