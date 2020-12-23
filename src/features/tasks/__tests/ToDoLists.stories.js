import React from 'react';

import { List } from '../ToDoLists';

export default {
  component: List,
  title: 'ToDoList',
};

const demoTasks = [
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
];

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});

Default.args = {
  dispatch: () => {},
  id: 1,
  title: 'Titlesome',
  index: 0,
  tasks: demoTasks,
};

export const Pinned = Template.bind({});

Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};
