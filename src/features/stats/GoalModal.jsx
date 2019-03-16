import { Box, Button, Calendar, Form, FormField, Layer , Text} from 'grommet';
import React from 'react';
import { convertDaysToDate } from './helpers';

export const GoalModal = ({ onClose, deadline, startDate, createNewGoal }) => {
  const [date, setDate] = React.useState(
    new Date(convertDaysToDate(deadline, startDate)).toISOString()
  );

  const handleSubmit = values => {
    createNewGoal(values.name, new Date(date));
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
      <Box pad="large" gap="large">
        <Form onSubmit={event => handleSubmit(event.value)}>
          <FormField name="name" label="Name Your Goal" />
          <Calendar
            size="small"
            date={date}
            onSelect={date => {
              //   console.log('date', date);
              setDate(date);
            }}
            margin="medium"
          />

          <Box direction="row" wrap>
            {['#f7db8c', '#ffaf39', '#f37966', '#adcfe2', '#dce8bd'].map(
              backgroundColor => (
                <Box
                  style={{
                    backgroundColor
                  }}
                  pad="medium"
                  margin="medium"
                />
              )
            )}
          </Box>

          <Button type="submit" primary label="Submit" />
        </Form>
      </Box>
    </Layer>
  );
};
