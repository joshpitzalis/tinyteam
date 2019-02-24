import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library';
import TaskProvider from '../../../context/TasksContext';
import Tasks from '../index';

afterEach(cleanup);


it.only('lets me edit existing tasks list',  async() => {

const { queryByTestId, getByTestId, getByText } = render(<TaskProvider>
    <Tasks  />
  </TaskProvider>);


await waitForElement(() =>
getByText('Thing List')
  )
expect(queryByTestId('taskListEditor')).toBeNull()
fireEvent.click(getByTestId('editTaskList'))
await waitForElement(() =>
getByTestId('taskListEditor')
  )
})




it('lets me delete a tasks', () => {})