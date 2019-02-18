import React from 'react';
import { Link } from 'react-router-dom';
import { CommentsContext } from '../context/CommentsContext';
import Poll from '../images/poll.png';

const Votes = ({ match }) => {
  const { comments } = React.useContext(CommentsContext);

  return (
    <div>
      <Link to="/">
        <p>Back</p>
      </Link>

      <header className="navbar navbar-default" role="navigation">
        <h1 className="navbar-header">2 days and 45 minutes left...</h1>
      </header>

      <img src={Poll} alt="mockup of a poll" className="pv4" />
      <hr />
      <div>
        <ul className="comments pl0">
          {comments.map(item => (
            <li key={item.postId}>
              <h4>
                <span className="author">{`${item.author} `}</span>
                <span className="date">
                  on {` ${item.created.toLocaleDateString()}`}
                </span>
              </h4>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="comments pl0">
          <li>
            <input
              type="text"
              className="w-100"
              placeholder="Add your comment here..."
            />
          </li>
        </div>
      </div>
    </div>
  );
};

export default Votes;
