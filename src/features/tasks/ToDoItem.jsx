import { CheckBox } from 'grommet';
import React from 'react';
import { firestore } from '../../utils/firebase';

export const ToDoItem = ({ lastTask, task, listId, index, color }) => {
  const markTodoCompleted = async (id, completed) => {
    try {
      await firestore
        .doc(`todoLists/${listId}/tasks/${id}`)
        .update({ completed });
    } catch (error) {
      console.error('Error marking todo complete:', error);
    }
  };
  return (
    <li
      className={`ph3 pv2 truncate ${!lastTask && 'bb '}`}
      style={{ borderColor: color }}
    >
      {/* <input
        type="checkbox"
        checked={task.completed}
        onChange={() => markTodoCompleted(task.id, !task.completed)}
      />{' '}
      {task.title} */}
      <CheckBox
        truncate
        label={task.title}
        checked={task.completed}
        onChange={() => markTodoCompleted(task.id, !task.completed)}
      />
    </li>
  );
};
