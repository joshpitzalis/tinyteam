import React from 'react';
import { authState } from 'rxfire/auth';
import { list } from 'rxfire/database';
import { map } from 'rxjs/operators';
import { app, db } from '../utils/firebase';

export const CommentsContext = React.createContext({});

class CommentsProvider extends React.Component {
  state = {
    comments: [
      {
        postId: 4,
        created: new Date(),
        author: 'Tiny Teams',
        body: 'Loading...'
      }
    ],
    user: null
    
  };

  componentDidMount() {
    this.chat$ = list(db.ref('chats/devteam123test'))
      .pipe(map(changes => changes.map(c => c.snapshot.val())))
      .subscribe(list => this.setState({ comments: list }));

      this.auth$ = authState(app.auth()).subscribe(user =>
        this.setState({ user: user.displayName })
      );
  }

  componentWillUnmount() {
    this.chat$.unsubscribe();
    this.auth$.unsubscribe();
  }

  addComment = body => {
    const newCommentRef = db.ref('chats/devteam123test').push();
    newCommentRef.update(
      {
        postId: newCommentRef.key,
        created: new Date(),
        author: this.state.user,
        body
      }
    );
  };

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

export default CommentsProvider;
