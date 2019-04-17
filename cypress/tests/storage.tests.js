describe('File storage', () => {
  const user = cy;

  // recurring issue, seems like a cypress problem. Error: Uncaught TypeError: Cannot read property 'replace' of undefined (http://localhost:3000/__cypress/runner/cypress_runner.js:65669)
  // it('Uploading a file and checking whether user can see the document name on doclist', () => {
  //   const fileName = 'logo.png';

  //   const fileInput = 'input[type=file]';
  //   user
  //     .visit('/project/devteam123test')
  //     .login()
  //     .getByTestId('uploadFile')
  //     .upload_file(fileName, fileInput)
  //     .get('[data-testid=uploadform] > [type="text"]')
  //     .type('test')
  //     .get('[data-testid=uploadButton]')
  //     .click({ force: true })
  //     .wait(2000)
  //     .get('[data-testid=docList] ')
  //     .contains('test');
  // });

  it('delete a file', () =>
    user
      .visit('/project/devteam123test')
      .login()
      .get('[data-testid=docList] ')
      .get('[data-testid=deleteButton]')
      .its('length')
      .then(previousCount => {
        // Delete the last element and check for list size
        user
          .get('[data-testid=deleteButton]')
          .eq(-1)
          .click()
          .wait(5000)
          .get('[data-testid=deleteButton]')
          .its('length')
          .should('eq', previousCount - 1);
      }));
  // user
  //   .visit('/project/devteam123test')
  //   .wait(2000)

  //   .get('[data-testid=deleteButton]')
  //   .eq(-1)
  //   .click()
  //   .wait(2000)
  //   .should
  //   ;

  it('make sure user sees an error message if there is no filename input ', () => {
    user
      .visit('/project/devteam123test')
      .get('[data-testid=uploadform] > [type="text"]')
      .type('example')
      .getByTestId('uploadButton')
      .click()
      .wait(2000)
      .get('[data-testid=uploadform] > p')
      .contains('Error: Please choose a file');
  });
  it('make sure user sees an error message if there is no file chosen ', () => {
    const fileName = 'logo.png';

    const fileInput = 'input[type=file]';
    user
      .visit('/project/devteam123test')
      .getByTestId('uploadFile')
      .upload_file(fileName, fileInput)
      .wait(3000)
      .getByTestId('uploadButton')
      .click()
      .wait(2000)
      .get('[data-testid=uploadform] > p')
      .contains("Error: FileName can't be empty");
  });
  it('make sure security rules prevent anyone from uploading to my project', () => {});
  it('handle file upload erros like file too big, interent down, etc', () => {
    // Check how to use cypress for internet down
    // file too big
    const fileName = 'largefile.zip';

    const fileInput = 'input[type=file]';
    user
      .visit('/project/devteam123test')
      .getByTestId('uploadFile')
      .upload_file(fileName, fileInput)

      .getByTestId('uploadButton')
      .click()
      .wait(2000)
      .get('[data-testid=uploadform] > p')
      .contains('Error: The file is too large');

    it('ensure to wait in laoding state so that he doesnt create multiple uploads', () => {
      throw new Error('not written yet');
    });
  });
});
