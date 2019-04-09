import { createMemoryHistory } from 'history';
import 'jest-dom/extend-expect';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { cleanup, render } from 'react-testing-library';
import { Routes } from '../../../Routes';
import store from '../../../store';

afterEach(cleanup);

it('signing in shows you all the projects you work on', async () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { queryByTestId, getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
  getByTestId('login');
  expect(queryByTestId('dashboard')).toBeNull();
  //   fireEvent.click(getByTestId('signin'));
  //   expect(queryByTestId('login')).toBeNull();
  //   getByTestId('dashboard');
});

// project shows list of people with permissions to that project
// show projects
// crud projects
// invite/remove people from projects
