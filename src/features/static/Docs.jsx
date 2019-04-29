import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import { storage, firestore } from '../../utils/firebase';

export default class Docs extends Component {
  // handleChange() {}
  static propTypes = {
    update: PropTypes.func.isRequired,
  };

  handleDelete = async (item, teamId) => {
    const { fileName } = item;
    const { url } = item;
    console.log(item, teamId);

    await firestore.doc(`teams/${teamId}`).update({
      files: firebase.firestore.FieldValue.arrayRemove({
        fileName,
        url,
      }),
    });

    this.props.update();
    // delete the file from storage,
    // check if its a link only upload so that storage deletedoesnt throw an error

    // const b = storage
    //   .ref(`teams/${teamId}/`)
    //   .child(fileName)
    //   .delete();

    // Promise.all([a, b]).then(() => this.props.update());
  };

  render() {
    return (
      <main data-testid="docList" className="mw6 ">
        <ul className="list pl0 mt0 vh-25-ns  overflow-scroll  ">
          <div className="">
            {this.props.listofFiles &&
              this.props.listofFiles.length > 0 &&
              this.props.listofFiles.map((item, index) => (
                <li
                  className="flex items-center lh-copy pa3 ph0-l bb b--black-10 "
                  key={item.fileName}
                >
                  {' '}
                  {/* <div> {item.fileName} </div> */}
                  <div>
                    <a className="f3 underline-hover" href={item.url}>
                      {item.fileName}
                    </a>
                  </div>
                  <div className="ph4">
                    <DeleteButton
                      handleDelete={this.handleDelete}
                      item={item}
                      teamName="devteam123test"
                    />
                  </div>
                </li>
              ))}
          </div>
        </ul>
      </main>
    );
  }
}
