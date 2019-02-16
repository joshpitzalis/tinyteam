import React from 'react';

const { Provider, Consumer } = React.createContext();

class ProblemProvider extends React.Component {
  state = {
    posts: {
      1: {
        title: 'New Post',
        id: 1,
        createdBy: 'Josh',
        votes: 5
      },
      2: {
        title: 'Introducing Telescope',
        createdBy: 'Josh',
        id: 2,
        votes: 5
      },
      3: {
        title: 'Meteor',
        createdBy: 'Josh',
        id: 3,
        votes: 15
      },
      4: {
        title: 'The Meteor Book',
        createdBy: 'Josh',
        id: 4,
        votes: 3
      }
    }
  };

  setPost = newPost => {
    const newPosts = { ...this.state.posts };
    newPosts[newPost.id] = newPost;
    return this.setState({
      posts: newPosts
    });
  };

  upVote = id => {
    const newPosts = { ...this.state.posts };
    newPosts[id] = {...newPosts[id],
        votes: newPosts[id].votes + 1}
    
    return this.setState({
        posts: newPosts
      });
  };

  render() {
    return (
      <Provider
        value={{
          postsList: Object.values(this.state.posts),
          setPost: this.setPost,
          upVote: this.upVote
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

    export { ProblemProvider, Consumer as ProblemConsumer };

