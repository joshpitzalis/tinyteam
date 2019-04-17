describe('Dashboard', () => {
  const user = cy;

  it('shows me all the projects I am a part of', () => {
    user
      .login()
      .visit('/')
      .getByTestId('dashboard')
      .getByText('devteam123test');
  });

  it('lets me create a new project', () => {
    throw new Error('not written yet');
  });

  it('lets me delete a project', () => {
    throw new Error('not written yet');
  });

  it('lets me invite people to a project', () => {
    throw new Error('not written yet');
  });

  it('sends an email notofocation to invitee', () => {
    throw new Error('not written yet');
  });

  it('lets you remove people from a project', () => {
    throw new Error('not written yet');
  });

  it('ensures  only people on a project have access to that projects data', () => {
    throw new Error('not written yet');
  });
});
