import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, render } from 'react-testing-library';
import App from './pages/Project';
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });



afterEach(cleanup);

test('App starts', async () => {
  const { getByText } = render(<App />);
  expect(getByText('Duck Soup')).toBeInTheDocument();
});