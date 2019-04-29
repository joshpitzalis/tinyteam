import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { Form } from 'grommet';
import { storage, firestore } from '../../utils/firebase';

export default class UploadFile extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    closeTheGood: PropTypes.func.isRequired,
  };

  state = { fileName: '', errors: [], processing: false };

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
    console.log(event);
    this.setState({ processing: true });
    const file = this.file;
    const { update, closeTheGood } = this.props;
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
          this.setState({ processing: false });
          update();
          return this.clearFields();
        })
        .then(() => closeTheGood())
        .catch(error => {
          this.setState({ processing: false });
          console.error('error uploading file', error);
        });
    }
  };

  render() {
    const { fileName, errors, processing } = this.state;

    return (
      <div data-testid="uploadFile">
        <h3 className="f3 mid-gray lh-title  ">
          {' '}
          Share a file with your team{' '}
        </h3>

        <div />
        <Form
          data-testid="uploadform"
          onSubmit={event => {
            this.handleUpload(event, 'devteam123test', fileName);
          }}
        >
          {errors.map(error => (
            <p key={error}>Error: {error}</p>
          ))}

          <input
            type="text"
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            value={fileName}
            name="fileName"
            onChange={this.handleChange}
            placeholder="File Name"
            field="filename"
          />
          <div>
            <input
              className="b  pv2 input-reset  b--black bg-transparent grow pointer f6 "
              data-testid="uploadFile"
              type="file"
              ref={ref => (this.fileInput = ref)}
            />
          </div>
          <input
            type="button"
            className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"
            data-testid="uploadButton"
            value={processing ? 'Processing...' : 'Submit'}
            type="Submit"
            disabled={processing}
          />
        </Form>
        {/* </div>
        <div data-testid="uploadLink">
          <h3 className="f3 mid-gray lh-title  ">
            {' '}
            Share a link with your team{' '}
          </h3>

          <div />
          <Form
            data-testid="uploadform"
            onSubmit={event => {
              this.handleUpload(event, 'devteam123test', fileName, url);
            }}
          >
            {errors.map(error => (
              <p key={error}>Error: {error}</p>
            ))}

            <input
              type="text"
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              value={fileName}
              name="fileName"
              onChange={this.handleChange}
              placeholder="File Name"
              field="filename"
            />
            <div>
              <input
                type="text"
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                value={url}
                name="url"
                onChange={this.handleChange}
                placeholder="Link"
                field="Link"
              />
            </div>
            <input
              className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"
              data-testid="uploadButton"
              value={processing ? 'Processing...' : 'Submit'}
              type="Submit"
              disabled={processing}
            />
          </Form>
        </div> */}
      </div>
    );
  }
}
