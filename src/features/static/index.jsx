import React, { Component } from 'react';
import { Players } from './Players';
import { TeamStats } from './TeamStats';
import { firestore } from '../../utils/firebase';

import UploadFile from './UploadFile';
import UploadLink from './UploadLink';
import { pullFileDataFromFirebase } from './staticHelpers';
import Docs from './Docs';

export default class Static extends Component {
  state = {
    files: [],
    uploadFileVisibility: false,
    uploadLinkVisibility: false,
  };

  componentDidMount() {
    pullFileDataFromFirebase('devteam123test', firestore).then(files =>
      this.setState({ files })
    );
  }

  updateFiles = () => {
    pullFileDataFromFirebase('devteam123test', firestore).then(files =>
      this.setState({ files })
    );
  };

  closeTheGood = () =>
    this.setState({ uploadFileVisibility: false, uploadLinkVisibility: false });

  render() {
    const { files, uploadFileVisibility, uploadLinkVisibility } = this.state;
    return (
      <>
        <section className="ph3 ph5-ns pv5 bg-light-yellow vh-75 w-100  ">
          <header className="fn fl-ns w-50-ns pr4-ns">
            <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bt bw2">Tiny Teams</h1>
            <h2 className="f3 mid-gray lh-title ">
              A collaborative decision making tool for remote teams.
            </h2>
            <Players />
          </header>
          <header className="fn fl-ns w-50-ns 100vh ">
            <Docs listofFiles={files} update={this.updateFiles} />
            {!uploadFileVisibility ? (
              <button
                type="button"
                className="f7 grow no-underline br-pill ph3 pv2 mb2 dib white bg-blue "
                onClick={() => this.setState({ uploadFileVisibility: true })}
              >
                Share a file
              </button>
            ) : (
              <>
                <UploadFile
                  update={this.updateFiles}
                  closeTheGood={this.closeTheGood}
                />
                <button
                  type="button"
                  className=" f7 grow no-underline br-pill ph3 pv2 mb2 dib white bg-blue "
                  onClick={() => this.setState({ uploadFileVisibility: false })}
                >
                  Hide
                </button>
              </>
            )}
            {!uploadLinkVisibility ? (
              <button
                type="button"
                className="f7 grow no-underline br-pill ph3 pv2 mb2 dib white bg-blue "
                onClick={() => this.setState({ uploadLinkVisibility: true })}
              >
                Share a Link
              </button>
            ) : (
              <>
                <UploadLink
                  update={this.updateFiles}
                  closeTheGood={this.closeTheGood}
                />
                <button
                  type="button"
                  className=" f7 grow no-underline br-pill ph3 pv2 mb2 dib white bg-blue "
                  onClick={() => this.setState({ uploadLinkVisibility: false })}
                >
                  Hide
                </button>
              </>
            )}
          </header>
        </section>
        <TeamStats />
      </>
    );
  }
}
