import React from 'react';
import { Link } from 'react-router-dom';
const Discussions = ({ match, title }) => {
  // const value = React.useContext();

  return (
    <div>
      <Link to="/">
        <p>Back</p>
      </Link>

      <header className="navbar navbar-default" role="navigation">
        <div className="navbar-header">{title}</div>
      </header>

      <p>{match.params.discussionId}</p>
    </div>
  );
};

export default Discussions;
