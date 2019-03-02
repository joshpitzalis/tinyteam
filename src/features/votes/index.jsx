import React from 'react';
import { Machine } from 'xstate';
import { useFireColl } from '../../hooks/firebase';
import { useMachine } from '../../hooks/useMachine';
import Modal from '../modals/Modal';
import { CreatePoll } from './CreatePoll';
import { Poll } from './Poll';
import { Vote } from './Vote';

export const voteMachine = Machine({
  id: 'votes',
  initial: 'idle',
  states: {
    idle: {
      on: {
        POLL_CREATE_FORM_OPENED: 'newVote',
        EXISTING_POLL_OPENED: 'existingVote'
      }
    },
    newVote: {
      on: {
        MODAL_CLOSED: 'idle',
        POLL_CREATED: 'loading'
      }
    },
    existingVote: {
      on: {
        MODAL_CLOSED: 'idle'
      }
    },
    loading: {
      on: {
        SUCCEEDED: 'idle',
        ERRORED: 'error'
      }
    },
    error: {
      on: {
        MODAL_CLOSED: 'idle'
      }
    }
  }
});

const Votes = () => {
  const polls = useFireColl(`decisions`);
  const [state, send] = useMachine(voteMachine);
  const [id, setId] = React.useState('');
  console.log('decision', polls);
  return (
    <section className="mw9 center pa3 pa5-ns ">
      {state.matches('loading') && <p>Loading...</p>}
      {state.matches('error') && <p>Error!</p>}
      {state.matches('idle') && (
        <>
          <div className="flex items-center justify-between">
            <h2>Current Decisions</h2>
            <button onClick={() => send('POLL_CREATE_FORM_OPENED')}>
              + Create a new vote
            </button>
          </div>
          {polls &&
            polls.map(poll => (
              <Vote key={poll.id} {...poll} dispatch={send} setId={setId} />
            ))}
        </>
      )}
      {state.matches('newVote') && (
        <Modal onClose={() => send('MODAL_CLOSED')}>
          <CreatePoll dispatch={send} />
        </Modal>
      )}

      {state.matches('existingVote') && (
        <Modal onClose={() => send({ type: 'MODAL_CLOSED' })}>
          <Poll poll={polls.find(poll => poll.id === id)} />
        </Modal>
      )}
    </section>
  );
};

export default Votes;
