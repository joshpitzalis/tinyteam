import React from 'react';
import { TasksContext } from '../../context/TasksContext';
import Modal from '../modals/Modal';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'OPENED_TASK_LIST_CREATOR':
      return { ...state, modalVisible: true };
    case 'MODAL_CLOSED':
      return { ...state, modalVisible: false };
    default:
      throw new Error('You have probably mispelt an action name');
  }
};

const Tasks = () => {
  const [state, dispatch] = React.useReducer(taskReducer, {
    modalVisible: false
  });

  const { tasks, createTask } = React.useContext(TasksContext);

  return (
    <section className="flex items-center mw9 center pa3 pa5-ns ">
      <div className="dib">
        <h1 className="f4 bold center w5">Thing List</h1>
        <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
          {tasks &&
            Object.values(tasks).map((task, index, array) => {
              const lastTask = index + 1 === array.length;
              return (
                <li className={`ph3 pv2 ${lastTask && 'bb b--light-silver'}`}>
                  <input type="checkbox" checked={task.completed} />{' '}
                  {task.title}
                </li>
              );
            })}
        </ul>
      </div>
      <button
        className="dib ml5"
        onClick={() => dispatch({ type: 'OPENED_TASK_LIST_CREATOR' })}
      >
        {' '}
        + Create New List
      </button>
      {state.modalVisible && (
        <Modal onClose={() => dispatch({ type: 'MODAL_CLOSED' })}>
          <ListCreator />
        </Modal>
      )}
    </section>
  );
};

export default Tasks;

const ListCreator = () => {
  return <div>Create a task list here</div>;
};
