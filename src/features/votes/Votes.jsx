import React from 'react';
import { VoteContext } from '../../context/VoteContext';
import Chat from '../chat/Chat';
import Modal from '../modals/Modal';

const Votes = () => {
  const [visible, setVisibility] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const { polls } = React.useContext(VoteContext);
  const [id, setId] = React.useState(null);
  return (
    <section className="mw9 center ph3 ph4-ns ">
      <div className="flex items-center justify-between">
        <h2>Current Decisions</h2>
        <button
          onClick={() => {
            setCreating(true);
            setVisibility(true);
          }}
        >
          + Create a new vote
        </button>
      </div>
      {Object.values(polls).map(poll => (
        <Vote show={setVisibility} {...poll} setId={setId} key={poll.id} />
      ))}

      {visible && (
        <Modal onClose={() => setVisibility(false)}>
          {creating ? (
            <CreatePoll setCreating={setCreating} setId={setId} />
          ) : (
            <>
              <Poll id={id} />
              <Chat />
            </>
          )}
        </Modal>
      )}
    </section>
  );
};

const CreatePoll = ({ setCreating, setId }) => {
  const [value, setValue] = React.useState('');
  const [fields, setFields] = React.useState([]);
  const [newPoll, setPoll] = React.useState({});
  const [title, setTitle] = React.useState('');

  const { createPoll } = React.useContext(VoteContext);

  return (
    <div>
      <h1>{title ? title : 'Create Poll'}</h1>
      <ul>
        {fields.map(field => (
          <li>{field}</li>
        ))}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault();
          const id = +new Date();
          setId(id);
          setFields([...fields, value]);
          setPoll({
            title,
            id,
            createdBy: 'Josh',
            votes: 15,
            fields: [...fields, value],
            deadline: '14 days'
          });
          setValue('');
        }}
      >
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="title"
          className="db"
        />
        <input
          type="text"
          value={value}
          className="db"
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Add Option</button>
      </form>
      <br />
      <form
        onSubmit={e => {
          e.preventDefault();
          createPoll(newPoll);
          setCreating(false);
        }}
      >
        <button type="submit">Complete</button>
      </form>
    </div>
  );
};

const Vote = ({ show, title, deadline, votes, id, setId }) => {
  return (
    <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
      <div className="dtc w5 v-mid">
        <div className="f3 f2-ns b ml0">{deadline}</div>{' '}
      </div>
      <div className="dtc v-mid pl3">
        <h1 className="f6 f5-ns fw6 lh-title black mv0">{title}</h1>
        <time className="f6 ttu tracked gray">{votes} people voted</time>
      </div>
      <div className="dtc v-mid">
        <button
          className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"
          onClick={() => {
            setId(id);
            show(true);
          }}
        >
          Vote
        </button>
      </div>
    </article>
  );
};

export default Votes;

const Poll = ({ id }) => {
  const { polls } = React.useContext(VoteContext);
  const questions = polls[id].fields;
  const handleChange = () => console.log('frog');
  console.log('questions', polls[id]);
  return (
    <section className="mw6-ns w-100 center tc ">
      <header>
        <h2 className="f1 lh-title">{polls[id].title}</h2>
        <h3>A little desctiption goes here</h3>
      </header>
      <hr className="dn" />
      <form className="mt3">
        <div className="ma0">
          {questions.map((question, index) => (
            <div key={index} className="pa2 ma0  bg-white">
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
