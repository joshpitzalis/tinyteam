import React from 'react';
import { Button } from 'rebass';

export const CreateProject = ({ handleCreateNewProject }) => {
  const [createProject, showCreateProject] = React.useState(false);
  const [name, setName] = React.useState('');
  return (
    <>
      {createProject ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleCreateNewProject(name);
            setName('');
            showCreateProject(false);
          }}
          data-testid="nameForm"
        >
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            data-testid="nameInput"
          />
          <input type="submit" value="create" />
          <button
            data-testid="cancelNameInput"
            onClick={() => showCreateProject(false)}
            type="button"
          >
            Nevermind
          </button>
        </form>
      ) : (
        <Button
          data-testid="createNewProject"
          onClick={() => showCreateProject(true)}
          className="pointer"
          m={5}
        >
          Create a new Team
        </Button>
      )}
    </>
  );
};
