import React from 'react';
import { Players } from './Players';
import { TeamStats } from './TeamStats';

export const Static = () => (
  <>
    <section className="ph3 ph5-ns pv5 bg-light-yellow vh-75 w-100">
      <header className="fn fl-ns w-50-ns pr4-ns">
        <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bt bw2">Tiny Teams</h1>
        <h2 className="f3 mid-gray lh-title">
          A collaborative decision making tool for remote teams.
        </h2>
        <Players />
      </header>
      <div className="fn fl-ns w-50-ns">{/* <Docs /> */}</div>
    </section>
    <TeamStats />
  </>
);
