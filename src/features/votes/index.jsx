import React from 'react';
import { State, withStateMachine } from 'react-automata';
import { useFireColl } from '../../hooks/firebase';
import { firestore } from '../../utils/firebase';
import Modal from '../modals/Modal';
import { CreatePoll } from './CreatePoll';
import { Poll } from './Poll';
import { Vote } from './Vote';

export const voteMachine = {
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
      onEntry: 'createNewPoll',
      on: {
        SUCCEEDED: 'idle',
        ERRORRED: 'error'
      }
    },
    error: {
      on: {
        MODAL_CLOSED: 'idle'
      }
    }
  }
};

class Polls extends React.PureComponent {
  state = {
    payload: null,
    error: null
  };

  createNewPoll = async (data = this.state.payload) => {
    const { transition } = this.props;
    try {
      const vote = await firestore.collection(`decisions`).doc();
      await firestore.doc(`decisions/${vote.id}`).set({
        title: data.title,
        createdBy: 'Josh',
        deadline: '7 days',
        id: vote.id
      });

      for (const option of data.fields) {
        const newTask = await firestore
          .collection(`decisions/${vote.id}/options`)
          .doc();
        await firestore
          .doc(`decisions/${vote.id}/options/${newTask.id}`)
          .set({ title: option, id: newTask.id });
      }

      transition('SUCCEEDED');
    } catch (error) {
      transition('ERRORRED', { error });
    }
  };

  set = payload => this.setState({ payload });

  render() {
    console.log('this.props.error', this.props.error);
    return <Votes transition={this.props.transition} set={this.set} />;
  }
}

const Votes = ({ transition, set }) => {
  const polls = useFireColl(`decisions`);
  const [id, setId] = React.useState('');
  return (
    <section className="mw9 center pa3 pa5-ns ">
      <State is="loading">Loading...</State>
      <State is="error">Error!</State>
      <State is="idle">
        <div className="flex items-center justify-between">
          <h2 className="f5 fw2">Current Team Decisions</h2>
          <button onClick={() => transition('POLL_CREATE_FORM_OPENED')}>
            + Create A New Decision
          </button>
        </div>
        {polls &&
          polls.map(poll => (
            <Vote key={poll.id} {...poll} dispatch={transition} setId={setId} />
          ))}
      </State>
      <State is="newVote">
        <Modal onClose={() => transition('MODAL_CLOSED')}>
          <CreatePoll dispatch={transition} set={set} />
        </Modal>
      </State>
      <State is="existingVote">
        <Modal onClose={() => transition({ type: 'MODAL_CLOSED' })}>
          <Poll
            poll={polls.find(poll => poll.id === id)}
            transition={transition}
          />
        </Modal>
      </State>
    </section>
  );
};

export default withStateMachine(voteMachine)(Polls);
