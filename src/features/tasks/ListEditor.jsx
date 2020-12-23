/* eslint-disable */
import React from 'react';
import { actions } from 'xstate';
import { useFireColl, useFireDoc } from '../../hooks/firebase';
import { firestore } from '../../utils/firebase';
import { EditableToDoItem } from './components/EditableToDoItem';
import {Hill} from '../hill'

const { assign } = actions;

export const ListEditor = ({ dispatch, listId }) => {
  const tasks = useFireColl(`todoLists/${listId}/tasks`);
  const list = useFireDoc(`todoLists/${listId}`);

  const [title, setTitle] = React.useState('');
  const [todo, setTodo] = React.useState('');

  const createTodo = (todo, listId) => async (e) => {
    e.preventDefault();
    const newTask = await firestore
      .collection(`todoLists/${listId}/tasks`)
      .doc()
      .catch((error) => console.error('Error creating todo:', error));

    await firestore
      .doc(`todoLists/${listId}/tasks/${newTask.id}`)
      .set({
        title: todo,
        id: newTask.id,
        completed: false,
        createdOn: +new Date(),
      })
      .catch((error) => console.error('Error creating todo:', error));
    setTodo('');
  };

  const handleDelete = (listId) => firestore.doc(`todoLists/${listId}`).delete();

  return (
    <TaskPage   tasks={tasks} list={list} dispatch={dispatch} title={title}  setTitle={setTitle} todo={todo} listId={listId} createTodo={createTodo} setTodo={setTodo}  />
  );
};

export const TaskPage = ({tasks, list, dispatch, title,  setTitle, todo, listId, createTodo, setTodo, handleDelete}) => {
      return (
      <section data-testid="taskListEditor" className='h-full'>
        <div className='mt-7'> <button className='inline ml-16'>Update</button>
        <small className='inline ml-64'>Last updated 13 hours ago</small>
        </div>
        <div className='w-min center'>
        <Hill width={760} height={250} ></Hill>
        </div>
      


   <div className='w-2/3 center'>
        <h1 data-testid="title" className='text-3xl mt-14 font-bold'>{list.title}</h1>
   
       <div className='m-3'></div>
     
      <ul>
        {tasks.map(todo => <Todo key={todo.id} todo={todo} id={todo.id} listId={listId} />)}
      </ul>
    
      </div>

      <small className="red pt3 text-center w-full" onClick={() => {
    dispatch({
      type: 'EDITOR_MODAL_CLOSED'
    });
    handleDelete(listId)
   
  }}>
        Delete Entire List
      </small>


    </section>);
    }
  


export const Todo = ({ todo, id, listId }) => {
  const [title, setTitle] = React.useState('');
  return (
    <li key={todo.id}>
      <div>
        <input
          type="checkbox"
          value={todo.completed}
          onChange={() =>
            firestore.doc(`todoLists/${listId}/tasks/${id}`).update({
              completed: !todo.completed,
            })
          }
        />
        <label className='pl-3'>{todo.title}</label>
        <button
          onClick={() =>
            firestore.doc(`todoLists/${listId}/tasks/${id}`).update({
              title: title || todo.title,
            })
          }
        >
          Update
        </button>
        <button
          onClick={() =>
            firestore.doc(`todoLists/${listId}/tasks/${id}`).delete()
          }
        >
          Destroy
        </button>
      </div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
    </li>
  );
};