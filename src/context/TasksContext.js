import React from 'react';
import { authState } from 'rxfire/auth';
import { collection } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { app, firestore } from '../utils/firebase';
import { updater } from './helpers';

export const TasksContext = React.createContext({
  lists: {},
  updateLists: () => {}
});

class TaskProvider extends React.Component {
  state = {
    lists: []
  };

  // {
  //   1: {
  //     title: 'Thing List',
  //     id: 1,
  //     tasks: {
  //       1: {
  //         title: 'New Task',
  //         id: 1,
  //         createdBy: 'Josh',
  //         completed: false,
  //         deadline: '3 days'
  //       },
  //       2: {
  //         title: 'Second Task',
  //         id: 2,
  //         createdBy: 'Josh',
  //         completed: true,
  //         deadline: '3 days'
  //       }
  //     },
  //     createdOn: '24 June'
  //   }
  // }
  
  componentDidMount() {
    
    this.tasks$ = collection(firestore.collection('todoLists'))
      .pipe(map(docs => docs.map(doc => doc.data())))
      .subscribe(lists => 
        // console.log('lists', lists)
        this.setState({ lists })
        );

      this.auth$ = authState(app.auth()).subscribe(user => user &&
        this.setState({ user: user.displayName })
      );
  }

  componentWillUnmount() {
    this.tasks$.unsubscribe();
    this.auth$.unsubscribe();
  }

  updateLists = newList =>
    this.setState({
      lists: updater(newList, this.state.lists)
    });

  render() {
    return (
      <TasksContext.Provider
        value={{
          lists: this.state.lists,
          updateLists: this.updateLists,
          createNewList: this.createNewList
        }}
      >
        {this.props.children}
      </TasksContext.Provider>
    );
  }
}

export default TaskProvider;
