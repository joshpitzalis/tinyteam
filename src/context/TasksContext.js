import React from 'react';

export const TasksContext = React.createContext();

class TaskProvider extends React.Component {
  state = {
    lists: {
      1: {
        title: 'Thing List',
        id: 1,
        tasks: {
          1: {
            title: 'New Task',
            id: 1,
            createdBy: 'Josh',
            completed: false,
            deadline: '3 days'
          },
          2: {
            title: 'Second Task',
            id: 2,
            createdBy: 'Josh',
            completed: true,
            deadline: '3 days'
          }
        },
        createdOn: '24 June'
      }
    }
  };

  updateLists = newList => {
    console.log('newList', newList)
    const newLists = { ...this.state.lists };
    newLists[newList.id] = newList;
    return this.setState({
      lists: newLists
    });
  };

  render() {
    return (
      <TasksContext.Provider
        value={{
          lists: this.state.lists,
          updateLists: this.updateLists
        }}
      >
        {this.props.children}
      </TasksContext.Provider>
    );
  }
}

export default TaskProvider;
