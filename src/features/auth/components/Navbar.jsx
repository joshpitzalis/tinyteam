import { Button, Menu } from 'grommet';
import { Notification } from 'grommet-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logo from '../../../images/tiny_logo.png';
import { auth, googleAuthProvider } from '../../../utils/firebase';

const propTypes = {
  signedIn: PropTypes.bool,
  handleSignIn: PropTypes.func.isRequired,
  handleSignout: PropTypes.func.isRequired,
};

const defaultProps = { signedIn: false };

export const Nav = ({
  signedIn,
  handleSignIn,
  handleSignout,
  history,
  userId,
}) => (
  <nav className="pa3 ph5-ns">
    <div className="ph4 dt border-box w-100 ">
      <div
        className="dtc v-mid mid-gray link dim w-25"
        data-testid="goTodashboard"
        onClick={() => history.push(`/dashboard/${userId}`)}
      >
        <img src={Logo} className="dib w3 h3 br-100" alt="Site Name" />
      </div>
      <div className="dtc v-mid w-75 tr">
        {signedIn ? (
          <Menu
            label={<Notification />}
            data-testid="navDropdown"
            items={[
              // { label: 'Dashboard', onClick: () => {} },
              // { label: 'Proposals', onClick: () => {} },
              // { label: 'Active Disputes', onClick: () => {} },
              {
                label: 'Dashboard',
                onClick: () => history.push(`/dashboard/${userId}`),
              },
              {
                label: 'Logout',
                onClick: () => {
                  auth
                    .signOut()
                    .then(() => handleSignout())
                    .catch(error => console.error('error signing out', error));
                },
              },
            ]}
          />
        ) : (
          <Button
            size="large"
            data-testid="login"
            onClick={() => {
              auth
                .signInWithPopup(googleAuthProvider)
                .then(user => {
                  handleSignIn();
                  history.push(`/dashboard/${user.uid}`);
                })
                .catch(error => console.error('error signing in', error));
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  </nav>
);
export const getAuthStatus = store => store.auth.status;

const select = store => ({
  signedIn: getAuthStatus(store),
});

const actions = {
  handleSignIn: () => ({ type: 'SIGNED_IN' }),
  handleSignout: () => ({ type: 'SIGNED_OUT' }),
};

export const Navbar = connect(
  select,
  actions
)(withRouter(Nav));

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
