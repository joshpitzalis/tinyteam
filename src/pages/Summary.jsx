import React from 'react';
import { Link } from 'react-router-dom';

const Discussions = ({ match }) => {
  return (
    <div>
      <Link to="/">
        <p>Back</p>
      </Link>
      <header className="navbar navbar-default" role="navigation">
        <h1 className="navbar-header">
          This is a summary page of project {match.params.projectId}
        </h1>
      </header>

      <div className="h5 ba br2 b--silver pa3 flex-column   mv4">
        <p className="tc">
          If there is a discussion summary the summary goes here
        </p>
        <Link to={`/discussion/${match.params.projectId}`} className="w-100">
          <button className="db center pa5 w-100 pointer">
            Start a discussion
          </button>
        </Link>
      </div>

      <div className="h5 ba br2 b--silver pa3 flex-column justify-center  mv4">
        <h2>Lets make some decisions</h2>
        <Link to={'/vote/${match.params.projectId}'} className="db center ">
          Start a vote
        </Link>
      </div>

      <div className="h5 ba br2 b--silver pa3 flex-column items-center mv4">
        <h2>Lets get some stuff done</h2>
        <Link to={`/task/${match.params.projectId}`} className="db center ">
          Create a Todo
        </Link>
      </div>

      <progress value="22" max="100" className="w-100" />
    </div>
  );
};

export default Discussions;
