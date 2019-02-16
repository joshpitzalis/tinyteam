import React from 'react';
import { Link } from 'react-router-dom';
import { ProblemConsumer } from '../context/ProblemsContext';

const Problems = () => {
  const [newProblem, setProblem] = React.useState({});

  return (
    <ProblemConsumer>
      {({ postsList, setPost, upVote }) => {
        console.log('upVote', upVote);
        return (
          <div className="sans-serif pa4">
            <div className="container">
              <header className="navbar navbar-default" role="navigation">
                <div className="navbar-header">
                  <h1 className="navbar-brand">
                    Problems ranked by importance
                  </h1>
                </div>
              </header>
              <div id="main">
                {postsList.map(post => (
                  <PostItem {...post} key={post.id} upVote={upVote} />
                ))}
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setPost(newProblem);
                }}
              >
                <input
                  type="text"
                  value={newProblem.title}
                  onChange={e =>
                    setProblem({
                      title: e.target.value,
                      id: +new Date(),
                      createdBy: 'Josh'
                    })
                  }
                />
                <input type="submit" value="Create new problem" />
              </form>
            </div>
          </div>
        );
      }}
    </ProblemConsumer>
  );
};

export default Problems;

const PostItem = ({ id, title, createdBy, votes, upVote }) => {
  return (
    <div className="post">
      <div className="post-content">
        <div>
          <p>{votes}</p>
          <button onClick={() => upVote(id)}>+1</button>
        </div>
        <h3>
          <Link to={`discussion/${id}`}>{title}</Link>
          <span>{createdBy}</span>
        </h3>
      </div>
    </div>
  );
};
