import formatDistance from 'date-fns/formatDistance';
import React from 'react';
import { Machine } from 'xstate';
import { CommentsContext } from '../../context/CommentsContext';
import { useMachine } from '../../hooks/useMachine';

export const chatMachine = Machine({
  id: 'chat',
  initial: 'idle',
  context: { message: '' },
  states: {
    idle: {
      on: {
        COMMENT_SUBMITTED: {
          actions: (ctx, e) => e.payload.addComment(e.payload.value)
        }
      }
    }
  }
});

const Chat = () => {
  const { comments, addComment } = React.useContext(CommentsContext);
  const [value, setValue] = React.useState('');
  const [state, send] = useMachine(chatMachine);
  const inputEl = React.useRef(null);
  React.useEffect(() => {
    inputEl.current.scrollTop = inputEl.current.scrollHeight;
  }, [comments]);
  console.log('state', state);
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
              <li key={item.postId}>
                <h4>
                  <span className="author">{`${item.author} `}</span>
                  <small className="date fw1">
                    {item.created &&
                      ` ${formatDistance(
                        new Date(),
                        new Date(item.created)
                      )} ago`}
                  </small>
                </h4>
                <p>{item.body}</p>
              </li>
            ))}
        </ul>
      </div>
      <form
        className="pa3 bg-silver br2 br--bottom flex"
        onSubmit={e => {
          e.preventDefault();
          send({ type: 'COMMENT_SUBMITTED', payload: { addComment, value } });
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
    </section>
  );
};

export default Chat;

const Redirect = () => {
  return (
    <section className="ph3 ph5-ns pv5">
      <article className="mw9 center br2 ba b--light-blue bg-lightest-blue">
        <div className="dt-ns dt--fixed-ns w-100">
          <div className="pa3 pa4-ns dtc-ns v-mid">
            <div>
              <h2 className="fw4 blue mt0 mb3">Have a Question? </h2>
              <p className="black-70 measure lh-copy mv0">
                All discussion happens in our chatroom, jump and introduce
                yourself.
              </p>
            </div>
          </div>
          <div className="pa3 pa4-ns dtc-ns v-mid">
            <a
              href="#"
              className="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2"
            >
              Go to Slack
            </a>
          </div>
        </div>
      </article>
    </section>
  );
};
