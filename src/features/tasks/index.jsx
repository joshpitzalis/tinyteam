import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../../components/ModuleHeader';
import { TasksContext } from '../../context/TasksContext';
import { Dialogue } from './Dialogue';
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
    case 'LIST_CREATED':
      return { ...state, modalVisible: false };
    case 'OPENED_TASK_LIST_EDITOR':
      return { ...state, modalVisible: true, id: action.payload };
    default:
      throw new Error('You have probably mispelt an action name');
  }
};

const initialState = {
  modalVisible: false,
};

const Tasks = ({ count }) => {
  const [state, dispatch] = React.useReducer(taskReducer, initialState);
  const { lists } = React.useContext(TasksContext);
  return (
    <div className="mw9 center pa3 pa5-ns ">
      <Header
        dispatch={dispatch}
        type="OPENED_TASK_LIST_CREATOR"
        sectionTitle="Tasks"
      />
      <section className="flex">
        <p>{count} yolo</p>
        <ToDoLists lists={lists} dispatch={dispatch} />
        <Dialogue
          modalVisible={state.modalVisible}
          id={state.id}
          dispatch={dispatch}
          listId={state.id}
        />
      </section>
    </div>
  );
};

const select = store => ({
  count: store.tasks.count,
});

export default connect(select)(Tasks);
