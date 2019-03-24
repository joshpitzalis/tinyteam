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

  it.only('archives and unarchives a task', () => {
    user.login();
    user.visit('http://localhost:3000/')
    .contains('churn rate 2% or lower').click()
      .queryByText('churn rate 2% or lower').should('not.exist')
        .getByText('Show Archived Tasks').click()
          .getByText('churn rate 2% or lower').click()
            .getByText('churn rate 2% or lower').should('exist')
      
  });

  it.skip('Let me archive a task list', () => {});

  it.skip('Let me archive a decision', () => {});
});
