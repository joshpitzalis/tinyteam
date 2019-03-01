import React from 'react';
import { Machine } from 'xstate';
import { useMachine } from '../../hooks/useMachine';
import { firestore } from '../../utils/firebase';

export const todoMachine = Machine({
  id: 'todo',
  initial: 'idle',
  states: {
    idle: {
      on: {
        TODO_COMPLETED: 'completed'
      }
    },
    completed: {}
  }
});

export const ToDoItem = ({ lastTask, task, listId }) => {
  const [state, send] = useMachine(todoMachine);
  const markTodoCompleted = async (id, completed) => {
    await firestore
      .doc(`todoLists/${listId}/tasks/${id}`)
      .update({ completed });
  };
  return (
    <li className={`ph3 pv2 ${!lastTask && 'bb b--light-silver'}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          markTodoCompleted('klCS69LbBHIfKduVRn3T', !task.completed)
        }
      />{' '}
      {task.title}
    </li>
  );
};
