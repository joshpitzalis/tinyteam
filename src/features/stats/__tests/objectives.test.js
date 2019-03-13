import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { Stats } from '../index';

afterEach(cleanup);

it('shows goal details when I hover', async () => {
  const {  queryByTestId, getByTestId } = render(
      <Stats />
  );
getByTestId('goalRoad')
expect(queryByTestId('detailsBox')).toBeNull()
  fireEvent.click(getByTestId('objective'));
  getByTestId('detailsBox')


// tk reduce objectives array into mark object liket he one above
// correct color
// correct date
// correct details

//   await waitForElement(() => getByTestId('taskListCreator'));
  //   fireEvent.change(getByTestId('titleInput'), {
  //     target: { value: 'Thingy List' }
  //   });

});
it.skip('shows the current day', () => {});
it.skip('lets me add a goal', () => {});
it.skip('lets me move a goal', () => {});
it.skip('makes sure goals drag', () => {});
it.skip('adjust teh size of a goal to make it more important', () => {});
it.skip('assign a person to an objective', () => {});
it.skip('makes sure goals are different colours', () => {});
it.skip('a road must always have atleast one goal', () => {});
it.skip('connect a list to goal by colour', () => {});
it.skip('connect a decision to goal by colour', () => {});
it.skip('filter all activities onboard by clicking on a goal', () => {});
it.skip('tooltip shows the date', () => {});
it.skip('date resets to correct date when you leave the component', () => {});
