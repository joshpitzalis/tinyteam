import React from 'react';

export const TasksContext = React.createContext();

class TaskProvider extends React.Component {
  state = { tasks: {
    1: {
      title: 'New Task',
      id: 1,
      createdBy: 'Josh',
      completed: false,
      deadline: '3 days',
    },
    2: {
      title: 'Second Task',
      id: 2,
      createdBy: 'Josh',
      completed: true,
      deadline: '3 days',
    }
  }}

  createTask = newPoll => {
    const newPolls = { ...this.state.polls };
    newPolls[newPoll.id] = newPoll;
    return this.setState({
      polls: newPolls
    });
  };

  render() {
    return (
      <TasksContext.Provider
        value={{
          tasks: this.state.tasks,
          createTask: this.createTask,
        }}
      >
        {this.props.children}
      </TasksContext.Provider>
    );
  }
}

export default TaskProvider

