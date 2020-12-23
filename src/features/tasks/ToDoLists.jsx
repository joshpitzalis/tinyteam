/* eslint-disable */
import React from 'react';
import { useFireColl } from '../../hooks/firebase';
import { firestore } from '../../utils/firebase';

export const ToDoLists = ({ lists, dispatch }) =>
  lists &&
  lists.map((list, index) => (
    <List
      key={list.id}
      index={index}
      dispatch={dispatch}
      id={list.id}
      title={list.title}
    />
  ));

export const List = ({ dispatch, id, title, index, tasks }) => {
  if (!tasks) {
    tasks = useFireColl(`todoLists/${id}/tasks`);
  }

  const completedTasks = tasks.filter((item) => item.completed).length;
  const totalTasks = tasks.length;

  return (
    <button
      className="flex-col p-2 shadow-md rounded-lg w-52 h-72 text-left mt-10 overflow-hidden"
      type="button"
      onClick={() =>
        dispatch({
          type: 'OPENED_TASK_LIST_EDITOR',
          payload: id,
        })
      }
      onKeyPress={() =>
        dispatch({
          type: 'OPENED_TASK_LIST_EDITOR',
          payload: id,
        })
      }
      data-testid="editTaskList"
    >
      <small className="font-thin block text-xs" data-testid="taskListCounter">
        {completedTasks}/{totalTasks} Complete
      </small>
      <p className="block pl-0 ml-0 bold text-xl  mb-4">{title}</p>
      <ul key={id} className="pl-0 ml-0  w-100">
        {tasks &&
          tasks.map(
            (task, count) =>
              count < 4 && (
                <ToDoItem index={index} task={task} key={task.id} listId={id} />
              )
          )}
      </ul>
    </button>
  );
};

export const ToDoItem = ({ task, listId, index }) => {
  const markTodoCompleted = async (id, completed) => {
    await firestore
      .doc(`todoLists/${listId}/tasks/${id}`)
      .update({ completed })
      .catch((error) => console.error('Error marking todo complete:', error));
  };
  return (
    <li className="break-words">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => markTodoCompleted(task.id, !task.completed)}
      />{' '}
      {task.title}
    </li>
  );
};
