import React from 'react';
import Chat from '../features/chat/Chat';
import Tasks from '../features/tasks';
import Votes from '../features/votes';
import { Static } from './../features/static/index.jsx';
import { Stats } from './../features/stats/index.jsx';

const Project = () => {
  return (
    <article>
      <Static />

      <Chat />
      <Votes />
      <Tasks />

      <Stats />
    </article>
  );
};

export default Project;
