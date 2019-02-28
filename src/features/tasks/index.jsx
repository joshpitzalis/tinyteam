import React from 'react';
import { assign, Machine } from 'xstate';
import { TasksContext } from '../../context/TasksContext';
import { useMachine } from '../../hooks/useMachine';
import Modal from '../modals/Modal';
import { ListCreator } from './ListCreator';
import { ListEditor } from './ListEditor';
import { ToDoLists } from './ToDoLists';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'OPENED_TASK_LIST_CREATOR':
      return { ...state, modalVisible: true };
    case 'MODAL_CLOSED':
      return { ...state, modalVisible: false };
    case 'EDITOR_MODAL_CLOSED':
      return { ...state, modalVisible: false, id: null };
    case 'LIST_UPDATED':
      action.payload.updateLists(action.payload.list);
      return { ...state, modalVisible: false };
    case 'OPENED_TASK_LIST_EDITOR':
      return { ...state, modalVisible: true, id: action.payload };
    default:
      throw new Error('You have probably mispelt an action name');
  }
};

export const todoMachine = Machine({
  id: 'todo',
  initial: 'idle',
  context: { modalVisible: false },
  states: {
    idle: {
      on: {
        OPENED_TASK_LIST_CREATOR: {
          actions: assign({
            modalVisible: true
          })
        }
      }
    }
  }
});

const Tasks = () => {
  const [state, dispatch] = React.useReducer(taskReducer, {
    modalVisible: false
  });

  const { lists } = React.useContext(TasksContext);
  const [xstate, send] = useMachine(todoMachine);
  console.log('xstate', xstate.context);
  return (
    <section className="flex items-center mw9 center pa3 pa5-ns ">
      <ToDoLists lists={lists} dispatch={dispatch} />
      <button
        className="dib ml5"
        onClick={() => send({ type: 'OPENED_TASK_LIST_CREATOR' })}
        data-testid="createTask"
      >
        + Create New List
      </button>
      <Dialogue
        modalVisible={state.modalVisible}
        id={state.id}
        dispatch={dispatch}
        list={lists[state.id]}
      />
    </section>
  );
};

export default Tasks;

const Dialogue = ({ modalVisible, id, dispatch, list }) => {
  return (
    modalVisible && (
      <Modal
        onClose={() =>
          id
            ? dispatch({ type: 'EDITOR_MODAL_CLOSED' })
            : dispatch({ type: 'MODAL_CLOSED' })
        }
      >
        {id ? (
          <ListEditor dispatch={dispatch} list={list} />
        ) : (
          <ListCreator dispatch={dispatch} />
        )}
      </Modal>
    )
  );
};
