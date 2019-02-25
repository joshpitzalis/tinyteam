import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, render } from 'react-testing-library';
import App from './pages/Project';

afterEach(cleanup);

test('App starts', async () => {
  const { getByText } = render(<App />);
  expect(getByText('Tiny Teams')).toBeInTheDocument();
});