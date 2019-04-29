import { AddCircle, Trash } from 'grommet-icons';
import React from 'react';
import { Button, Card, Image, Text } from 'rebass';
import { handleInvite } from '../helpers';

export function Projects({
  projects,
  handleDeleteTeam,
  history,
  noProjects,
  uid,
}) {
  const [invite, setInvite] = React.useState(false);
  const [email, setEmail] = React.useState('');

  return (
    <div className="flex wrap ">
      {projects && projects.length > 0 ? (
        projects.map(project => (
          <Card
            key={project.id}
            fontSize={6}
            fontWeight="bold"
            width={[1, 1, 1 / 2]}
            p={5}
            m={5}
            bg="#f6f6ff"
            borderRadius={8}
            boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
          >
            <Text
              lineHeight={1}
              onClick={() => history.push(`/project/${project.id}`)}
            >
              {project.id}
            </Text>

            <div className="db mv3 flex ">
              {project.users &&
                project.users.map(user => (
                  <Image
                    height={50}
                    src={user.photoURL}
                    borderRadius={8}
                    data-testid={`avatar-${project.id}`}
                  />
                ))}

              {invite ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleInvite(email, project.id);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Gmail emails only"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <input type="submit" />
                </form>
              ) : (
                <AddCircle
                  data-test="invite"
                  className="pl3 pointer"
                  onClick={() => setInvite(true)}
                />
              )}
            </div>
            <DeleteProject
              handleDeleteTeam={handleDeleteTeam}
              projectId={project.id}
              uid={uid}
            />
          </Card>
        ))
      ) : noProjects ? (
        <Text m={5}>No projects Yet.</Text>
      ) : (
        <Card
          fontSize={6}
          fontWeight="bold"
          width={[1, 1, 1 / 2]}
          p={5}
          m={5}
          bg="#f6f6ff"
          borderRadius={8}
          boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
        />
      )}
    </div>
  );
}

const DeleteProject = ({ handleDeleteTeam, projectId, uid }) => {
  const [confirm, setConfirm] = React.useState(false);

  return (
    <div>
      {confirm ? (
        <>
          <Text lineHeight={1}>You absolutely sure about this?</Text>
          <Button
            bg="red"
            data-testid={`confirm-delete-${projectId}`}
            onClick={() => handleDeleteTeam(uid, projectId)}
          >
            DELETE FO SHO !
          </Button>
          <Button
            data-testid={`cancel-delete-${projectId}`}
            onClick={() => setConfirm(false)}
          >
            Just Kidding
          </Button>
        </>
      ) : (
        <Button
          data-testid={`delete-${projectId}`}
          bg="#f6f6ff"
          className="pointer"
          onClick={() => setConfirm(true)}
        >
          <Trash color="red" />
        </Button>
      )}
    </div>
  );
};
