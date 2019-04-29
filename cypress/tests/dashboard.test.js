import { hacker } from 'faker';

describe('Dashboard', () => {
  const newProjectName = hacker.noun();

  const user = cy;

  it.skip('shows a placeholder or it shows no projects text', () => {
    // cant implement this till I'm testing with a new user
    user
      .login()
      .visit('/')
      .getByTestId('dashboard')
      .getByText('devteam123test')
      .getByTestId('createNewProject')
      .click();
  });

  it.only('creates, reads and deletes a project', () => {
    user
      .login()
      .visit('/')
      .getByTestId('dashboardPage')
      .getByTestId('createNewProject')
      .click()
      .getByTestId('nameInput')
      // make sure the cancel button works
      .getByTestId('cancelNameInput')
      .click()
      .getByTestId('createNewProject')
      // create project for real this time
      .click()
      .getByTestId('nameInput')
      .type(newProjectName)
      .getByTestId('nameForm')
      .submit()
      .getByText(newProjectName)
      .getByTestId(`avatar-${newProjectName}`)
      // check the name input disappeared aswell
      .getByTestId('createNewProject')
      // take me to the project page
      .getByText(newProjectName)
      .click()
      .url()
      .should('include', newProjectName)
      // go back to dashboard
      .getByTestId('navDropdown')
      .click()
      .getByTestId('goTodashboard')
      .click()
      // delete the new project
      .getByTestId(`delete-${newProjectName}`)
      .click()
      // check cancel delete works
      .getByTestId(`cancel-delete-${newProjectName}`)
      .click()
      // delete for real this time
      .getByTestId(`delete-${newProjectName}`)
      .click()
      .getByTestId(`confirm-delete-${newProjectName}`)
      .click()
      .queryByTestId(newProjectName)
      .should('not.exist');
  });

  it('lets me invite people to a project', () => {
    throw new Error('not written yet');
  });

  // np spaces when you create project id

  it('see little pictures of everyones face on project', () => {
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

  it.skip('prefretching: project shoudl loads when i am inside the dashboard not kjust on route', () => {
    throw new Error('not written yet');
  });
});
