import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { storage, firestore } from '../../utils/firebase';

export default class Docs extends Component {
  // handleChange() {}
  static propTypes = {
    update: PropTypes.func.isRequired,
  };

  handleDelete = (item, teamId) => {
    // delete url from firestore
    const { fileName } = item;
    const { url } = item;
    firestore.doc(`teams/${teamId}`).update({
      files: firebase.firestore.FieldValue.arrayRemove({
        fileName,
        url,
      }),
    });

    // delete the file from storage
    storage
      .ref(`teams/${teamId}/`)
      .child(fileName)
      .delete()
      .then(() => {
        this.props.update();
      });
  };

  render() {
    return (
      <main data-testid="docList" className="mw6 center">
        <div>
          {this.props.listofFiles &&
            this.props.listofFiles.length > 0 &&
            this.props.listofFiles.map(item => (
              <div key={item.fileName}>
                {' '}
                <div> {item.fileName} </div>
                <a href={item.url}>Download</a>
                <button
                  data-testid="deleteButton"
                  type="button"
                  onClick={this.handleDelete.bind(this, item, 'devteam123test')}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </main>
    );
  }
}
