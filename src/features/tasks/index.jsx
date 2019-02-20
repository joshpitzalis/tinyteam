import React from 'react';
import { TasksContext } from '../../context/TasksContext';
import Modal from '../modals/Modal';
import { ListCreator } from './ListCreator';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'OPENED_TASK_LIST_CREATOR':
      return { ...state, modalVisible: true };
    case 'MODAL_CLOSED':
      return { ...state, modalVisible: false };
    case 'LIST_UPDATED':
      action.payload.updateLists(action.payload.list);
      return { ...state, modalVisible: false };
    default:
      throw new Error('You have probably mispelt an action name');
  }
};

const Tasks = () => {
  const [state, dispatch] = React.useReducer(taskReducer, {
    modalVisible: false
  });

  const { lists } = React.useContext(TasksContext);

  return (
    <section className="flex items-center mw9 center pa3 pa5-ns ">
      <ToDoLists lists={lists} />
      <button
        className="dib ml5"
        onClick={() => dispatch({ type: 'OPENED_TASK_LIST_CREATOR' })}
      >
        {' '}
        + Create New List
      </button>
      {state.modalVisible && (
        <Modal onClose={() => dispatch({ type: 'MODAL_CLOSED' })}>
          <ListCreator dispatch={dispatch} />
        </Modal>
      )}
    </section>
  );
};

export default Tasks;

const ToDoLists = ({ lists }) => {
  return (
    <div className="dib ma3 ">
      {Object.values(lists).map(list => (
        <div className="dib pa3">
          <h1 className="f4 bold center w5">{list.title}</h1>
          <ul
            className="list pl0 ml0 center mw5 ba b--light-silver br3"
            key={list.id}
          >
            {Object.values(list.tasks).map((task, index, array) => {
              const lastTask = index + 1 === array.length;
              return (
                <li className={`ph3 pv2 ${!lastTask && 'bb b--light-silver'}`}>
                  <input type="checkbox" checked={task.completed} />{' '}
                  {task.title}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
