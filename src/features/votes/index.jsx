import React from 'react';
import { VoteContext } from '../../context/VoteContext';
import Chat from '../chat/Chat';
import Modal from '../modals/Modal';
import { CreatePoll } from './CreatePoll';
import { Poll } from './Poll';
import { Vote } from './Vote';

const voteReducer = (state, action) => {
  switch (action.type) {
    case 'POLL_CREATE_FORM_OPENED':
      return { ...state, visible: true, creating: true };
    case 'UPVOTED':
      return { ...state, visible: true, id: action.payload };
    case 'MODAL_CLOSED':
      return { ...state, visible: false };
    case 'POLL_CREATED':
      action.payload.createPoll(action.payload.newPoll);
      return {
        ...state,
        creating: false,
        id: action.payload.newPoll.id
      };
    default:
      throw new Error('You have probably mispelt an action name');
  }
};

const Votes = () => {
  const { polls } = React.useContext(VoteContext);
  const [state, dispatch] = React.useReducer(voteReducer, {
    visible: false,
    creating: false
  });
  return (
    <section className="mw9 center ph3 ph4-ns ">
      <div className="flex items-center justify-between">
        <h2>Current Decisions</h2>
        <button onClick={() => dispatch({ type: 'POLL_CREATE_FORM_OPENED' })}>
          + Create a new vote
        </button>
      </div>
      {polls &&
        Object.values(polls).map(poll => (
          <Vote key={poll.id} {...poll} dispatch={dispatch} />
        ))}

      {state.visible && (
        <Modal onClose={() => dispatch({ type: 'MODAL_CLOSED' })}>
          {state.creating ? (
            <CreatePoll dispatch={dispatch} />
          ) : (
            <>
              <Poll id={state.id} />
              <Chat />
            </>
          )}
        </Modal>
      )}
    </section>
  );
};

export default Votes;
