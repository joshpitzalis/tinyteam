import React from 'react';
import { Link } from 'react-router-dom';
import { CommentsContext } from '../../context/CommentsContext';

const Tasks = ({ match }) => {
  const { comments } = React.useContext(CommentsContext);

  return (
    <div>
      <Link to="/">
        <p>Back</p>
      </Link>

      <header className="navbar navbar-default" role="navigation">
        <input type="checkbox" name="" id="" className="dib mr2" />{' '}
        <h1 className="navbar-header dib">An example task</h1>
      </header>

      <p>A description, who is responsible and by when</p>
      <hr />
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

export default Tasks;
