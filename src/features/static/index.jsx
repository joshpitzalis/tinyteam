import React, { Component } from 'react';
import { Players } from './Players';
import { TeamStats } from './TeamStats';
import { firestore } from '../../utils/firebase';

import UploadFeature from './UploadFeature';
import { pullFileDataFromFirebase } from './staticHelpers';
import Docs from './Docs';

export default class Static extends Component {
  state = { files: [] };

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

  render() {
    const { files } = this.state;
    return (
      <>
        <section className="ph3 ph5-ns pv5 bg-light-yellow vh-75 w-100">
          <header className="fn fl-ns w-50-ns pr4-ns">
            <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bt bw2">Tiny Teams</h1>
            <h2 className="f3 mid-gray lh-title">
              A collaborative decision making tool for remote teams.
            </h2>
            <Players />
            <UploadFeature update={this.updateFiles} />
          </header>
          <div className="fn fl-ns w-50-ns">
            <Docs listofFiles={files} update={this.updateFiles} />
          </div>
        </section>
        <TeamStats />
      </>
    );
  }
}
