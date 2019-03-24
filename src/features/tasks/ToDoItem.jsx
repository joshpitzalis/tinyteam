import { CheckBox } from 'grommet';
import React from 'react';
import { firestore } from '../../utils/firebase';

export const ToDoItem = ({ lastTask, task, listId, color }) => {
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
      className={`ph3 pv2 ${!lastTask && 'bb '} flex items-center`}
      style={{ borderColor: color }}
    >
      <CheckBox
        checked={task.completed}
        onChange={() => markTodoCompleted(task.id, !task.completed)}
        label={<p>{task.title}</p>}
      />
    </li>
  );
};
