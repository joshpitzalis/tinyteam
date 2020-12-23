/* eslint-disable */

import React from 'react';
import { updater } from './helpers';

export const VoteContext = React.createContext({});

class VoteProvider extends React.Component {
  state = {
    polls: {
      1: {
        title: 'New Post',
        id: 1,
        createdBy: 'Josh',
        votes: 5,
        deadline: '3 days',
        fields: ['one', 'two'],
      },
    },
  };

  createPoll = (newPoll) =>
    this.setState({
      polls: updater(newPoll, this.state.polls),
    });

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

export default VoteProvider;
