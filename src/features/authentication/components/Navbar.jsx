import { Button, Menu } from 'grommet';
import { Notification } from 'grommet-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Logo from '../../../images/tiny_logo.png';
import { AUTH_STATUS_CHECKED, LOG_OUT_REQUEST } from '../constants';
import { getAuthStatus } from '../selectors';

const propTypes = {
  signedIn: PropTypes.bool,
  handleSignIn: PropTypes.func.isRequired,
  handleSignout: PropTypes.func.isRequired,
};

const defaultProps = { signedIn: false };

export const Nav = ({ signedIn, handleSignIn, handleSignout }) => {
  return (
    <nav className="pa3 ph5-ns">
      <div className="ph4 dt border-box w-100 ">
        <a className="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
          <img src={Logo} className="dib w3 h3 br-100" alt="Site Name" />
        </a>
        <div className="dtc v-mid w-75 tr">
          {signedIn ? (
            <Menu
              label={<Notification />}
              items={[
                // { label: 'Dashboard', onClick: () => {} },
                // { label: 'Proposals', onClick: () => {} },
                // { label: 'Active Disputes', onClick: () => {} },
                { label: 'Logout', onClick: () => handleSignout() },
              ]}
            />
          ) : (
            <Button size="large" onClick={() => handleSignIn()}>
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

const select = store => ({
  signedIn: getAuthStatus(store),
});

const actions = {
  handleSignIn: () => ({ type: AUTH_STATUS_CHECKED }),
  handleSignout: () => ({ type: LOG_OUT_REQUEST }),
};

export const Navbar = connect(
  select,
  actions
)(Nav);

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
