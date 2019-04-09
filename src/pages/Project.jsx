import React from 'react';
import { connect } from 'react-redux';
import { getAuthStatus } from '../features/authentication/selectors';
import Chat from '../features/chat/Chat';
// import { Stats } from '../features/goals';
import { Static } from '../features/static/index.jsx';
import Tasks from '../features/tasks';
import Votes from '../features/votes';

const Project = ({ loggedIn }) => (
  <article>
    <Static />
    {/* <Stats /> */}
    {loggedIn && (
      <>
        <Tasks />
        <Votes />
        <Chat />
      </>
    )}
  </article>
);

const select = store => ({
  loggedIn: getAuthStatus(store),
});

export default connect(select)(Project);
