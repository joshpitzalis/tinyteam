import { Box, Heading, Menu } from 'grommet';
import React from 'react';
import { useFireColl, useFireDoc } from '../../hooks/firebase';
import { firestore } from '../../utils/firebase';
import { EditableToDoItem } from './components/EditableToDoItem';
import { Todo } from './Todo';

export const ListEditor = ({ dispatch, listId }) => {
  const tasks = useFireColl(`todoLists/${listId}/tasks`);
  const list = useFireDoc(`todoLists/${listId}`);
  const [backgroundColor, setBackgroundColor] = React.useState();
  const [title, setTitle] = React.useState('');
  const [todo, setTodo] = React.useState('');

  const colours = useFireDoc(`teams/devteam123test`);

  const createTodo = (todo, listId) => async e => {
    e.preventDefault();
    const newTask = await firestore
      .collection(`todoLists/${listId}/tasks`)
      .doc();

    await firestore.doc(`todoLists/${listId}/tasks/${newTask.id}`).set({
      title: todo,
      id: newTask.id,
      completed: false,
      createdOn: +new Date(),
    });

    setTodo('');
  };

  const setColor = async color => {
    await firestore
      .doc(`todoLists/${listId}`)
      .set({ colour: color }, { merge: true });
  };

  return (
    <section data-testid="taskListEditor">
      <div>
        {list && (
          <Box direction="row" align="center">
            <Menu
              label={
                <Box
                  style={{
                    backgroundColor: backgroundColor || list.colour,
                  }}
                  // onClick={() => setColor(backgroundColor)}
                  pad="medium"
                  margin="xsmall"
                />
              }
              items={
                colours &&
                colours.activeGoalColours &&
                colours.activeGoalColours
                  .filter(colour => colour !== list.colour)
                  .map(backgroundColor => ({
                    label: (
                      <Box
                        style={{
                          backgroundColor,
                        }}
                        pad="medium"
                        margin="xsmall"
                      />
                    ),
                    onClick: () => setColor(backgroundColor),
                  }))
              }
            />
            <Heading margin="none" data-testid="title">
              {list.title}
            </Heading>
          </Box>
        )}

        <input
          type="text"
          value={title || list.title}
          placeholder="List title goes here"
          className="db"
          onChange={e => setTitle(e.target.value)}
          data-testid="titleInput"
        />
        <button
          onClick={() =>
            firestore.doc(`todoLists/${listId}`).update({
              title: title || list.title,
            })
          }
          data-testid="submitTodoList"
        >
          Save List
        </button>
      </div>
      <ul>
        {tasks.map(todo => (
          <Todo key={todo.id} todo={todo} id={todo.id} listId={listId} />
        ))}
      </ul>
      <EditableToDoItem
        submit={createTodo(todo, listId)}
        todo={todo}
        setTodo={setTodo}
      />

      <small
        className="washed-red pt3"
        onClick={() => {
          dispatch({ type: 'EDITOR_MODAL_CLOSED' });
          firestore.doc(`todoLists/${listId}`).delete();
        }}
      >
        Delete Entire List
      </small>
    </section>
  );
};
