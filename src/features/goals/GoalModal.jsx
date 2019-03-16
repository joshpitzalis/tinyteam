import { Box, Button, Calendar, Form, FormField, Layer, Text } from 'grommet';
import React from 'react';
import { convertDaysToDate } from './helpers';

export const GoalModal = ({ onClose, deadline, startDate, createNewGoal }) => {
  const [date, setDate] = React.useState(
    new Date(convertDaysToDate(deadline, startDate)).toISOString()
  );

  const [colour, setColor] = React.useState('white');
  const [error, setError] = React.useState({});

  const handleSubmit = values => {
    if (!values.name) {
      setError({ name: true });
      return;
    }

    if (colour === 'white') {
      setError({ color: true });
      return;
    }
    createNewGoal(values.name, new Date(date), colour);
    onClose();
  };

  return (
    <Layer
      position="center"
      margin="large"
      onClickOutside={onClose}
      modal
      responsive
    >
      <Box pad="medium" gap="large" border={{ color: colour, size: 'xlarge' }}>
        <Form onSubmit={event => handleSubmit(event.value)}>
          <FormField
            name="name"
            label="Name Your Goal"
            error={error.name && 'A goal must have a name.'}
          />
          <Calendar
            size="small"
            date={date}
            onSelect={datex => setDate(datex)}
            margin="medium"
          />
          <Text size="small" color={error.color && 'red'}>
            {error.color
              ? 'You must pick a colour for this goal'
              : 'Pick a colour for this goal'}
          </Text>
          <Box direction="row" wrap>
            {['#f37966', '#adcfe2', '#dce8bd'].map(backgroundColor => (
              <Box
                style={{
                  backgroundColor,
                }}
                onClick={() => setColor(backgroundColor)}
                pad="medium"
                margin="small"
              />
            ))}
          </Box>
          <Box>
            <Button type="submit" primary label="Submit" margin="medium" />
          </Box>
        </Form>
      </Box>
    </Layer>
  );
};
