import React from 'react';
import { connect } from 'react-redux';
import { Box, Flex, Heading } from 'rebass';
import { fetchUserProjects } from '../features/auth/authOperations';
import { signedIn } from '../features/auth/authReducer';
import { auth } from '../utils/firebase';

const propTypes = {};

const defaultProps = {};

class _Login extends React.Component {
  componentDidMount() {
    const { history, handleSignedIn, getAllMyProjects } = this.props;
    auth.onAuthStateChanged(user => {
      if (user) {
        handleSignedIn(user);
        getAllMyProjects(user.uid);
        history.push(`/dashboard/${user.uid}`);
      }
    });
  }

  render() {
    return (
      <div data-testid="login">
        <Flex justifyContent="center" flexDirection="column">
          <Box flex="grow">
            <Heading>You Be Logged out</Heading>
          </Box>
        </Flex>
      </div>
    );
  }
}

const actions = {
  handleSignedIn: signedIn,
  getAllMyProjects: fetchUserProjects,
};

export default connect(
  null,
  actions
)(_Login);

_Login.propTypes = propTypes;
_Login.defaultProps = defaultProps;
