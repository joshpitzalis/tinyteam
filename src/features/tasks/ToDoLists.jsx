import React from 'react';
import { collection } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { firestore } from '../../utils/firebase';
import { ToDoItem } from './ToDoItem';

export const ToDoLists = ({ lists, dispatch }) => {
  return (
    <div className="dib ma3">
      {lists &&
        lists.map(list => (
          <List
            key={list.id}
            dispatch={dispatch}
            id={list.id}
            title={list.title}
          />
        ))}
    </div>
  );
};

export const List = ({ dispatch, id, title }) => {
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const tasks$ = collection(firestore.collection(`todoLists/${id}/tasks`))
      .pipe(map(docs => docs.map(doc => doc.data())))
      .subscribe(tasks => setTasks(tasks));
    return () => {
      tasks$.unsubscribe();
    };
  }, []);
  return (
    <div className="dib pa3">
      <div className="flex justify-between">
        <h1 className="f4 bold center w5">{title}</h1>
        <small
          onClick={() =>
            dispatch({
              type: 'OPENED_TASK_LIST_EDITOR',
              payload: id
            })
          }
          data-testid="editTaskList"
        >
          Edit
        </small>
      </div>
      <ul className="list pl0 ml0 center mw5 ba b--light-silver br3" key={id}>
        {tasks &&
          tasks.map((task, index, array) => {
            const lastTask = index + 1 === array.length;
            return (
              <ToDoItem task={task} lastTask={lastTask} key={id} listId={id} />
            );
          })}
      </ul>
    </div>
  );
};
