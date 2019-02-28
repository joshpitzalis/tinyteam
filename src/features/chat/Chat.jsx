import React from 'react';
import { Machine, send } from 'xstate';
import { CommentsContext } from '../../context/CommentsContext';
import { useMachine } from '../../hooks/useMachine';
import Modal from '../modals/Modal';
import { todoMachine } from '../tasks/index';
import { ListCreator } from '../tasks/ListCreator';
import { Message } from './Message';
export const chatMachine = Machine({
  id: 'chat',
  initial: 'idle',
  context: { message: '' },
  states: {
    idle: {
      invoke: {
        id: 'todo',
        src: todoMachine
      },
      on: {
        COMMENT_SUBMITTED: {
          actions: 'addComment'
        },
        COMMENT_STARRED: {
          actions: send('OPENED_TASK_LIST_CREATOR', {
            to: 'todo'
          })
        }
      }
    }
  }
});

const Chat = () => {
  const { comments, addComment } = React.useContext(CommentsContext);
  const [value, setValue] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [state, send] = useMachine(
    chatMachine.withConfig({
      actions: {
        addComment: (ctx, e) => addComment(e.payload)
      }
    })
  );
  const inputEl = React.useRef(null);
  React.useEffect(() => {
    inputEl.current.scrollTop = inputEl.current.scrollHeight;
  }, [comments]);

  const dispatch = action => {
    action.payload.updateLists(action.payload.list);
    setModal(false);
  };

  return (
    <section className="ph3 ph5-ns pv5">
      <div
        className="mw9 center br2 ba br--top pa3 b--silver vh-50"
        id="messageList"
      >
        <ul
          className="pl0 h-100 comment"
          style={{ overflowY: 'scroll' }}
          ref={inputEl}
        >
          {comments &&
            comments.map(item => (
              <Message
                item={item}
                send={action => {
                  setModal(true);
                  setTitle(action.payload);
                }}
              />
            ))}
        </ul>
      </div>
      <form
        className="pa3 bg-silver br2 br--bottom flex"
        onSubmit={e => {
          e.preventDefault();
          send({ type: 'COMMENT_SUBMITTED', payload: value });
          setValue('');
        }}
      >
        <input
          type="text"
          className="w-100 pa3 dib"
          placeholder="Add your comment here..."
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input type="submit" value="Submit" className="dib pa3" />
      </form>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <ListCreator dispatch={dispatch} providedTitle={title} />
        </Modal>
      )}
    </section>
  );
};

export default Chat;
