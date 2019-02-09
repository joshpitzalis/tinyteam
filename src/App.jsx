import { API, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import React, { Component } from 'react';
import './App.css';
import { listProjects } from './graphql/queries';
import logo from './logo.svg';

const UploadThing = () => {
  const [file, setFile] = React.useState('');
  const [fileURL, setFileURL] = React.useState('');
  const [filename, setFilename] = React.useState('');

  const handleChange = e => {
    const file = e.target.files[0];
    setFile(file);
    setFileURL(URL.createObjectURL(file));
    setFilename(file.name);
  };

  const saveFile = () => {
    Storage.put(filename, file)
      .then(() => {
        console.log('success 🔆');
        setFile('');
        setFileURL('');
        setFilename('');
      })
      .catch(error => console.error('error saving to staorage', error));
  };

  React.useEffect(() => {
    Storage.get('bitly:2GbazNo.png')
      .then(data => setFileURL(data))
      .catch(error => console.error('error retrieving from storage', error));
    console.log('frog');
  }, []);

  return (
    <div>
      <p>hello</p>
      <img src={fileURL} alt="" />
      <input type="file" onChange={handleChange} />
      <button onClick={saveFile}>Save</button>
    </div>
  );
};

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
