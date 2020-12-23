import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { List } from '../ToDoLists';

const fakeListData = {
  dispatch: () => {},
  id: 123,
  title: 'titlesome',
  index: 1,
  tasks: [
    {
      id: 'sKTdlEqu72pm0YzYJTKy',
      createdOn: 1552297562122,
      completed: true,
      title: 'slicing pie summary',
    },
    {
      createdOn: 1551851096409,
      id: 'ytbu5zpcx4GOCP0y8ehF',
      completed: false,
      title: 'outline how compensation works',
    },
  ],
};

afterEach(cleanup);

it('shows me how many tasks are complete in the task list header', async () => {
  const { queryByTestId } = render(<List tasks={fakeListData.tasks} />);
  expect(queryByTestId('taskListCounter')).toHaveTextContent('1/2 Complete');
});

it.todo('what happens when there are no tasks total');
it.todo('what happens when 0 tasks are complete');
it.todo('error boundaries');
it.todo('show complated items in list card');
describe('add ellipses to bottom of list when more task than will fit in list card', () => {
  it.todo('task lines can be as long as they need to');
});
it.todo(
  'completed itesm show alwats appear below incomplete ones in list card'
);
it.todo('list name shoud not overflow');
