import React from 'react';
import { firestore } from '../../utils/firebase';

export const ToDoItem = ({ lastTask, task, listId, index }) => {
  const markTodoCompleted = async (id, completed) => {
    await firestore
      .doc(`todoLists/${listId}/tasks/${id}`)
      .update({ completed })
      .catch(error => console.error('Error marking todo complete:', error));
  };
  return (
    <li
      className={`ph3 pv2 truncate ${!lastTask && 'bb '}`}
      style={{ borderColor: `${index === 0 ? '#c8494d' : 'b--light-silver'}` }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => markTodoCompleted(task.id, !task.completed)}
      />{' '}
      {task.title}
    </li>
  );
};
