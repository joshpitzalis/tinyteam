import React from 'react';

const App = () => {
  const [newProblem, setProblem] = React.useState({});

  const [postsList, setPost] = React.useState([
    {
      url: '/',
      title: 'New Post',
      id: 1
    },
    {
      title: 'Introducing Telescope',
      url: 'http://sachagreif.com/introducing-telescope/'
    },
    {
      title: 'Meteor',
      url: 'http://meteor.com'
    },
    {
      title: 'The Meteor Book',
      url: 'http://themeteorbook.com'
    }
  ]);
  return (
    <div className="sans-serif pa4">
      <div className="container">
        <header className="navbar navbar-default" role="navigation">
          <div className="navbar-header">
            <h1 className="navbar-brand">Problems ranked by importance</h1>
          </div>
        </header>
        <div id="main">
          {postsList.map(post => (
            <PostItem {...post} key={post.id} />
          ))}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            setPost([...postsList, newProblem]);
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
};

export default App;

const PostItem = ({ url, title, createdBy }) => {
  return (
    <div className="post">
      <div className="post-content">
        <h3>
          <a href={url}>{title}</a>
          <span>{createdBy}</span>
        </h3>
      </div>
    </div>
  );
};
