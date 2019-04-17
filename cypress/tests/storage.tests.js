describe('File storage', () => {
  const user = cy;

  it('Uploading a file and checking whether user can see the document name on doclist', () =>
    user
      .login()
      .visit('/project/devteam123test')

      .getByTestId('uploadFile')
      .upload_file('logo.png', `[data-testid='uploadFile']`)

      .get('[data-testid=uploadform] > [type="text"]')
      .type('example')

      // .getByTestId('uploadform')

      // .submit()

      .get('[data-testid=uploadButton]')

      .click({ force: true })
      .wait(2000)
      .get('[data-testid=docList] ')
      .contains('example'));

  it('delete a file', () => {
    user
      .visit('/project/devteam123test')

      .getByTestId('docList')
      .each(($el, index, $list) => {
        // $el is a wrapped jQuery element
        if ($el() === 'example') {
          // wrap this element so we can
          // use cypress commands on it
          cy.wrap($el).click();
        } else {
          // do something else
        }
      })
      .wait(3000)
      .click();
  });

  it('make sure user sees an error message if there is no filename input ', () => {
    user
      .visit('/project/devteam123test')

      .getByTestId('uploadFile')
      .get('[data-testid=uploadform] > [type="text"]')
      .type('example')
      .getByTestId('uploadButton')
      .click()
      .wait(2000)
      .get('[data-testid=uploadform] > p')
      .contains("Error: FileName can't be empty");
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
      .wait(1000)
      .get('[data-testid=uploadform] > p')
      .contains('Error: Please choose a file');
  });
  it('make sure security rules prevent anyone from uploading to my project', () => {
    throw new Error('not written yet');
  });
  it('handle file upload erros like file too big, interent down, etc', () => {
    // Check how to use cypress for internet down
    // file too big
    throw new Error('not written yet');
  });

  it('update file', () => {
    throw new Error('not written yet');
  });
});
