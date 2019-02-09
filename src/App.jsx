import { API, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import React, { Component } from 'react';
import './App.css';
import { listProjects } from './graphql/queries';
import logo from './logo.svg';

const initialState = { file: '', fileURL: '', filename: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FILE':
      return { file: action.payload };
    case 'SET_FILE_URL':
      return { fileURL: action.payload };
    case 'SET_FILE_NAME':
      return { filename: action.payload };
    case 'SET_FILE_URL_NAME':
      return {
        file: action.payload,
        fileURL: URL.createObjectURL(action.payload),
        filename: action.payload.name
      };
    case 'RESET':
      return { file: '', fileURL: '', filename: '' };
    default:
      throw new Error('You have probably mispelt an action name');
  }
}

const UploadThing = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleChange = e => {
    const file = e.target.files[0];
    dispatch({ type: 'SET_FILE_URL_NAME', payload: file });
  };

  const saveFile = () => {
    Storage.put(state.filename, state.file)
      .then(() => {
        console.log('success 🔆');
        dispatch({ type: 'RESET' });
      })
      .catch(error => console.error('error saving to storage', error));
  };

  React.useEffect(() => {
    Storage.get('bitly:2GbazNo.png')
      .then(data => dispatch({ type: 'SET_FILE_URL', payload: data }))
      .catch(error => console.error('error retrieving from storage', error));
  }, []);

  return (
    <div>
      <p>hello</p>
      <img src={state.fileURL} alt="" />
      <input type="file" onChange={handleChange} />
      <button onClick={saveFile}>Save</button>
    </div>
  );
};

class App extends Component {
  state = {
    projects: undefined
  };

  async componentDidMount() {
    const projectList = await API.graphql(graphqlOperation(listProjects));
    this.setState({ projects: projectList.data.listProjects.items });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="200" />

          <ul>
            {this.state.projects &&
              this.state.projects.map(project => (
                <li key={project.id}>{project.name}</li>
              ))}
          </ul>
          <UploadThing />
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
