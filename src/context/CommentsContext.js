import React from 'react';

export const CommentsContext = React.createContext();


class CommentsProvider extends React.Component {
  state = {comments: [{
    postId: 4,
    created: new Date(new Date() - (5 * 3600 * 1000)),
    author: 'Josh',
    body: 'We need to hook this up to make it work realtime, nest responses like quoting on whatsapp, and the ability to turn a comment into a vote or todo item'
  }]};

  addComment = body => {
    this.setState({ comments: this.state.comments.concat({
      created: new Date(),
      author: 'Somebody',
      body
    })})
  }

 

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
      <CommentsContext.Provider
        value={{
          comments: this.state.comments,
          addComment: this.addComment
        }}
      >
        {this.props.children}
      </CommentsContext.Provider>
    );
  }
}

    export default CommentsProvider 
