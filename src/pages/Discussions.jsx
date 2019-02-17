import React from 'react';
import { Link } from 'react-router-dom';
import { CommentsConsumer } from '../context/CommentsContext';
import { ProblemConsumer } from '../context/ProblemsContext';
const Discussions = ({ match }) => {
  const { postsList } = React.useContext(ProblemConsumer);

  const { title, votes } = postsList.find(
    post => post.id === Number(match.params.discussionId)
  );

  const { comments } = React.useContext(CommentsConsumer);

  return (
    <div>
      <Link to="/">
        <p>Back</p>
      </Link>

      <header className="navbar navbar-default" role="navigation">
        <h1 className="navbar-header">{title}</h1>
      </header>

      <p>{votes} votes </p>

      <div>
        <ul className="comments pl0">
          {comments.map(item => (
            <li>
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

export default Discussions;
