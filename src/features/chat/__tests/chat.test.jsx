import 'jest-dom/extend-expect';
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from 'react-testing-library';
import CommentsProvider from '../../../context/CommentsContext';
import Chat from '../Chat';

afterEach(cleanup);

it('lets me star a task to turn it into a task', async () => {
  const { queryByTestId, getByTestId } = render(
    <CommentsProvider>
      <Chat />
    </CommentsProvider>
  );
  expect(queryByTestId('taskListCreator')).toBeNull();
  fireEvent.click(getByTestId('starMessage'));
  await waitForElement(() => getByTestId('taskListCreator'));
  //   fireEvent.change(getByTestId('titleInput'), {
  //     target: { value: 'Thingy List' }
  //   });
  //   fireEvent.change(getByTestId('taskInput'), {
  //     target: { value: 'example task' }
  //   });
  //   fireEvent.click(getByTestId('addToDo'));
  //   fireEvent.click(getByTestId('submitTodoList'));
  //   expect(queryByTestId('taskListEditor')).toBeNull();
  //   await waitForElement(() => getByText('Thingy List'));
  //   getByText('example task');
});

it.skip('lets me star a task to turn it into a task with the same title', () => {});
