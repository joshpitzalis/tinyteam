import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

import { firestore } from '../../utils/firebase';

export default class UploadFile extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    closeTheGood: PropTypes.func.isRequired,
  };

  state = { fileName: '', errors: [], processing: false, link: '' };

  storeURLinFireStore = (url, teamId, fileName) => {
    this.setState({ processing: true });
    const { update, closeTheGood } = this.props;
    firestore
      .doc(`teams/${teamId}`)
      .update({
        files: firebase.firestore.FieldValue.arrayUnion({
          fileName,
          url,
        }),
      })
      .then(() => {
        update();
        this.clearFields();
        this.setState({ processing: false });
      })
      .then(() => closeTheGood());
  };

  //   validate = (fileName, url) => {
  //     // we are going to store errors for all fields
  //     // in a signle array
  //     const errors = [];

  //     if (fileName.length === 0) {
  //       errors.push("FileName can't be empty");
  //     }

  //     return errors;
  //   };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  clearFields = () => {
    this.setState({ fileName: '', errors: [], link: '' });
  };

  //   handleUpload = (event, teamId, fileName, url) => {
  //     event.preventDefault();
  //     console.log(event);
  //     this.setState({ processing: true });
  //     const file = this.file;
  //     const { update, closeTheGood } = this.props;
  //     const errors = this.validate(fileName, file);

  //     if (errors.length > 0) {
  //       this.setState({ errors });
  //       return;
  //     }

  //     if (this.url) {
  //       return storage
  //         .ref(`teams/${teamId}/${fileName}`)

  //         .then(url => this.storeURLinFireStore(url, teamId, fileName))
  //         .then(() => {
  //           this.setState({ processing: false });
  //           update();
  //           return this.clearFields();
  //         })
  //         .then(() => closeTheGood())
  //         .catch(error => {
  //           this.setState({ processing: false });
  //           console.error('error uploading file', error);
  //         });
  //     }
  //   };

  render() {
    const { fileName, errors, processing, link } = this.state;

    return (
      <div data-testid="uploadFile">
        <h3 className="f3 mid-gray lh-title  ">
          {' '}
          Share a link with your team{' '}
        </h3>

        <div />
        <form
          data-testid="uploadlink"
          onSubmit={event => {
            event.preventDefault();
            this.storeURLinFireStore(link, 'devteam123test', fileName);
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
              type="url"
              pattern="^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$"
              required
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              value={link}
              name="link"
              onChange={this.handleChange}
              placeholder="Link"
              field="link"
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
        </form>
      </div>
    );
  }
}
