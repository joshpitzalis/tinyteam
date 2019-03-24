import { Box, Button, Heading } from 'grommet';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export const Header = ({ dispatch, type, sectionTitle }) => (
  <Box
    className="bb b--black-05 w-100 mw9"
    justify="between"
    direction="row"
    margin={{ vertical: 'medium' }}
    alignContent="center"
  >
    <span className="flex items-baseline">
      <Heading level={2}>{sectionTitle}</Heading>
      <Button
        icon={<Add />}
        data-testid="createTask"
        onClick={() => dispatch({ type })}
      />
    </span>
    <span />
  </Box>
);

Header.propTypes = propTypes;
