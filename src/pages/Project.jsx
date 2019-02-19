import React from 'react';
import Chat from '../features/chat/Chat';
import Tasks from '../features/tasks';
import Votes from '../features/votes';

const Project = () => {
  return (
    <article>
      <section className="cf ph3 ph5-ns pv5">
        <header className="fn fl-ns w-50-ns pr4-ns">
          <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bt bw2">Tiny Teams</h1>
          <h2 className="f3 mid-gray lh-title">
            A collaborative decision making tool for remote teams.
          </h2>
          <div className="flex">
            {' '}
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
        </header>
        <div className="fn fl-ns w-50-ns">
          <p className="f5 lh-copy measure mt0-ns">
            TYPOGRAPHY, even when poorly executed, can never be taken for
            granted; nor is it ever accidental. Indeed, beauti- fully typeset
            pages are always the result of long experience. Now and then they
            even attain the rank of great artistic achievement. But the art of
            typesetting stands apart from ex- pressive artwork, because the
            appeal is not limited to a small circle. It is open to everyone's
            critical judgment, and nowhere does this judgment carry more weight.
            Typography that can- not be read by everybody is useless. Even for
            someone who constantly ponders matters of readability and
            legibility, it is difficult to determine whether something can be
            read with ease, but the average reader will rebel at once when the
            type is too small or otherwise irritates the eye; both are signs of
            a certain illegibility already.
          </p>
          <p className="f5 lh-copy measure">
            All typography consists of letters. These appear either in the form
            of a smoothly running sentence or as an assembly of lines, which may
            even have contrasting shapes. Good typog- raphy begins, and this is
            no minor matter, with the typeset- ting of a single line of text in
            a book or a newspaper. Using exactly the same typeface, it is
            possible to create either a pleasant line, easily read, or an
            onerous one. Spacing, if it is too wide or too compressed, will
            spoil almost any typeface.
          </p>
          <ul>
            <li>Link to Website</li>
            <li>Google Drive</li>
            <li>Github</li>
          </ul>
        </div>
      </section>

      <Chat />
      <Votes />
      <Tasks />

      <section className="pa3 pa5-ns" data-name="slab-stat-small">
        <h3 className="f6 ttu tracked">Today</h3>
        <div className="cf">
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">Votes cast</dd>
            <dd className="f3 fw6 ml0">24</dd>
          </dl>
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">Todos created</dd>
            <dd className="f3 fw6 ml0">3</dd>
          </dl>
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">Hour Worked</dd>
            <dd className="f3 fw6 ml0">44</dd>
          </dl>
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">Chat Comments</dd>
            <dd className="f3 fw6 ml0">102</dd>
          </dl>

          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">People</dd>
            <dd className="f3 fw6 ml0">3</dd>
          </dl>
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title">
            <dd className="f6 fw4 ml0">Days left</dd>
            <dd className="f3 fw6 ml0">126</dd>
          </dl>
        </div>
      </section>
      <div className="mw9 center ph3 ph5-ns">
        <progress value="22" max="100" className=" w-100 " />
      </div>
    </article>
  );
};

export default Project;
