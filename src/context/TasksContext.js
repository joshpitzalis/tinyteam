import React from 'react';
import { authState } from 'rxfire/auth';
import { collection } from 'rxfire/firestore';
import { filter, map } from 'rxjs/operators';
import { auth, firestore } from '../utils/firebase';
import { updater } from './helpers';

export const TasksContext = React.createContext({
  lists: {},
  updateLists: () => {},
});

class TaskProvider extends React.Component {
  state = {
    lists: [],
  };

  componentDidMount() {
    this.tasks$ = collection(firestore.collection('todoLists'))
      .pipe(map(docs => docs.map(doc => doc.data())))
      .subscribe(lists => this.setState({ lists }));

    this.auth$ = authState(auth)
      .pipe(filter(user => !!user))
      .subscribe(user => this.setState({ user: user.displayName }));
  }

  componentWillUnmount() {
    this.tasks$.unsubscribe();
    this.auth$.unsubscribe();
  }

  updateLists = newList =>
    this.setState({
      lists: updater(newList, this.state.lists),
    });

  render() {
    return (
      <TasksContext.Provider
        value={{
          lists: this.state.lists,
          updateLists: this.updateLists,
        }}
      >
        {this.props.children}
      </TasksContext.Provider>
    );
  }
}

export default TaskProvider;
