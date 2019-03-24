import { Box, Button, Calendar, Form, FormField, Layer, Text } from 'grommet';
import React from 'react';
import { useFireDoc } from '../../hooks/firebase';
import { convertDaysToDate } from './helpers';


const handleSubmit = (values, setError, colour, createNewGoal, date, onClose) => {
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


export const GoalModal = ({ onClose, deadline, startDate, createNewGoal }) => {

  const activeColours = useFireDoc(`teams/devteam123test`);

  const deadlineDate = convertDaysToDate(deadline, startDate)
  const deadlineString = new Date(deadlineDate).toISOString()
  const [date, setDate] = React.useState(deadlineString);

  const [error, setError] = React.useState({});
  
  const [colour, setColor] = React.useState('white');
  const selectableColours = [
    '#adcfe2',
    '#588C73',
    '#8C4646',
    '#F2AE72',
    '#2F9599',
    '#A7226E',
    '#f17a6a',
    '#2F9599',
    '#A7226E',
    '#f17a6a',
  ];

  // http://everyknightshoulddesign.blogspot.com/2013/08/beautiful-color-palettes-their-hex-codes.html

  // https://digitalsynopsis.com/design/minimal-web-color-palettes-combination-hex-code/

  return (
    <Layer
      position="center"
      margin="large"
      onClickOutside={onClose}
      modal
      responsive
    >
      <Box pad="medium" gap="large" border={{ color: colour, size: 'xlarge' }}>
        <Form onSubmit={event => handleSubmit(event.value, setError, colour, createNewGoal, date, onClose)}>
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
          {activeColours.activeGoalColours && (
            <Box direction="row" justify="between">
              {selectableColours
                .filter(a => !activeColours.activeGoalColours.includes(a))
                .slice(0, 4)
                .map(backgroundColor => (
                  <Box
                    style={{
                      backgroundColor,
                    }}
                    onClick={() => setColor(backgroundColor)}
                    pad="medium"
                    margin="xsmall"
                  />
                ))}
            </Box>
          )}
          <Box
        >
            <Button type="submit"  label="Submit" margin="medium" 
               />
          </Box>
        </Form>
      </Box>
    </Layer>
  );
};
