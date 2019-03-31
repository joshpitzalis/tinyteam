import React from 'react';

const bodyA = `Getting anything done with a group of people online usually involves employing a small army of apps to keep track of things.`;

const bodyB = `We designed a solution around the idea of the fewest necessary features for effective collaboration. It doesn't have everything but it has more than enough to get you started. Tiny teams is a single page where you can chat, make decisions, and get stuff done.`;

export const Static = () => (
  <section className="cf ph3 ph5-ns pv5 vh-75 bg-light-yellow">
    <header className="fn fl-ns w-50-ns pr4-ns">
      <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bt bw2">Tiny Teams</h1>
      <h2 className="f3 mid-gray lh-title">
        A collaborative decision making tool for remote teams.
      </h2>

      <Players />
    </header>
    <div className="fn fl-ns w-50-ns">
      <Docs />

      {/* <p className="f5 lh-copy measure mt0-ns">{bodyA}</p>
      <p className="f5 lh-copy measure">{bodyB}</p>
      <h3 className="mt5">Important Project Links</h3>
      <ul>
        <li>
          <a href="https://github.com/joshpitzalis/tinyteams/issues">
            Report an Issue
          </a>
        </li>
      </ul> */}
    </div>
  </section>
);

const Players = () => (
  <div className="flex">
    <img
      src="http://mrmrs.github.io/photos/p/4.jpg"
      className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
    />
    <img
      src="http://mrmrs.github.io/photos/p/5.jpg"
      className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
    />
    <img
      src="http://mrmrs.github.io/photos/p/6.jpg"
      className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
    />
  </div>
);

const Docs = () => (
  <main className="mw6 center">
    <article>
      <a className="link dt w-100 bb b--black-10 pb2 mt2 dim blue" href="#0">
        <div className="dtc w3">
          <img
            src="http://mrmrs.github.io/images/0004.jpg"
            className="db w-100"
          />
        </div>
        <div className="dtc v-top pl2">
          <h1 className="f6 f5-ns fw6 lh-title black mv0">
            Graphic Design in IBM: Typography, Photography, and Illustration
          </h1>
          <h2 className="f6 fw4 mt2 mb0 black-60">Josef Müller-Brockmann</h2>
          <dl className="mt2 f6">
            <dt className="clip">Price</dt>
            <dd className="ml0">Download</dd>
          </dl>
        </div>
      </a>
    </article>
    <article>
      <a className="link dt w-100 bb b--black-10 pb2 mt2 dim blue" href="#0">
        <div className="dtc w3">
          <img
            src="http://mrmrs.github.io/images/0006.jpg"
            className="db w-100"
          />
        </div>
        <div className="dtc v-top pl2">
          <h1 className="f6 f5-ns fw6 lh-title black mv0">
            Fotoplakate: Von den Anfängen
          </h1>
          <h2 className="f6 fw4 mt2 mb0 black-60">Josef Müller-Brockmann</h2>
          <dl className="mt2 f6">
            <dt className="clip">Price</dt>
            <dd className="ml0">Download</dd>
          </dl>
        </div>
      </a>
    </article>
    <article>
      <a className="link dt w-100 bb b--black-10 pb2 mt2 dim blue" href="#0">
        <div className="dtc w3">
          <img
            src="http://mrmrs.github.io/images/0030.jpg"
            className="db w-100"
          />
        </div>
        <div className="dtc v-top pl2">
          <h1 className="f6 f5-ns fw6 lh-title black mv0">
            The Graphic Artist
          </h1>
          <h2 className="f6 fw4 mt2 mb0 black-60">Josef Müller-Brockmann</h2>
          <dl className="mt2 f6">
            <dt className="clip">Price</dt>
            <dd className="ml0">Download</dd>
          </dl>
        </div>
      </a>
    </article>
    <article className="mt2">
      <a className="link dt w-100  b--black-10 dim blue" href="#0">
        <div className="dtc w3">
          {/* <img
            src="http://mrmrs.github.io/images/0010.jpg"
            className="db w-100"
          /> */}
        </div>
        <div className="dtc v-top pl2">
          <h1 className="f6 f5-ns fw6 lh-title black mv0">
            A History of Visual Communication (Geschichte der visuellen
            Kommunikation)
          </h1>
          <h2 className="f6 fw4 mt2 mb0 black-60 link blue underline">
            Josef Müller-Brockmann
          </h2>
          <dl className="mt2 f6">
            <dt className="clip">Price</dt>
            {/* <dd className="ml0">Download</dd> */}
          </dl>
        </div>
      </a>
    </article>
  </main>
);
