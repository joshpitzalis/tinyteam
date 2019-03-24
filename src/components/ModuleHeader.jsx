import { Box, Button } from 'grommet';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export const Header = ({ dispatch, type }) => (
  <Box className="bb b--black-05 w-100 mw9" margin={{ vertical: 'medium' }}>
    <Button
      icon={<Add />}
      alignSelf="end"
      data-testid="createTask"
      onClick={() => dispatch({ type })}
    />
  </Box>
);

Header.propTypes = propTypes;
