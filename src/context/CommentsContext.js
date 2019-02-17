import React from 'react';

const { Provider, Consumer } = React.createContext();

class CommentsProvider extends React.Component {
  state = {
    comments: [{
      postId: 4,
      created: new Date(new Date() - (5 * 3600 * 1000)),
      author: 'Josh',
      body: 'We need to be able to add comments here, nest responses, and turn a comment into a vote of todo item'
    }]
    
  };

  // setPost = newPost => {
  //   const newPosts = { ...this.state.posts };
  //   newPosts[newPost.id] = newPost;
  //   return this.setState({
  //     posts: newPosts
  //   });
  // };

  // upVote = id => {
  //   const newPosts = { ...this.state.posts };
  //   newPosts[id] = {...newPosts[id],
  //       votes: newPosts[id].votes + 1}
    
  //   return this.setState({
  //       posts: newPosts
  //     });
  // };

  render() {
    return (
      <Provider
        value={{
          comments: this.state.comments,
          // setPost: this.setPost,
          // upVote: this.upVote
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

    export { CommentsProvider, Consumer as CommentsConsumer };

