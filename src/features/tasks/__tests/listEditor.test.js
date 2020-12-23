import 'jest-dom/extend-expect';
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitForElement,
} from 'react-testing-library';
import TaskProvider from '../../../context/TasksContext';
import Tasks from '../index';

afterEach(cleanup);

it.skip('lets me create a new task list', async () => {
  const { queryByTestId, getByTestId, getByText, queryByText } = render(
    <TaskProvider>
      <Tasks />
    </TaskProvider>
  );
  expect(queryByTestId('taskListCreator')).toBeNull();
  fireEvent.click(getByTestId('createTask'));
  await waitForElement(() => getByTestId('taskListCreator'));
  fireEvent.change(getByTestId('titleInput'), {
    target: { value: 'Thingy List' },
  });
  fireEvent.change(getByTestId('taskInput'), {
    target: { value: 'example task' },
  });
  fireEvent.click(getByTestId('addToDo'));
  fireEvent.click(getByTestId('submitTodoList'));
  expect(queryByTestId('taskListEditor')).toBeNull();
  await waitForElement(() => getByText('Thingy List'));
  getByText('example task');
});

it.skip('lets me edit an existing tasks list', async () => {
  const { queryByTestId, getByTestId, getByText } = render(
    <TaskProvider>
      <Tasks />
    </TaskProvider>
  );

  await waitForElement(() => getByText('Thing List'));
  expect(queryByTestId('taskListEditor')).toBeNull();
  fireEvent.click(getByTestId('editTaskList'));
  await waitForElement(() => getByTestId('taskListEditor'));
  fireEvent.change(getByTestId('titleInput'), {
    target: { value: 'Thingy List' },
  });
  fireEvent.change(getByTestId('taskInput'), {
    target: { value: 'example task' },
  });
  fireEvent.click(getByTestId('addToDo'));
  fireEvent.click(getByTestId('submitTodoList'));
  expect(queryByTestId('taskListEditor')).toBeNull();
  await waitForElement(() => getByText('Thingy List'));
  getByText('example task');
});

it.todo('lets me delete a tasks');
it.todo('lets me delete a list');
it.todo('lets me complete a tasks');
it.todo('lets me show completed tasks');
it.todo(
  'each task page should have its own unique route so that they can be shared by url'
);

it.todo('hillchart reflect hilstory of updates');
it.todo('add a todo');
it.todo('editable functionality in dropdown');
it.todo('add comments');
it.todo('add small pie chart');
it.todo('make tasks draggable');
