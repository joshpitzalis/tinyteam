import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box, Flex, Heading } from 'rebass';
import { getAuthStatus, getUserId } from '../features/authentication/selectors';

const propTypes = {};

const defaultProps = {};

const _Login = ({ signedIn, userId }) => {
  if (signedIn) {
    return <Redirect to={`/dashboard/${userId}`} />;
  }
  return (
    <div data-testid="login">
      <Flex justifyContent="center" flexDirection="column">
        <Box flex="grow">
          <Heading>Logins</Heading>
        </Box>
      </Flex>
    </div>
  );
};

const select = store => ({
  signedIn: getAuthStatus(store),
  userId: getUserId(store),
});

export const Login = connect(select)(_Login);

export default Login;

_Login.propTypes = propTypes;
_Login.defaultProps = defaultProps;
