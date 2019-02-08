import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import React, { Component } from 'react';
import './App.css';
import { listProjects } from './graphql/queries';
import logo from './logo.svg';

class App extends Component {
  state = {
    projects: null
  };
  async componentDidMount() {
    const projectList = await API.graphql(graphqlOperation(listProjects));
    this.setState({ projects: projectList.data.listProjects.items });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <ul>
            {this.state.projects &&
              this.state.projects.map(project => <li>{project.name}</li>)}
          </ul>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
