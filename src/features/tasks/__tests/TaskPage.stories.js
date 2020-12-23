import React from 'react';
import { TaskPage } from '../ListEditor';

export default {
  component: TaskPage,
  title: 'TaskPage',
};

const fakeProps = {
  dispatch: () => {},
  setTitle: () => {},
  createTodo: () => {},
  setTodo: () => {},
  list: { title: 'titlesome' },
  title: 'titlesome',
  todo: '',
  listId: '123',
  tasks: [
    {
      title: 'invite everyone to collaborate',
      id: 'KAsQETugPa2Dw1juVlPz',
      completed: false,
      createdOn: 1552017572364,
    },
    {
      createdOn: 1551616091099,
      title: 'Register as a cooperative',
      id: 'eQhZCASlueWEjEdSBm8O',
      completed: false,
      createdBy: 'Josh',
      deadline: '3 days',
    },
    {
      createdOn: 1551851087130,
      title: 'create a team agreement',
      completed: false,
      id: 'lLwRxvPoaX2qLsPO5bxG',
    },
    {
      id: 'sKTdlEqu72pm0YzYJTKy',
      createdOn: 1552297562122,
      completed: false,
      title: 'sliing pie summary',
    },
    {
      createdOn: 1551851096409,
      id: 'ytbu5zpcx4GOCP0y8ehF',
      completed: false,
      title: 'outline how compensation works',
    },
  ],
};

/* eslint-disable-next-line react/jsx-props-no-spreading */
export const Default = () => <TaskPage {...fakeProps} />;
