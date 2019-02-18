import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import Chat from './Chat';

const Votes = () => {
  const [visible, setVisibility] = React.useState(false);

  return (
    <section className="mw9 center ph3 ph4-ns ">
      <div className="flex items-center justify-between">
        <h2>Current Decisions</h2>{' '}
        <Link to="/" className="">
          + Create a new vote
        </Link>
      </div>
      {visible && (
        <Modal onClose={() => setVisibility(false)}>
          <Poll />
          <Chat />
        </Modal>
      )}
      <Vote show={setVisibility} />
      <Vote show={setVisibility} />
      <Vote show={setVisibility} />
    </section>
  );
};

const Vote = ({ show }) => {
  return (
    <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
      <div class="dtc w5 v-mid">
        <div class="f3 f2-ns b ml0">3 days left</div>{' '}
      </div>
      <div class="dtc v-mid pl3">
        <h1 class="f6 f5-ns fw6 lh-title black mv0">
          Should we something about something?
        </h1>
        <time className="f6 ttu tracked gray">16 people voted</time>
      </div>
      <div class="dtc v-mid">
        <button
          class="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"
          onClick={() => show(true)}
        >
          Vote
        </button>
      </div>
    </article>
  );
};

export default Votes;

const Poll = () => {
  const questions = ['option 1', 'option 2'];

  const handleChange = () => console.log('frog');

  return (
    <section className="mw6-ns w-100 center tc ">
      <header>
        <h2 className="f1 lh-title">Example poll</h2>
        <h3>A little desctiption goes here</h3>
      </header>
      <hr className="dn" />
      <form className="mt3">
        <div className="ma0">
          {questions.map((question, index) => (
            <div
              key={index}
              className="pa2 ma0 roundfirstAndlast bg-white"
              id={
                {
                  0: 'yellow',
                  1: 'orange',
                  2: 'red',
                  3: 'blue',
                  4: 'green'
                }[index < 5 ? index : Math.floor(Math.random() * 4) + 1]
              }
            >
              <label className="container tl ma0 relative ">
                <input
                  type="radio"
                  name="responses"
                  value={question}
                  onChange={e => handleChange(e, question)}
                />{' '}
                {question}
                <span className="radiomark" />
              </label>
            </div>
          ))}
        </div>
        <input type="submit" value={'Submit'} />
      </form>
      <h3>2 days and 45 minutes left...</h3>
    </section>
  );
};
