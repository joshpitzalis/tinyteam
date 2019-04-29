describe('Authentication', () => {
  it('login, logout, check protected pages', () => {
    cy.login()
      // lets me log in
      .visit('/')
      .getByText('devteam123test')
      // lets me logout
      .getByTestId('dashboardPage')
      .getByTestId('navDropdown')
      .click()
      .getByText(/logout/i)
      .click()
      .getByText('You Be Logged out')
      // protects authenticated pages if I am logged out
      .visit('dashboard/goYvbvDdgsPzb2IwAvmbKIS2noH2')
      .getByText('You Be Logged out');
  });
});
