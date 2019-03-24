/**
 * @param {String} selectorValue - Value of the selector
 */
const grab = selectorValue => `[data-test=${selectorValue}]`;

describe('My First Test', () => {
  const user = cy;
  it('Checks the page loaded', () =>
    user
      .visit('http://localhost:3000/')
      .get('.pr4-ns > .f2')
      .should('have.text', 'Tiny Teams'));

  it('Checks authenticated pages load', () => {
    user.login();
    user.visit('http://localhost:3000/').contains('Analytics');
  });

  it('creates and archives a task', () => {
    user.login();
    user.visit('http://localhost:3000/').contains('churn rate');
  });

  it('Let me archive a task list', () => {});

  it('Let me archive a decision', () => {});
});
