describe('Dashboard', () => {
  const user = cy;

  it('lets me log in', () => {
    user
      .login()
      .visit('/')
      .getByText('devteam123test');
  });

  it('lets me log out', () => {
    user
      .login()
      .visit('/')
      .getByTestId('dashboard')
      .getByTestId('navDropdown')
      .click()
      .getByText(/logout/i)
      .click()
      .queryByTestId('dashboard')
      .should('not.exist');
  });

  it('protects authenticated pages if I am logged out', () => {
    user

      .visit('dashboard/goYvbvDdgsPzb2IwAvmbKIS2noH2')
      .queryByTestId('dashboard')
      .should('not.exist');
  });
});
