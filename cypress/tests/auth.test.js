describe('Dashboard', () => {
  const user = cy;

  it('lets me log in', () => {
    user
      .login()
      .visit('/')
      .getByTestId('dashboard')
      .getByText('devteam123test');
  });

  it.skip('lets me log out', () => {
    user
      .login()
      .visit('/')
      .getByTestId('dashboard')
      .getByText('devteam123test');
  });

  it.skip('protects authenticated pages if I am logged out', () => {
    user
      .login()
      .visit('/')
      .getByTestId('dashboard')
      .getByText('devteam123test');
  });
});
