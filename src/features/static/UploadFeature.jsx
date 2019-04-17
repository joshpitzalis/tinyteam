import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { storage, firestore } from '../../utils/firebase';

export default class UploadFeature extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
  };

  state = { fileName: '', errors: [] };

  fileInput = null;

  get file() {
    return this.fileInput.files[0];
  }

  storeURLinFireStore = (url, teamId, fileName) => {
    firestore.doc(`teams/${teamId}`).update({
      files: firebase.firestore.FieldValue.arrayUnion({
        fileName,
        url,
      }),
    });
  };

  validate = (fileName, file) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (fileName.length === 0) {
      errors.push("FileName can't be empty");
    }

    if (file === undefined) {
      errors.push('Please choose a file');
    }
    if (file && file.size > 20971520) {
      errors.push('The file is too large');
    }

    return errors;
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  clearFields = () => {
    this.setState({ fileName: '', errors: [] });
    this.fileInput.value = '';
  };

  handleUpload = (event, teamId, fileName) => {
    event.preventDefault();

    const file = this.file;
    const { update } = this.props;
    const errors = this.validate(fileName, file);

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    if (this.file) {
      return storage
        .ref(`teams/${teamId}/${fileName}`)
        .put(this.file)
        .then(response => response.ref.getDownloadURL())
        .then(url => this.storeURLinFireStore(url, teamId, fileName))
        .then(() => {
          update();
          this.clearFields();
        })
        .catch(error => console.error('error uploading file', error));
    }
  };

  render() {
    const { fileName, errors } = this.state;

    return (
      <div data-testid="uploadFeature">
        Upload feature
        <div />
        <form
          data-testid="uploadform"
          onSubmit={event =>
            this.handleUpload(event, 'devteam123test', fileName)
          }
        >
          {errors.map(error => (
            <p key={error}>Error: {error}</p>
          ))}
          <input
            data-testid="uploadFile"
            type="file"
            ref={ref => (this.fileInput = ref)}
          />
          <input
            type="text"
            value={fileName}
            name="fileName"
            onChange={this.handleChange}
            placeholder="File Name"
            field="filename"
          />
          <div>
            {' '}
            <input
              data-testid="uploadButton"
              className="updateButton"
              type="submit"
            />
          </div>
        </form>
      </div>
    );
  }
}
