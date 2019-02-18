import React from 'react';
import { CommentsConsumer } from '../context/CommentsContext';
const Chat = () => {
  // const { comments } = React.useContext(CommentsConsumer);

  const [message, setMessage] = React.useState('');

  return (
    <CommentsConsumer>
      {({ comments, addComment }) => (
        <section className="ph3 ph5-ns pv5">
          <div className="mw9 center br2 ba br--top pa3 b--silver vh-50">
            <ul className="comments pl0">
              {comments.map(item => (
                <li>
                  <h4>
                    <span className="author">{`${item.author} `}</span>
                    <span className="date">
                      on {` ${item.created.toLocaleDateString()}`}
                    </span>
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
              addComment(message);
              setMessage('');
            }}
          >
            <input
              type="text"
              className="w-100 pa3 dib"
              placeholder="Add your comment here..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <input type="submit" value="Submit" className="dib pa3" />
          </form>
        </section>
      )}
    </CommentsConsumer>
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
