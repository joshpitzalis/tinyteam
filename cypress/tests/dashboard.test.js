import { hacker } from 'faker';

describe('Dashboard', () => {
  const newProjectName = `${hacker.verb()} ${hacker.adjective()} ${hacker.noun()}`;

  const user = cy;

  it('shows me all the projects I am a part of', () => {
    user
      .login()
      .visit('/')
      .getByTestId('dashboard')
      .getByText('devteam123test');
  });

  it('lets me create a new project', () => {
    user
      .login()
      .visit('/')
      .getByTestId('dashboard')
      .getByText('devteam123test')
      // get length of projects
      .getByTestId('createNewProject')
      .click();
    // measure lengths again
  });

  // newProjectName

  it('lets me delete a project', () => {
    user
      .login()
      .visit('/')
      .getByTestId('dashboard')
      .getByText('devteam123test')
      // get length of projects
      .getByTestId('createNewProject')
      .click();
    // measure lengths again
  });

  it.only('project shoudl loads when i am inside the dashboard not kjust on route', () => {
    throw new Error('not written yet');
  });

  it('clicking ona  projec takes me to teh project', () => {
    throw new Error('not written yet');
  });

  it('see little pictures of everynes face on project', () => {
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

  it('ensures only people on a project have access to that projects data', () => {
    throw new Error('not written yet');
  });
});
