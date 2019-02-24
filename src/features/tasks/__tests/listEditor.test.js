import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library';
import TaskProvider from '../../../context/TasksContext';
import Tasks from '../index';

afterEach(cleanup);

it.only('lets me edit existing tasks list', async () => {
  const { queryByTestId, getByTestId, getByText, queryByText } = render(
    <TaskProvider>
      <Tasks />
    </TaskProvider>
  );

  await waitForElement(() => getByText('Thing List'));
  expect(queryByTestId('taskListEditor')).toBeNull();
  fireEvent.click(getByTestId('editTaskList'));
  await waitForElement(() => getByTestId('taskListEditor'));
  fireEvent.change(getByTestId('titleInput'), {target: {value:'Thingy List' }})
  fireEvent.change(getByTestId('taskInput'), {target: {value:'example task' }})
  fireEvent.click(getByTestId('addToDo'))
  fireEvent.click(getByTestId('submitTodoList'))
  expect(queryByTestId('taskListEditor')).toBeNull()
  await waitForElement(() => getByText('Thingy List'))
  getByText('example task')
});

it('lets me delete a tasks', () => {});
