import React from 'react';

export const VoteContext = React.createContext({polls: {
  1: {
    title: 'New Post',
    id: 1,
    createdBy: 'Josh',
    votes: 5,
    deadline: '3 days',
    fields: ['one', 'two']
  }
}});

class VoteProvider extends React.Component {
  state = {};

  createPoll = newPoll => {
    const newPolls = { ...this.state.polls };
    newPolls[newPoll.id] = newPoll;
    return this.setState({
      polls: newPolls
    });
  };

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
      <VoteContext.Provider
        value={{
          polls: this.state.polls,
          createPoll: this.createPoll,
        }}
      >
        {this.props.children}
      </VoteContext.Provider>
    );
  }
}

export default VoteProvider

