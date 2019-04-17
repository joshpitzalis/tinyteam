import React from 'react';
import { State, withStateMachine } from 'react-automata';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box, Flex, Heading } from 'rebass';
import { fetchUserProjects } from '../features/auth/authOperations';
import { signedIn } from '../features/auth/authReducer';
import { auth } from '../utils/firebase';

export const authStateMachine = {
  initial: 'loading',
  states: {
    loading: {
      onEntry: 'checkAuth',
      on: {
        AUTH: 'redirect',
        NO_AUTH: 'loggedOut',
        ERRORED: 'error',
      },
    },
    redirect: {},
    loggedOut: {
      on: {
        LOGGED_IN: 'loading',
      },
    },
    error: {
      on: {
        RETRIED: 'loading',
        cancel: 'loggedOut',
      },
    },
  },
};

const propTypes = {};

const defaultProps = {};

class _Login extends React.Component {
  checkAuth = () => {
    const { transition, handleSignedIn, getAllMyProjects } = this.props;
    auth.onAuthStateChanged(user => {
      if (user) {
        handleSignedIn(user);
        getAllMyProjects(user.uid);
        return transition('AUTH', {
          user,
          redirectTo: `/dashboard/${user.uid}`,
        });
      }
      return transition('NO_AUTH');
    });
  };

  render() {
    const { redirectTo } = this.props;
    return (
      <React.Fragment>
        <State is="redirect">
          {redirectTo && <Redirect to={redirectTo} />}
        </State>
        <State is="loading">Loading...</State>
        <State is="loggedOut">
          <div data-testid="login">
            <Flex justifyContent="center" flexDirection="column">
              <Box flex="grow">
                <Heading>You Be Logged out</Heading>
              </Box>
            </Flex>
          </div>
        </State>
      </React.Fragment>
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
)(withStateMachine(authStateMachine)(_Login));

_Login.propTypes = propTypes;
_Login.defaultProps = defaultProps;
