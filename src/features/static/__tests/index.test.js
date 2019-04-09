import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { Static } from '../index';
import { TeamStats } from '../TeamStats';

afterEach(cleanup);

it('Team stats snapshot', () => {
  const { asFragment } = render(<TeamStats />);
  expect(asFragment()).toMatchSnapshot();
});

it.skip('my little head shows up in the static section when I sign in', async () => {
  const { queryByTestId, getByTestId } = render(<Static />);
  getByTestId('goalRoad');
  expect(queryByTestId('detailsBox')).toBeNull();
  fireEvent.click(getByTestId('objective'));
  getByTestId('detailsBox');
});

// make my head show up in users
// make stats show up on static

// make timeline appear in tasks
