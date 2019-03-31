import { Button, Comment, Form, Input, List } from 'antd';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { useAuth } from '../../hooks/auth';
import { useFireColl } from '../../hooks/firebase';
import { firestore } from '../../utils/firebase';

const TextArea = Input.TextArea;

class App extends PureComponent {
  static propTypes = {
    listId: PropTypes.string.isRequired,
  };

  state = {
    submitting: false,
    value: '',
  };

  handleSubmit = async name => {
    if (!this.state.value) {
      return;
    }

    try {
      const { listId } = this.props;

      this.setState({
        submitting: true,
      });
      const comment = await firestore
        .collection(`discussions/${listId}/comments`)
        .doc();

      firestore
        .doc(`discussions/${listId}/comments/${comment.id}`)
        .set({
          id: comment.id,
          author: name,
          // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: this.state.value,
          datetime: new Date(),
        })
        .then(() =>
          this.setState({
            submitting: false,
            value: '',
          })
        );
    } catch (error) {
      console.error('error adding a comment to the discussion', error);
    }
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { submitting, value } = this.state;
    const { listId } = this.props;

    return (
      <div className="tl bg-white">
        <hr />
        <CommentList listId={listId} />
        <Comment
          // avatar={
          //   <Avatar
          //     src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          //     alt="Han Solo"
          //   />
          // }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}

export default App;

const CommentList = ({ listId }) => {
  const comments = useFireColl(`discussions/${listId}/comments`)
    .sort((a, b) => a.datetime.seconds - b.datetime.seconds)
    .map(comment => ({
      ...comment,
      datetime: null,
      // <Tooltip
      //   title={moment()
      //     .subtract(1, 'days')
      //     .format('YYYY-MM-DD HH:mm:ss')}
      // >
      //   <span>
      //     {moment()
      //       .subtract(1, 'days')
      //       .fromNow()}
      //   </span>
      // </Tooltip>
    }));

  return comments.length > 0 ? (
    <List
      dataSource={comments}
      // header={`${comments.length} ${
      //   comments.length > 1 ? 'Comments' : 'Comment'
      // }`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  ) : null;
};

const Editor = ({ onChange, onSubmit, submitting, value }) => {
  const user = useAuth();
  return (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={() => onSubmit(user.displayName)}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );
};
